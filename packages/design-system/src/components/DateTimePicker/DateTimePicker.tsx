import * as React from 'react';

import { CalendarDateTime, parseAbsoluteToLocal, toCalendarDateTime, getLocalTimeZone } from '@internationalized/date';
import { styled } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useDesignSystem } from '../../utilities/DesignSystemProvider';
import { DatePicker as DatePickerInput, DatePickerProps, DatePickerElement } from '../DatePicker/DatePicker';
import { Field, useField } from '../Field';
import { Flex } from '../Flex';
import { TimePicker as BaseTimePicker, TimePickerProps } from '../TimePicker';

const DatePicker = styled(DatePickerInput)`
  flex: 1 1 70%;
  min-width: 120px;
`;

const TimePicker = styled(BaseTimePicker)`
  flex: 1 1 30%;
  min-width: 140px;
`;

export interface DateTimePickerProps
  extends Omit<DatePickerProps, 'step' | 'onChange' | 'value'>,
    Pick<TimePickerProps, 'step'> {
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
      hasError: hasErrorProp,
      onChange,
      onClear,
      required = false,
      step,
      value,
      initialDate,
      size,
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

    const composedRefs = useComposedRefs(DatePickerElement, forwardedRef);

    const { error, id, labelNode } = useField('DateTimePicker');

    const hasError = Boolean(error) || hasErrorProp;

    return (
      <Flex aria-labelledby={labelNode ? `${id}-label` : undefined} role="group" flex="1" gap={1}>
        <Field.Root>
          <DatePicker
            {...props}
            size={size}
            value={dateValue?.toDate('UTC')}
            onChange={handleDateChange}
            required={required}
            onClear={onClear ? handleDateClear : undefined}
            clearLabel={`${clearLabel} date`}
            disabled={disabled}
            ref={composedRefs}
            aria-label={dateLabel}
          />
        </Field.Root>
        <Field.Root>
          <TimePicker
            size={size}
            hasError={hasError}
            value={timeValue}
            onChange={handleTimeChange}
            onClear={onClear && timeValue !== undefined && timeValue !== '00:00' ? handleTimeClear : undefined}
            clearLabel={`${clearLabel} time`}
            required={required}
            disabled={disabled}
            step={step}
            aria-label={timeLabel}
          />
        </Field.Root>
      </Flex>
    );
  },
);

export const convertUTCDateToCalendarDateTime = (date: Date, resetTime = true): CalendarDateTime => {
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
