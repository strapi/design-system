import React, { ReactNode } from 'react';

import { CalendarDateTime, parseAbsoluteToLocal, toCalendarDateTime } from '@internationalized/date';
import styled from 'styled-components';

import { DatePickerInput, DatePickerInputProps } from '../DatePicker/DatePicker';
import { useDesignSystem } from '../DesignSystemProvider';
import { Field, FieldHint, FieldLabel, FieldError, FieldProps } from '../Field';
import { Flex } from '../Flex';
import { useControllableState } from '../hooks/useControllableState';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { useId } from '../hooks/useId';
import { TimePickerInput, TimePickerProps } from '../TimePicker';
import { VisuallyHidden } from '../VisuallyHidden';

export interface DateTimePickerProps
  extends Omit<DatePickerInputProps, 'step' | 'onChange' | 'error' | 'selectedDate'>,
    Pick<TimePickerProps, 'step' | 'selectButtonTitle'>,
    Pick<FieldProps, 'name' | 'hint' | 'error'> {
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
  /**
   * Label used to describe the DateTimePicker fieldset
   */
  label: string;
  /**
   * Label Action
   */
  labelAction?: ReactNode;
  onChange?: (date: Date | undefined) => void;
  /**
   * Value. The Date passed as value
   */
  value?: Date | null;
}

const TIME_ZONE = 'UTC';

export const DateTimePicker = ({
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  ariaLabel: _ariaLabel,
  clearLabel = 'clear',
  dateLabel = 'Choose date',
  timeLabel = 'Choose time',
  disabled = false,
  error,
  hint,
  id,
  label,
  labelAction,
  onChange,
  onClear,
  name,
  required = false,
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  selectButtonTitle: _selectButtonTitle,
  size = 'M',
  step = 1,
  value,
  initialDate,
  ...props
}: DateTimePickerProps) => {
  const datePickerRef = React.useRef<HTMLInputElement>(null!);

  const [dateValue, setDateValue] = useControllableState<CalendarDateTime | undefined>({
    defaultProp: initialDate ? convertUTCDateToCalendarDateTime(initialDate) : undefined,
    prop: value ? convertUTCDateToCalendarDateTime(value) : value ?? undefined,
    onChange(date) {
      if (onChange) {
        onChange(date?.toDate('UTC'));
      }
    },
  });

  const context = useDesignSystem('DateTimePicker');

  const timeFormatter = useDateFormatter(context.locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [timeTextValue, setTimeTextValue] = React.useState<string | undefined>('');
  const timeValue = dateValue ? timeFormatter.format(dateValue.toDate(TIME_ZONE)) : '';

  if (timeTextValue !== timeValue) {
    setTimeTextValue(timeValue);
  }

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
      : convertUTCDateToCalendarDateTime(new Date()).set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) });

    setDateValue(dateToSet);
  };

  const handleDateClear: DatePickerInputProps['onClear'] = (e) => {
    setDateValue(undefined);
    setTimeTextValue('');

    if (onClear) {
      onClear(e);
    }
  };

  const handleTimeClear = () => {
    const newDate = dateValue
      ? dateValue.set({ hour: 0, minute: 0 })
      : convertUTCDateToCalendarDateTime(new Date()).set({ hour: 0, minute: 0 });

    setDateValue(newDate);
    setTimeTextValue('');
  };

  const generatedId = useId(id);

  const timeId = useId();
  const dateId = useId();

  return (
    <Field
      name={name}
      as="fieldset"
      id={generatedId}
      aria-labelledby={generatedId}
      hint={hint}
      error={error}
      required={required}
    >
      <Flex as="span" direction="column" alignItems="stretch" gap={1}>
        <FieldLabel
          onClick={() => {
            /**
             * We're using fieldsets and legends and because they're not directly associated with the input
             * we want to manually focus the input because the labels for these inputs are visually hidden.
             */
            datePickerRef.current.focus();
          }}
          as="legend"
          id={generatedId}
          action={labelAction}
        >
          {label}
        </FieldLabel>
        <Flex flex="1" gap={1}>
          <VisuallyHidden as="label" htmlFor={dateId}>
            {dateLabel}
          </VisuallyHidden>
          <DatePicker
            {...props}
            selectedDate={dateValue?.toDate(TIME_ZONE)}
            onChange={handleDateChange}
            error={typeof error === 'string'}
            required={required}
            size={size}
            onClear={handleDateClear}
            clearLabel={`${clearLabel} date`}
            disabled={disabled}
            id={dateId}
            ref={datePickerRef}
            aria-describedby={`${generatedId}-hint ${generatedId}-error`}
          />
          <VisuallyHidden as="label" htmlFor={timeId}>
            {timeLabel}
          </VisuallyHidden>
          <TimePicker
            size={size}
            error={typeof error === 'string'}
            value={timeValue}
            onChange={handleTimeChange}
            onClear={timeValue !== undefined && timeValue !== '00:00' ? handleTimeClear : undefined}
            clearLabel={`${clearLabel} time`}
            required={required}
            disabled={disabled}
            step={step}
            id={timeId}
            aria-describedby={`${generatedId}-hint ${generatedId}-error`}
            textValue={timeTextValue}
            onTextValueChange={setTimeTextValue}
          />
        </Flex>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};

export const convertUTCDateToCalendarDateTime = (date: Date): CalendarDateTime => {
  const utcDateString = date.toISOString();
  const zonedDateTime = parseAbsoluteToLocal(utcDateString);

  /**
   * ZonedDateTime can't have weeks added,
   * see – https://github.com/adobe/react-spectrum/issues/3667
   */
  return toCalendarDateTime(zonedDateTime);
};

const DatePicker = styled(DatePickerInput)`
  flex: 1 0 70%;
`;

const TimePicker = styled(TimePickerInput)`
  flex: 1 0 30%;
`;
