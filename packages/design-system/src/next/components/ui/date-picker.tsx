import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import {
  CalendarDate,
  getLocalTimeZone,
  maxDate as maxDateFn,
  minDate as minDateFn,
  parseAbsolute,
  startOfMonth,
  toCalendarDate,
  today,
} from '@internationalized/date';
import { type CustomComponents, type DayButtonProps } from 'react-day-picker';

import { Calendar, CalendarDayButton } from './calendar';
import {
  CalendarIcon,
  PickerClearButton,
  pickerFrameVariants,
  pickerPopupClassName,
  pickerTextClassName,
  useControllable,
  type PickerSize,
} from './picker-internals';
import { useFieldControl } from './field';
import { useLocale } from './locale-provider';

const DEFAULT_PAST_RANGE = 200;
const DEFAULT_FUTURE_RANGE = 15;

/* -------------------------------------------------------------------------------------------------
 * Dates
 *
 * Same conversions as the legacy date picker: a `Date` prop is read in UTC, the `Date` it emits is
 * the local midnight of the chosen day.
 * -----------------------------------------------------------------------------------------------*/

const convertUTCDateToCalendarDate = (date: Date): CalendarDate =>
  toCalendarDate(parseAbsolute(date.toISOString(), 'UTC'));

const toLocalDate = (date: CalendarDate) => date.toDate(getLocalTimeZone());

const fromLocalDate = (date: Date) => new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

const isSameCalendarDate = (a: CalendarDate | undefined, b: CalendarDate | undefined) =>
  a === b || (a !== undefined && b !== undefined && a.compare(b) === 0);

const constrainValue = (date: CalendarDate, min: CalendarDate, max: CalendarDate) =>
  minDateFn(maxDateFn(date, min), max);

const makeInitialCalendarDate = (currentValue: CalendarDate | undefined, min: CalendarDate, max: CalendarDate) => {
  if (currentValue) {
    return currentValue;
  }

  const now = today('UTC');

  if (now.compare(min) < 0) {
    return min;
  }

  if (now.compare(max) > 0) {
    return max;
  }

  return now;
};

const isPrintableCharacter = (string: string) => /^[^a-zA-Z]*$/.test(string);

/* -------------------------------------------------------------------------------------------------
 * DatePickerDayButton
 *
 * A press on a day keeps the focus in the input, like the legacy calendar.
 * -----------------------------------------------------------------------------------------------*/

const DatePickerDayButton = React.forwardRef<HTMLButtonElement, DayButtonProps>(({ onMouseDown, ...props }, ref) => (
  <CalendarDayButton
    ref={ref}
    tabIndex={-1}
    onMouseDown={(event) => {
      event.preventDefault();
      onMouseDown?.(event);
    }}
    {...props}
  />
));
DatePickerDayButton.displayName = 'DatePickerDayButton';

const DATE_PICKER_COMPONENTS: Partial<CustomComponents> = {
  DayButton: DatePickerDayButton as CustomComponents['DayButton'],
};

/* -------------------------------------------------------------------------------------------------
 * DatePicker
 * -----------------------------------------------------------------------------------------------*/

interface DatePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'value' | 'defaultValue' | 'onChange' | 'size' | 'min' | 'max'
  > {
  /**
   * The accessible name of the calendar dialog
   * @default "Choose date"
   */
  calendarLabel?: string;
  /**
   * The label of the clear button
   * @default "Clear"
   */
  clearLabel?: string;
  /**
   * The value of an uncontrolled date picker. It also centres the default year range. The legacy `initialDate`
   */
  defaultValue?: Date;
  /** @default false */
  disabled?: boolean;
  /**
   * A BCP 47 locale for the format of the date, the names of the months and days and the first day of the week
   * @default navigator.language
   */
  locale?: string;
  /**
   * The last date that can be chosen
   * @default 31 December, 15 years from now
   */
  maxDate?: Date;
  /**
   * The first date that can be chosen
   * @default 1 January, 200 years ago
   */
  minDate?: Date;
  /** @default "Month" */
  monthSelectLabel?: string;
  /**
   * Shows a clear button while there is a date
   */
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called with the local midnight of the chosen day, or `undefined` when cleared */
  onValueChange?: (date: Date | undefined) => void;
  /** @default false */
  required?: boolean;
  /** @default "M" */
  size?: PickerSize;
  value?: Date | null;
  /** @default "Year" */
  yearSelectLabel?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      calendarLabel = 'Choose date',
      className,
      clearLabel = 'Clear',
      defaultValue,
      disabled = false,
      locale: localeProp,
      maxDate,
      minDate,
      monthSelectLabel = 'Month',
      onBlur,
      onClear,
      onKeyDown,
      onValueChange,
      placeholder,
      required: requiredProp,
      size = 'M',
      value: valueProp,
      yearSelectLabel = 'Year',
      id: idProp,
      name: nameProp,
      'aria-describedby': describedByProp,
      'aria-invalid': ariaInvalidProp,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const locale = useLocale(localeProp);
    // A surrounding `Field` provides the id, the name, the required flag, the error and the description
    const {
      id,
      name,
      required,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: idProp,
      name: nameProp,
      required: requiredProp,
      hasError: ariaInvalidProp === true || ariaInvalidProp === 'true',
      'aria-describedby': describedByProp,
    });
    const timeZone = getLocalTimeZone();

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [frame, setFrame] = React.useState<HTMLDivElement | null>(null);

    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const formatter = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
      [locale],
    );
    const format = React.useCallback(
      (date: CalendarDate) => formatter.format(date.toDate(timeZone)),
      [formatter, timeZone],
    );

    /* ---------------------------------------------------------------------------------------------
     * Range
     * -------------------------------------------------------------------------------------------*/

    const [actualMinDate, actualMaxDate] = React.useMemo(() => {
      const now = defaultValue ? convertUTCDateToCalendarDate(defaultValue) : today('UTC');
      const min = minDate
        ? convertUTCDateToCalendarDate(minDate)
        : now.set({ day: 1, month: 1, year: now.year - DEFAULT_PAST_RANGE });
      let max = maxDate
        ? convertUTCDateToCalendarDate(maxDate)
        : now.set({ day: 31, month: 12, year: now.year + DEFAULT_FUTURE_RANGE });

      if (max.compare(min) < 0) {
        max = min.set({ day: 31, month: 12, year: min.year + DEFAULT_FUTURE_RANGE });
      }

      return [min, max];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minDate?.getTime(), maxDate?.getTime(), defaultValue?.getTime()]);

    /* ---------------------------------------------------------------------------------------------
     * State
     * -------------------------------------------------------------------------------------------*/

    const [value, setValue] = useControllable<CalendarDate | undefined>(
      valueProp ? convertUTCDateToCalendarDate(valueProp) : undefined,
      defaultValue ? convertUTCDateToCalendarDate(defaultValue) : undefined,
      (date) => onValueChange?.(date ? date.toDate(timeZone) : undefined),
      isSameCalendarDate,
    );

    const [open, setOpen] = React.useState(false);
    const [textValue, setTextValue] = React.useState(() => (value ? format(value) : ''));
    // The highlighted day of the calendar, moved by the arrow keys and by typing
    const [calendarDate, setCalendarDate] = React.useState(() =>
      makeInitialCalendarDate(value, actualMinDate, actualMaxDate),
    );

    // A controlled value updates the text and the calendar. A value that goes away clears the text
    const valueTime = valueProp ? valueProp.getTime() : undefined;
    const previousValueTimeRef = React.useRef(valueTime);
    React.useLayoutEffect(() => {
      const hadValue = previousValueTimeRef.current !== undefined;
      previousValueTimeRef.current = valueTime;

      if (valueProp) {
        const date = convertUTCDateToCalendarDate(valueProp);
        setTextValue(format(date));
        setCalendarDate(date);
      } else if (hadValue || valueProp === null) {
        setTextValue('');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueTime, valueProp === null, format]);

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen && disabled) {
        return;
      }

      if (nextOpen && value) {
        setCalendarDate(value);
      }

      setOpen(nextOpen);
    };

    const commit = (date: CalendarDate) => {
      setCalendarDate(date);
      setTextValue(format(date));
      setValue(date);
    };

    /* ---------------------------------------------------------------------------------------------
     * Typing a date
     * -------------------------------------------------------------------------------------------*/

    const [dateStructure, separator, dateFormatPlaceholder] = React.useMemo(() => {
      const parts = formatter.formatToParts(new Date());
      const structure = parts.filter((part) => part.type === 'year' || part.type === 'month' || part.type === 'day');
      const placeholderParts = structure.map((part) => {
        if (part.type === 'day') {
          return 'DD';
        }

        if (part.type === 'month') {
          return 'MM';
        }

        return 'YYYY';
      });

      return [structure, parts.find((part) => part.type === 'literal')?.value ?? '', placeholderParts] as const;
    }, [formatter]);

    // A pattern is a string without delimiters, so the separator is escaped
    const inputPattern = dateFormatPlaceholder.map((part) => `\\d{${part.length}}`).join(`\\${separator}`);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const text = event.target.value;

      if (!isPrintableCharacter(text)) {
        return;
      }

      const inputByPart = text.split(separator);
      const byType: Partial<Record<'day' | 'month' | 'year', string>> = {};

      dateStructure.forEach((part, index) => {
        byType[part.type as 'day' | 'month' | 'year'] = inputByPart[index];
      });

      const { day, month, year } = byType;
      const currentYear = calendarDate.year;
      let newYear = calendarDate.year;

      if (year) {
        // A one digit year is the last digit of the year, so 9 typed in 2023 is 2009
        const normalizedYear = year.length === 1 ? `0${year}` : year;

        newYear =
          year.length < 3
            ? Number(`${currentYear}`.slice(0, 4 - normalizedYear.length) + normalizedYear)
            : Number(normalizedYear);
      }

      // A two digit year after the maximum date is the previous century, so 94 is 1994
      if (year && year.length < 3 && newYear > actualMaxDate.year) {
        newYear -= 100;
      }

      const withYear = calendarDate.set({ year: newYear });
      const maxMonth = withYear.calendar.getMonthsInYear(withYear);
      const withMonth = withYear.set({ month: month && Number(month) <= maxMonth ? Number(month) : undefined });
      const maxDay = withMonth.calendar.getDaysInMonth(withMonth);
      const withDay = withMonth.set({ day: day && Number(day) <= maxDay ? Number(day) : undefined });

      setCalendarDate(constrainValue(withDay, actualMinDate, actualMaxDate));
      setTextValue(text);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      if (!textValue) {
        setValue(undefined);

        return;
      }

      commit(calendarDate);
    };

    const moveCalendarDate = (date: CalendarDate) => {
      if (date.compare(actualMinDate) < 0 || date.compare(actualMaxDate) > 0) {
        return;
      }

      setCalendarDate(date);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      if (!open && (isPrintableCharacter(event.key) || ['ArrowDown', 'Backspace'].includes(event.key))) {
        handleOpenChange(true);

        return;
      }

      if (event.key === 'Tab' && open) {
        // The focus leaves the field, so the calendar closes. The blur keeps the highlighted date
        handleOpenChange(false);

        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();

        if (open) {
          handleOpenChange(false);
        } else {
          setValue(undefined);
          setTextValue('');
        }

        return;
      }

      if (open && ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();

        switch (event.key) {
          case 'ArrowDown':
            moveCalendarDate(calendarDate.add({ weeks: 1 }));
            break;
          case 'ArrowUp':
            moveCalendarDate(calendarDate.subtract({ weeks: 1 }));
            break;
          case 'ArrowRight':
            moveCalendarDate(calendarDate.add({ days: 1 }));
            break;
          default:
            moveCalendarDate(calendarDate.subtract({ days: 1 }));
        }

        return;
      }

      if (open && event.key === 'Enter') {
        event.preventDefault();
        commit(calendarDate);
        handleOpenChange(false);
      }
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      setTextValue('');
      setValue(undefined);
      onClear?.(event);
      inputRef.current?.focus();
    };

    /* ---------------------------------------------------------------------------------------------
     * Render
     * -------------------------------------------------------------------------------------------*/

    const contentId = React.useId();
    const showClear = Boolean(textValue) && Boolean(onClear);
    const disabledDays = React.useMemo(
      () => [{ before: toLocalDate(actualMinDate) }, { after: toLocalDate(actualMaxDate) }],
      [actualMaxDate, actualMinDate],
    );

    return (
      <PopoverPrimitive.Root
        open={open}
        modal={false}
        onOpenChange={(nextOpen, eventDetails) => {
          // A press in the field is not outside: the field opens the calendar itself
          const target = eventDetails.event?.target;

          if (!nextOpen && frame && target instanceof Node && frame.contains(target)) {
            return;
          }

          handleOpenChange(nextOpen);
        }}
      >
        <div
          ref={setFrame}
          data-slot="date-picker"
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
          className={cn(
            pickerFrameVariants({ size, compact: showClear }),
            'cursor-text justify-start gap-3 px-3',
            onClear ? 'min-w-40' : 'min-w-33',
            className,
          )}
          onPointerDown={(event) => {
            const target = event.target as HTMLElement;

            // The clear button handles its own press
            if (target.closest('button') || event.button !== 0 || event.ctrlKey) {
              return;
            }

            if (target !== inputRef.current) {
              event.preventDefault();
            }

            handleOpenChange(true);
            inputRef.current?.focus();
          }}
        >
          <CalendarIcon className="text-neutral-500" />
          <input
            ref={setInputRef}
            type="text"
            role="combobox"
            inputMode="numeric"
            data-slot="date-picker-input"
            id={id}
            name={name}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-autocomplete="none"
            aria-controls={open ? contentId : undefined}
            aria-disabled={disabled}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-required={required}
            data-state={open ? 'open' : 'closed'}
            disabled={disabled}
            required={required}
            pattern={inputPattern}
            placeholder={placeholder ?? dateFormatPlaceholder.join(separator)}
            className={cn(
              'w-full min-w-0 border-none bg-transparent p-0 text-neutral-800 outline-none focus:outline-none placeholder:text-neutral-600 placeholder:opacity-100 disabled:cursor-not-allowed',
              pickerTextClassName,
            )}
            {...inputProps}
            value={textValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {showClear ? <PickerClearButton label={clearLabel} disabled={disabled} onClick={handleClear} /> : null}
        </div>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            anchor={frame}
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-500 outline-none"
          >
            <PopoverPrimitive.Popup
              id={contentId}
              data-slot="date-picker-content"
              aria-modal="true"
              aria-label={calendarLabel}
              initialFocus={false}
              finalFocus={false}
              className={cn(pickerPopupClassName, 'p-1')}
              onContextMenu={(event) => event.preventDefault()}
            >
              <Calendar
                mode="single"
                locale={locale}
                hideNavigation
                selected={toLocalDate(calendarDate)}
                // The selection is controlled: `onDayClick` commits the day
                onSelect={() => {}}
                month={toLocalDate(startOfMonth(calendarDate))}
                onMonthChange={(month) => {
                  const next = calendarDate.set({ year: month.getFullYear(), month: month.getMonth() + 1 });
                  setCalendarDate(constrainValue(next, actualMinDate, actualMaxDate));
                }}
                startMonth={toLocalDate(actualMinDate)}
                endMonth={toLocalDate(actualMaxDate)}
                disabled={disabledDays}
                labels={{
                  labelMonthDropdown: () => monthSelectLabel,
                  labelYearDropdown: () => yearSelectLabel,
                }}
                components={DATE_PICKER_COMPONENTS}
                onDayClick={(date, modifiers) => {
                  if (modifiers.disabled) {
                    return;
                  }

                  commit(fromLocalDate(date));
                  handleOpenChange(false);
                }}
              />
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
DatePicker.displayName = 'DatePicker';

export { DatePicker, convertUTCDateToCalendarDate };
export type { DatePickerProps };
