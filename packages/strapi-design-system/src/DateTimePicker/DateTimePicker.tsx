/**
 * TODO: refactor this to only use the Inputs and not the whole DatePicker and TimePicker
 * this way the underlying Field components aren't complaining and the inputs _should_
 * not require error and hint being passed.
 */
import { ReactNode } from 'react';

import { DatePicker, DatePickerProps } from '../DatePicker';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { Flex } from '../Flex';
import { useControllableState } from '../hooks/useControllableState';
import { useId } from '../hooks/useId';
import { TimePicker, TimePickerProps } from '../TimePicker';

export interface DateTimePickerProps
  extends Omit<DatePickerProps, 'value' | 'step' | 'onChange'>,
    Pick<TimePickerProps, 'step'> {
  /**
   * Aria Label used by the DatePicker and the TimePicker inside the DateTimePicker component
   */
  ariaLabel?: string;
  /**
   * Label used to describe the DateTimePicker component
   */
  label: string;
  /**
   * Label Action
   */
  labelAction?: ReactNode;
  onChange?: (date: Date | undefined) => void;
  /**
   * Text used to define the title of the button to open the select options (inside the TimePicker)
   * @default 'select'
   */
  selectButtonTitle?: string;
  /**
   * Value. The Date passed as value
   */
  value?: Date;
}

export const DateTimePicker = ({
  ariaLabel,
  clearLabel = 'clear',
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
  selectButtonTitle = 'select',
  size = 'M',
  step = 1,
  value,
  ...props
}: DateTimePickerProps) => {
  const initialDate = parseDate(value);
  const [dateValue, setDateValue] = useControllableState<Date | undefined>({
    prop: initialDate,
    onChange,
  });
  const timeValue = dateValue
    ? `${dateValue.getHours()}:${dateValue.getMinutes()}:${dateValue.getSeconds()}`
    : undefined;

  const handleDateChange = (date: Date) => {
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':');
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }

    setDateValue(date);
  };

  const handleTimeChange = (time: string) => {
    const dateToSet = dateValue ? new Date(dateValue) : new Date();
    const [hours, minutes] = time.split(':');
    dateToSet.setHours(parseInt(hours, 10));
    dateToSet.setMinutes(parseInt(minutes, 10));

    setDateValue(dateToSet);
  };

  const handleDateClear = () => {
    setDateValue(undefined);

    if (onClear) {
      onClear();
    }
  };

  const handleTimeClear = () => {
    /**
     * Don't ask, i guess its a TS overload thing...
     */
    let dateToSet = dateValue ? new Date(dateValue) : new Date();
    dateToSet.setHours(0);
    dateToSet.setMinutes(0);

    setDateValue(dateToSet);
  };

  const generatedId = useId(id);

  return (
    <Field
      name={name}
      role="group"
      id={generatedId}
      aria-labelledby={generatedId}
      hint={hint}
      error={error}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <Flex gap={2}>
          {/* @ts-expect-error label should be required here and we should refactor DatePicker */}
          <DatePicker
            ariaLabel={label || ariaLabel}
            selectedDate={dateValue}
            selectedDateLabel={(formattedDate) => `Date picker, current is ${formattedDate}`}
            onChange={handleDateChange}
            error={typeof error === 'string'}
            hint={typeof hint === 'string'}
            required={required}
            size={size}
            onClear={handleDateClear}
            clearLabel={`${clearLabel} date`}
            disabled={disabled}
            id={generatedId}
            {...props}
          />
          {/* @ts-expect-error label should be required here and we should refactor TimePicker */}
          <TimePicker
            size={size}
            aria-label={label || ariaLabel}
            error={typeof error === 'string'}
            hint={typeof hint === 'string'}
            value={timeValue}
            onChange={handleTimeChange}
            /**
             * In reality the time picker is only cleared when there is no date otherwise it's just 00:00
             * and we should show that for accurate UX and therefore you cannot clear it when it's 00:00.
             */
            onClear={timeValue !== undefined && timeValue !== '0:0:0' ? handleTimeClear : undefined}
            clearLabel={`${clearLabel} time`}
            required={required}
            selectButtonTitle={selectButtonTitle}
            disabled={disabled}
            step={step}
            id={generatedId}
          />
        </Flex>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};

const parseDate = (date) => {
  const timestamp = Date.parse(date);

  if (!Number.isNaN(timestamp)) {
    return new Date(timestamp);
  }

  return undefined;
};
