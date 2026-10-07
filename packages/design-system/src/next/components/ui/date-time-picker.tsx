import * as React from 'react';

import { cn } from '@/lib/utils';
import { CalendarDateTime, getLocalTimeZone, parseAbsoluteToLocal, toCalendarDateTime } from '@internationalized/date';

import { DatePicker, type DatePickerProps } from './date-picker';
import { useControllable } from './picker-internals';
import { TimePicker, type TimePickerProps } from './time-picker';
import { FieldReset, useField, useFieldControl } from './field';
import { useLocale } from './locale-provider';

/**
 * Reads a `Date` in the local time zone. Without `keepTime`, the time is midnight
 */
const convertUTCDateToCalendarDateTime = (date: Date, resetTime = true): CalendarDateTime => {
  let zonedDateTime = parseAbsoluteToLocal(date.toISOString());

  if (resetTime) {
    zonedDateTime = zonedDateTime.set({ hour: 0, minute: 0 });
  }

  return toCalendarDateTime(zonedDateTime);
};

const isSameDateTime = (a: CalendarDateTime | undefined, b: CalendarDateTime | undefined) =>
  a === b || (a !== undefined && b !== undefined && a.compare(b) === 0);

/* -------------------------------------------------------------------------------------------------
 * DateTimePicker
 * -----------------------------------------------------------------------------------------------*/

interface DateTimePickerProps
  extends Omit<DatePickerProps, 'value' | 'defaultValue' | 'onValueChange' | 'aria-label' | 'aria-labelledby' | 'step'>,
    Pick<TimePickerProps, 'step'> {
  /**
   * The accessible name of the group of the two fields, e.g. the id of a visible label
   */
  'aria-labelledby'?: string;
  /**
   * The base of the labels of the clear buttons: "{clearLabel} date" and "{clearLabel} time"
   * @default "clear"
   */
  clearLabel?: string;
  /**
   * The accessible name of the date field
   * @default "Choose date"
   */
  dateLabel?: string;
  /** The value of an uncontrolled picker. The legacy `initialDate` */
  defaultValue?: Date;
  /** Called with the date and time, or `undefined` when cleared */
  onValueChange?: (date: Date | undefined) => void;
  /**
   * The accessible name of the time field
   * @default "Choose time"
   */
  timeLabel?: string;
  value?: Date | null;
}

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  (
    {
      'aria-labelledby': ariaLabelledBy,
      className,
      clearLabel = 'clear',
      dateLabel = 'Choose date',
      defaultValue,
      disabled = false,
      locale: localeProp,
      onClear,
      onValueChange,
      required: requiredProp,
      size,
      step,
      timeLabel = 'Choose time',
      value,
      ...props
    },
    forwardedRef,
  ) => {
    // Like the legacy picker, the `Field` label names the group, not an input: neither input takes the `Field` id.
    // Both inputs are wired by hand, under a `FieldReset`, with the description and the invalid state of the `Field`
    const field = useField();
    const {
      id,
      name,
      required,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: props.id,
      name: props.name,
      required: requiredProp,
      hasError: props['aria-invalid'] === true || props['aria-invalid'] === 'true',
      'aria-describedby': props['aria-describedby'],
    });
    const locale = useLocale(localeProp);
    const [isClearing, setIsClearing] = React.useState(false);

    const externalValue = value ? convertUTCDateToCalendarDateTime(value, false) : undefined;

    const [dateValue, setDateValue] = useControllable<CalendarDateTime | undefined>(
      isClearing ? undefined : externalValue,
      defaultValue ? convertUTCDateToCalendarDateTime(defaultValue, false) : undefined,
      (date) => onValueChange?.(date ? date.toDate(getLocalTimeZone()) : undefined),
      isSameDateTime,
    );

    const timeFormatter = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }),
      [locale],
    );

    const timeValue = dateValue ? timeFormatter.format(dateValue.toDate(getLocalTimeZone())) : '';

    /*
     * Clearing a controlled value waits for the parent: the fields show nothing until the parent
     * passes a new value, or clears it too
     */
    const previousValueRef = React.useRef(value);

    React.useLayoutEffect(() => {
      const previousValue = previousValueRef.current;
      const hasClearedExternally = value == null && previousValue != null;

      if (hasClearedExternally && dateValue) {
        setDateValue(undefined);
      }

      if (isClearing && value !== previousValue) {
        setIsClearing(false);
      }

      previousValueRef.current = value;
    }, [value, dateValue, isClearing, setDateValue]);

    React.useLayoutEffect(() => {
      if (isClearing && dateValue) {
        setDateValue(undefined);
      }
    }, [isClearing, dateValue, setDateValue]);

    React.useLayoutEffect(() => {
      if (isClearing && dateValue === undefined && value == null) {
        setIsClearing(false);
      }
    }, [isClearing, dateValue, value]);

    const splitTime = (time: string) => {
      const [hours, minutes] = time.split(/\D/);

      return { hour: parseInt(hours, 10), minute: parseInt(minutes ?? '0', 10) };
    };

    const handleDateChange = (date: Date | undefined) => {
      let newDate = date ? convertUTCDateToCalendarDateTime(date) : undefined;

      // A new day keeps the time
      if (timeValue && newDate) {
        newDate = newDate.set(splitTime(timeValue));
      }

      setDateValue(newDate);
    };

    const handleTimeChange = (time?: string) => {
      if (!time) {
        return;
      }

      // A time without a day takes today
      const dateToSet = dateValue
        ? dateValue.set(splitTime(time))
        : convertUTCDateToCalendarDateTime(new Date()).set(splitTime(time));

      setDateValue(dateToSet);
    };

    const handleDateClear: DatePickerProps['onClear'] = (event) => {
      event.preventDefault();
      setIsClearing(true);
      onClear?.(event);
    };

    // Clearing the time resets it to midnight, and keeps the day
    const handleTimeClear = () => {
      const newDate = dateValue ? dateValue.set({ hour: 0, minute: 0 }) : convertUTCDateToCalendarDateTime(new Date());

      setDateValue(newDate);
    };

    return (
      <div
        role="group"
        data-slot="date-time-picker"
        aria-labelledby={ariaLabelledBy ?? (field.id ? `${field.id}-label` : undefined)}
        className={cn('flex flex-1 flex-wrap gap-1', className)}
      >
        <FieldReset>
          <div className="flex-1">
            <DatePicker
              {...props}
              id={id ? `${id}-date` : undefined}
              name={name}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              ref={forwardedRef}
              locale={locale}
              size={size}
              value={dateValue ? dateValue.toDate('UTC') : null}
              onValueChange={handleDateChange}
              required={required}
              onClear={onClear ? handleDateClear : undefined}
              clearLabel={`${clearLabel} date`}
              disabled={disabled}
              aria-label={dateLabel}
            />
          </div>
          <div className="flex-1">
            <TimePicker
              id={id ? `${id}-time` : undefined}
              aria-describedby={describedBy}
              locale={locale}
              size={size}
              aria-invalid={invalid || undefined}
              value={timeValue}
              onValueChange={handleTimeChange}
              onClear={onClear && timeValue !== '' && timeValue !== '00:00' ? handleTimeClear : undefined}
              clearLabel={`${clearLabel} time`}
              required={required}
              disabled={disabled}
              step={step}
              aria-label={timeLabel}
            />
          </div>
        </FieldReset>
      </div>
    );
  },
);
DateTimePicker.displayName = 'DateTimePicker';

export { DateTimePicker };
export type { DateTimePickerProps };
