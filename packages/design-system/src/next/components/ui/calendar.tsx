import * as React from 'react';

import { cn } from '@/lib/utils';
import { getDayOfWeek, getLocalTimeZone, today } from '@internationalized/date';
import {
  DayPicker,
  getDefaultClassNames,
  useDayPicker,
  type CustomComponents,
  type DayButtonProps,
  type DayProps,
  type DayPickerProps,
  type DropdownProps,
  type Formatters,
  type Labels,
} from 'react-day-picker';

import { useLocale } from './locale-provider';
import { ChevronLeftIcon, ChevronRightIcon } from './picker-internals';
import { Select, SelectContent, SelectItem, SelectTrigger } from './select';

/* -------------------------------------------------------------------------------------------------
 * Locale
 *
 * The legacy date picker takes a BCP 47 locale (e.g. "en-GB") and formats with `Intl`. A string
 * locale builds the formatters, the labels and the first day of the week from `Intl`, so no
 * date-fns locale is needed. A date-fns locale object still works, like the shadcn calendar.
 * -----------------------------------------------------------------------------------------------*/

const useIntlCalendarOptions = (locale: string) =>
  React.useMemo(() => {
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
    const captionFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const dayFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });
    const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const longWeekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const fullDateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formatters: Partial<Formatters> = {
      formatCaption: (month) => captionFormatter.format(month),
      formatDay: (date) => dayFormatter.format(date),
      formatMonthDropdown: (month) => monthFormatter.format(month),
      formatYearDropdown: (year) => String(year.getFullYear()),
      // The legacy header shows the first two letters of the short weekday name, capitalized by CSS
      formatWeekdayName: (weekday) => weekdayFormatter.format(weekday).slice(0, 2),
    };

    const labels: Partial<Labels> = {
      labelDayButton: (date) => fullDateFormatter.format(date),
      labelGridcell: (date) => fullDateFormatter.format(date),
      labelGrid: (month) => captionFormatter.format(month),
      labelWeekday: (weekday) => longWeekdayFormatter.format(weekday),
    };

    // `getDayOfWeek` counts from the first day of the week of the locale
    const now = today(getLocalTimeZone());
    const jsDay = now.toDate(getLocalTimeZone()).getDay();
    const weekStartsOn = ((jsDay - getDayOfWeek(now, locale) + 7) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6;

    return { formatters, labels, weekStartsOn };
  }, [locale]);

/* -------------------------------------------------------------------------------------------------
 * CalendarDropdown
 *
 * The month and year dropdowns are the legacy borderless selects (`combobox` + `listbox`), not
 * native `<select>` elements, so the roles stay the same.
 * -----------------------------------------------------------------------------------------------*/

const CalendarDropdown = ({ options = [], value, onChange, disabled, 'aria-label': ariaLabel }: DropdownProps) => (
  <Select<number>
    value={Number(value)}
    disabled={disabled}
    onValueChange={(next) => {
      if (next === null) {
        return;
      }

      onChange?.({ target: { value: String(next) } } as React.ChangeEvent<HTMLSelectElement>);
    }}
  >
    <SelectTrigger
      aria-label={ariaLabel}
      size="S"
      className="w-auto border-transparent bg-transparent font-bold hover:bg-neutral-100 focus-within:ring-0 focus-visible:border-primary-600 [&_[data-slot=select-value]]:font-bold"
    />
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

const assignRef = <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = node;
  }
};

/*
 * The legacy cells always state their selected and disabled states, and carry the full date as
 * their name, like the day button inside
 */
const CalendarDay = ({ day, modifiers, ...props }: DayProps) => {
  const { labels } = useDayPicker();

  return (
    <td
      {...(props as React.TdHTMLAttributes<HTMLTableCellElement>)}
      aria-label={props['aria-label'] ?? (modifiers.hidden ? undefined : labels.labelDayButton(day.date, modifiers))}
      aria-selected={Boolean(modifiers.selected)}
      aria-disabled={Boolean(modifiers.disabled)}
    />
  );
};

const CalendarChevron = ({ className, orientation }: { className?: string; orientation?: string }) =>
  orientation === 'left' ? <ChevronLeftIcon className={className} /> : <ChevronRightIcon className={className} />;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type CalendarProps = DistributiveOmit<DayPickerProps, 'locale'> & {
  /**
   * A BCP 47 locale (e.g. "en-GB"), formatted with `Intl`, or a date-fns locale
   * @default navigator.language
   */
  locale?: string | DayPickerProps['locale'];
};

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      captionLayout = 'dropdown',
      className,
      classNames,
      components,
      fixedWeeks = true,
      formatters,
      labels,
      locale: localeProp,
      showOutsideDays = true,
      weekStartsOn,
      ...props
    },
    ref,
  ) => {
    const defaultClassNames = getDefaultClassNames();
    // A date-fns locale object is passed through as is; a string (or nothing) resolves like the other components
    const intlLocale = useLocale(typeof localeProp === 'string' ? localeProp : undefined);
    const locale = localeProp ?? intlLocale;
    const intlOptions = useIntlCalendarOptions(intlLocale);
    const isIntlLocale = typeof locale === 'string';

    // Stable components: a new component type on each render would remount the calendar
    const mergedComponents = React.useMemo<DayPickerProps['components']>(
      () => ({
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div
            data-slot="calendar"
            ref={(node) => {
              assignRef(rootRef, node);
              assignRef(ref, node);
            }}
            className={rootClassName}
            {...rootProps}
          />
        ),
        Chevron: CalendarChevron,
        Day: CalendarDay,
        Dropdown: CalendarDropdown,
        DayButton: CalendarDayButton as CustomComponents['DayButton'],
        ...components,
      }),
      [components, ref],
    );

    return (
      <DayPicker
        showOutsideDays={showOutsideDays}
        fixedWeeks={fixedWeeks}
        captionLayout={captionLayout}
        locale={isIntlLocale ? undefined : locale}
        lang={isIntlLocale ? locale : undefined}
        weekStartsOn={weekStartsOn ?? (isIntlLocale ? intlOptions.weekStartsOn : undefined)}
        formatters={{ ...(isIntlLocale ? intlOptions.formatters : {}), ...formatters }}
        labels={{ ...(isIntlLocale ? intlOptions.labels : {}), ...labels }}
        className={cn('w-fit p-4 text-neutral-800', className)}
        classNames={{
          root: cn('relative', defaultClassNames.root),
          months: cn('relative flex flex-col gap-4 medium:flex-row', defaultClassNames.months),
          month: cn('flex w-full flex-col', defaultClassNames.month),
          nav: cn('absolute top-0 right-0 flex items-center gap-1', defaultClassNames.nav),
          button_previous: cn(
            'inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-solid border-transparent bg-transparent text-neutral-500 hover:bg-neutral-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            'inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-solid border-transparent bg-transparent text-neutral-500 hover:bg-neutral-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
            defaultClassNames.button_next,
          ),
          month_caption: cn('flex items-center px-2 pb-4', defaultClassNames.month_caption),
          dropdowns: cn('flex items-center gap-2 *:data-[slot=select-control]:w-auto', defaultClassNames.dropdowns),
          caption_label: cn('text-sm font-bold', defaultClassNames.caption_label),
          month_grid: cn('border-collapse', defaultClassNames.month_grid),
          weekdays: cn(defaultClassNames.weekdays),
          weekday: cn(
            'h-6 w-8 rounded-md p-0 text-xs font-bold text-neutral-800 capitalize',
            defaultClassNames.weekday,
          ),
          week: cn(defaultClassNames.week),
          day: cn('group/day rounded-md p-0 text-center', defaultClassNames.day),
          outside: cn('text-neutral-600', defaultClassNames.outside),
          disabled: cn('pointer-events-none opacity-50', defaultClassNames.disabled),
          hidden: cn('invisible', defaultClassNames.hidden),
          today: cn(defaultClassNames.today),
          ...classNames,
        }}
        components={mergedComponents}
        {...(props as DayPickerProps)}
      />
    );
  },
);
Calendar.displayName = 'Calendar';

/* -------------------------------------------------------------------------------------------------
 * CalendarDayButton
 *
 * The legacy cell: 0.8rem padding, a 1.2rem text, a primary100 background with a primary600 text
 * when selected, and the same on hover. In a range, the first and last days take a primary200
 * background and the band between them loses its rounded corners.
 * -----------------------------------------------------------------------------------------------*/

const CalendarDayButton = React.forwardRef<HTMLButtonElement, DayButtonProps>(
  ({ className, day, modifiers, ...props }, forwardedRef) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
      if (modifiers.focused) {
        ref.current?.focus();
      }
    }, [modifiers.focused]);

    return (
      <button
        ref={(node) => {
          ref.current = node;
          assignRef(forwardedRef, node);
        }}
        type="button"
        data-slot="calendar-day"
        data-day={day.isoDate}
        data-selected={modifiers.selected || undefined}
        data-outside={modifiers.outside || undefined}
        data-range-start={modifiers.range_start || undefined}
        data-range-middle={modifiers.range_middle || undefined}
        data-range-end={modifiers.range_end || undefined}
        className={cn(
          'flex w-full min-w-8 cursor-pointer items-center justify-center rounded-md border-none bg-neutral-0 p-2 text-xs text-neutral-900 -outline-offset-2',
          'hover:bg-primary-100 hover:text-primary-600',
          'data-outside:text-neutral-600',
          'data-selected:bg-primary-100 data-selected:text-primary-600',
          // A range (`mode="range"`): the ends stand out and join the days between them into one band
          'data-selected:data-range-start:bg-primary-200 data-selected:data-range-end:bg-primary-200',
          'data-range-start:not-data-range-end:rounded-r-none data-range-end:not-data-range-start:rounded-l-none',
          'data-range-middle:rounded-none',
          'focus-visible:outline-2 focus-visible:outline-primary-600',
          'disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);
CalendarDayButton.displayName = 'CalendarDayButton';

export { Calendar, CalendarDayButton };
export type { CalendarProps };
