import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  isSameDay,
  isToday as isTodayInTimeZone,
  startOfMonth,
  startOfWeek,
} from '@internationalized/date';

type IconProps = React.SVGProps<SVGSVGElement>;

const CaretLeft = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
  </svg>
);

const CaretRight = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
  </svg>
);

const toCalendarDate = (date: Date) => new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
const toJsDate = (date: CalendarDate) => new Date(date.year, date.month - 1, date.day);

const resolveLocale = (locale?: string) =>
  locale ?? (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US');

export interface CalendarProps {
  /** The selected day. Only the date part is used. */
  value?: Date | null;
  /** Called with the picked day (at midnight local time). */
  onValueChange?: (date: Date) => void;
  /** The visible month, controlled. */
  month?: Date;
  /** The visible month on mount, uncontrolled. */
  defaultMonth?: Date;
  onMonthChange?: (date: Date) => void;
  /** Days before this are disabled. */
  minDate?: Date;
  /** Days after this are disabled. */
  maxDate?: Date;
  /** BCP-47 locale for the weekday order and labels. Defaults to the browser locale. */
  locale?: string;
  className?: string;
}

const Calendar = ({
  value,
  onValueChange,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  locale: localeProp,
  className,
}: CalendarProps) => {
  const timeZone = getLocalTimeZone();
  const locale = resolveLocale(localeProp);

  const valueCd = value ? toCalendarDate(value) : null;
  const minCd = minDate ? toCalendarDate(minDate) : null;
  const maxCd = maxDate ? toCalendarDate(maxDate) : null;

  const [internalMonth, setInternalMonth] = React.useState<CalendarDate>(() =>
    startOfMonth(toCalendarDate(month ?? defaultMonth ?? value ?? new Date())),
  );
  const visibleMonth = month ? startOfMonth(toCalendarDate(month)) : internalMonth;

  const setMonth = (next: CalendarDate) => {
    if (!month) {
      setInternalMonth(next);
    }
    onMonthChange?.(toJsDate(next));
  };

  // Follow an externally selected value into view when the month is uncontrolled.
  React.useEffect(() => {
    if (!month && value) {
      setInternalMonth(startOfMonth(toCalendarDate(value)));
    }
  }, [value, month]);

  // Six fixed weeks keep the grid height stable across months.
  const gridStart = startOfWeek(startOfMonth(visibleMonth), locale);
  const days = Array.from({ length: 42 }, (_, index) => gridStart.add({ days: index }));

  const weekdayFormatter = new DateFormatter(locale, { weekday: 'short' });
  const monthFormatter = new DateFormatter(locale, { month: 'long', year: 'numeric' });
  const weekdayLabels = days.slice(0, 7).map((day) => weekdayFormatter.format(day.toDate(timeZone)));

  const isDisabled = (day: CalendarDate) =>
    Boolean((minCd && day.compare(minCd) < 0) || (maxCd && day.compare(maxCd) > 0));

  const gridRef = React.useRef<HTMLDivElement>(null);
  const [focusedDate, setFocusedDate] = React.useState<CalendarDate>(() => valueCd ?? visibleMonth);

  // Keep the roving tabstop inside the visible month.
  React.useEffect(() => {
    setFocusedDate((current) =>
      current.month === visibleMonth.month && current.year === visibleMonth.year
        ? current
        : startOfMonth(visibleMonth),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- track the visible month by value, not identity
  }, [visibleMonth.year, visibleMonth.month]);

  const moveFocus = (next: CalendarDate) => {
    setFocusedDate(next);
    if (next.month !== visibleMonth.month || next.year !== visibleMonth.year) {
      setMonth(startOfMonth(next));
    }
    requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${next.toString()}"]`)?.focus();
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, () => CalendarDate> = {
      ArrowLeft: () => focusedDate.subtract({ days: 1 }),
      ArrowRight: () => focusedDate.add({ days: 1 }),
      ArrowUp: () => focusedDate.subtract({ weeks: 1 }),
      ArrowDown: () => focusedDate.add({ weeks: 1 }),
      Home: () => startOfWeek(focusedDate, locale),
      End: () => startOfWeek(focusedDate, locale).add({ days: 6 }),
      PageUp: () => focusedDate.subtract({ months: 1 }),
      PageDown: () => focusedDate.add({ months: 1 }),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      moveFocus(move());
    }
  };

  const selectDay = (day: CalendarDate) => {
    if (!isDisabled(day)) {
      onValueChange?.(toJsDate(day));
    }
  };

  const navButton =
    'flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className={cn('w-fit select-none', className)} data-slot="calendar">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          className={navButton}
          onClick={() => setMonth(visibleMonth.subtract({ months: 1 }))}
        >
          <CaretLeft className="size-4" />
        </button>
        <span aria-live="polite" className="text-sm font-medium">
          {monthFormatter.format(visibleMonth.toDate(timeZone))}
        </span>
        <button
          type="button"
          aria-label="Next month"
          className={navButton}
          onClick={() => setMonth(visibleMonth.add({ months: 1 }))}
        >
          <CaretRight className="size-4" />
        </button>
      </div>

      <div ref={gridRef} role="grid" onKeyDown={onKeyDown} className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((label, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key -- weekday labels are a fixed, ordered set
            key={index}
            role="columnheader"
            aria-label={label}
            className="flex h-9 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {label}
          </div>
        ))}
        {days.map((day) => {
          const selected = valueCd ? isSameDay(day, valueCd) : false;
          const outside = day.month !== visibleMonth.month;
          const disabled = isDisabled(day);
          const isFocusTarget = isSameDay(day, focusedDate);
          return (
            <button
              key={day.toString()}
              type="button"
              role="gridcell"
              data-date={day.toString()}
              aria-selected={selected}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              tabIndex={isFocusTarget ? 0 : -1}
              onClick={() => selectDay(day)}
              onFocus={() => setFocusedDate(day)}
              className={cn(
                'flex size-9 items-center justify-center rounded-md text-sm tabular-nums outline-none',
                'hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
                outside && 'text-muted-foreground/50',
                isTodayInTimeZone(day, timeZone) && !selected && 'ring-1 ring-inset ring-border',
                selected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                disabled && 'pointer-events-none opacity-30',
              )}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Calendar };
