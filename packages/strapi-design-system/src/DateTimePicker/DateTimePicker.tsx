import * as React from 'react';

import { CalendarDateTime, parseAbsoluteToLocal, toCalendarDateTime, getLocalTimeZone } from '@internationalized/date';
import { styled } from 'styled-components';

import { DatePicker as DatePickerInput, DatePickerProps, DatePickerElement } from '../DatePicker/DatePicker';
import { useDesignSystem } from '../DesignSystemProvider';
import { type FieldProps } from '../Field';
import { Flex } from '../Flex';
import { once } from '../helpers/deprecations';
import { useComposedRefs } from '../hooks/useComposeRefs';
import { useControllableState } from '../hooks/useControllableState';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { useId } from '../hooks/useId';
import { TimePicker as BaseTimePicker, TimePickerProps } from '../TimePicker';
import { VisuallyHidden } from '../VisuallyHidden';

const DatePicker = styled(DatePickerInput)`
  flex: 1 1 70%;
  min-width: 120px;
`;

const TimePicker = styled(BaseTimePicker)`
  flex: 1 1 30%;
  min-width: 140px;
`;

export interface DateTimePickerProps
  extends Omit<DatePickerProps, 'step' | 'onChange' | 'error' | 'selectedDate'>,
    Pick<TimePickerProps, 'step'>,
    Pick<FieldProps, 'name' | 'error'> {
  /**
   * Label for the DatePicker field
   * @default "Date"
   */
  dateLabel?: string;
  /**
   * Label for the TimePicker field
   * @default "Time"
   */
  timeLabel?: string;
  onChange?: (date: Date | undefined) => void;
  /**
   * Value. The Date passed as value
   */
  value?: Date | null;
}

export const DateTimePicker = React.forwardRef<DatePickerElement, DateTimePickerProps>(
  (
    {
      clearLabel = 'clear',
      dateLabel = 'Choose date',
      timeLabel = 'Choose time',
      disabled = false,
      error,
      onChange,
      onClear,
      required = false,
      size = 'M',
      step,
      value,
      initialDate,
      ...props
    },
    forwardedRef,
  ) => {
    const DatePickerElement = React.useRef<HTMLInputElement>(null!);

    const [dateValue, setDateValue] = useControllableState<CalendarDateTime | undefined>({
      defaultProp: initialDate ? convertUTCDateToCalendarDateTime(initialDate, false) : undefined,
      prop: value ? convertUTCDateToCalendarDateTime(value, false) : value ?? undefined,
      onChange(date) {
        if (onChange) {
          onChange(date?.toDate(getLocalTimeZone()));
        }
      },
    });

    const context = useDesignSystem('DateTimePicker');

    const timeFormatter = useDateFormatter(context.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const timeValue = dateValue ? timeFormatter.format(dateValue.toDate(getLocalTimeZone())) : '';

    // React.useEffect(() => {
    //   setTimeTextValue((s) => (s === timeValue ? s : timeValue));
    // }, [timeValue]);

    const handleDateChange = (date: Date | undefined) => {
      let newDate = date ? convertUTCDateToCalendarDateTime(date) : undefined;

      /**
       * If the date hasn't changed, don't do anything.
       */
      if (newDate && dateValue && newDate.compare(dateValue) === 0) {
        return;
      }

      if (timeValue && newDate) {
        const [hours, minutes] = timeValue.split(':');
        newDate = newDate.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) });
      }

      setDateValue(newDate);
    };

    const handleTimeChange = (time?: string) => {
      if (!time) {
        return;
      }

      const [hours, minutes] = time.split(':');
      const dateToSet = dateValue
        ? dateValue.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) })
        : convertUTCDateToCalendarDateTime(new Date()).set({
            hour: parseInt(hours, 10),
            minute: parseInt(minutes, 10),
          });

      setDateValue(dateToSet);
    };

    const handleDateClear: DatePickerProps['onClear'] = (e) => {
      setDateValue(undefined);
      // setTimeTextValue('');

      if (onClear) {
        onClear(e);
      }
    };

    const handleTimeClear = () => {
      const newDate = dateValue ? dateValue.set({ hour: 0, minute: 0 }) : convertUTCDateToCalendarDateTime(new Date());

      setDateValue(newDate);
      // setTimeTextValue('');
    };

    const timeId = useId();
    const dateId = useId();

    const composedRefs = useComposedRefs(DatePickerElement, forwardedRef);

    return (
      <Flex flex="1" gap={1}>
        <VisuallyHidden tag="label" htmlFor={dateId}>
          {dateLabel}
        </VisuallyHidden>
        <DatePicker
          {...props}
          selectedDate={dateValue?.toDate('UTC')}
          onChange={handleDateChange}
          error={typeof error === 'string'}
          required={required}
          size={size}
          onClear={onClear ? handleDateClear : undefined}
          clearLabel={`${clearLabel} date`}
          disabled={disabled}
          ref={composedRefs}
          id={dateId}
        />
        <VisuallyHidden tag="label" htmlFor={timeId}>
          {timeLabel}
        </VisuallyHidden>
        <TimePicker
          size={size}
          error={typeof error === 'string'}
          value={timeValue}
          onChange={handleTimeChange}
          onClear={onClear && timeValue !== undefined && timeValue !== '00:00' ? handleTimeClear : undefined}
          clearLabel={`${clearLabel} time`}
          required={required}
          disabled={disabled}
          step={step}
          id={timeId}
        />
      </Flex>
    );
  },
);

const warnOnce = once(console.warn);

export const convertUTCDateToCalendarDateTime = (date: Date | string, resetTime = true): CalendarDateTime => {
  /**
   * TODO: remove this in V2, it's a deprecated API
   */
  if (typeof date === 'string') {
    warnOnce(
      "It looks like you're passing a string as representation of a Date to the DatePicker. This is deprecated, look to passing a Date instead.",
    );
    const timestamp = Date.parse(date);

    if (!Number.isNaN(timestamp)) {
      date = new Date(timestamp);
    } else {
      date = new Date();
    }
  }

  const utcDateString = date.toISOString();
  let zonedDateTime = parseAbsoluteToLocal(utcDateString);

  if (resetTime) {
    zonedDateTime = zonedDateTime.set({ hour: 0, minute: 0 });
  }

  /**
   * ZonedDateTime can't have weeks added,
   * see – https://github.com/adobe/react-spectrum/issues/3667
   */
  return toCalendarDateTime(zonedDateTime);
};
