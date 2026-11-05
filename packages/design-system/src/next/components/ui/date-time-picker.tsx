import * as React from 'react';

import { cn } from '@/lib/utils';
import { DateFormatter } from '@internationalized/date';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type IconProps = React.SVGProps<SVGSVGElement>;

const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" />
  </svg>
);

const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
  </svg>
);

const DEFAULT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const resolveLocale = (locale?: string) =>
  locale ?? (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US');

const pad = (value: number) => String(value).padStart(2, '0');

export interface DateTimePickerProps {
  /** The selected date and time. */
  value?: Date | null;
  /** Called with the new value, or `undefined` when cleared. */
  onValueChange?: (date: Date | undefined) => void;
  /** Days before this are disabled in the calendar. */
  minDate?: Date;
  /** Days after this are disabled in the calendar. */
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  clearLabel?: string;
  /** BCP-47 locale for the trigger label, calendar and weekday order. Defaults to the browser locale. */
  locale?: string;
  /** `Intl.DateTimeFormat` options for the trigger label. Defaults to a 24-hour `d MMM yyyy, HH:mm`. */
  formatOptions?: Intl.DateTimeFormatOptions;
  /** Rendered at the bottom of the popover, under the time field (e.g. a timezone selector). */
  children?: React.ReactNode;
  /** Forwarded to the popover; defaults to non-modal so nested listboxes keep working. */
  modal?: boolean;
  className?: string;
  'aria-label'?: string;
}

const DateTimePicker = ({
  value,
  onValueChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Pick a date and time',
  clearLabel = 'Clear',
  locale: localeProp,
  formatOptions,
  children,
  modal = false,
  className,
  'aria-label': ariaLabel,
}: DateTimePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const locale = resolveLocale(localeProp);

  const formatter = React.useMemo(
    () => new DateFormatter(locale, formatOptions ?? DEFAULT_FORMAT_OPTIONS),
    [locale, formatOptions],
  );
  const label = value ? formatter.format(value) : placeholder;
  const timeValue = value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : '';

  const handleDateChange = (date: Date) => {
    const next = new Date(date);
    if (value) {
      next.setHours(value.getHours(), value.getMinutes(), 0, 0);
    } else {
      next.setHours(0, 0, 0, 0);
    }
    onValueChange?.(next);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return;
    }
    const base = value ? new Date(value) : new Date();
    base.setHours(hours, minutes, 0, 0);
    onValueChange?.(base);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger
        data-slot="date-time-picker-trigger"
        role="combobox"
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center gap-2 rounded-md border border-border bg-background px-3 text-sm shadow-xs outline-none transition-colors',
          'hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-expanded:border-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
      >
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className={cn('flex-1 text-left', !value && 'text-muted-foreground')}>{label}</span>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-auto p-3">
        <Calendar
          value={value ?? undefined}
          onValueChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
        />
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <ClockIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="time"
            aria-label="Time"
            value={timeValue}
            onChange={handleTimeChange}
            className={cn(
              'h-9 flex-1 rounded-md border border-border bg-background px-2 text-sm outline-none',
              'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
            )}
          />
          {value ? (
            <button
              type="button"
              onClick={() => onValueChange?.(undefined)}
              className="flex h-9 items-center rounded-md px-2 text-sm text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {clearLabel}
            </button>
          ) : null}
        </div>
        {children ? <div className="mt-3">{children}</div> : null}
      </PopoverContent>
    </Popover>
  );
};

export { DateTimePicker };
