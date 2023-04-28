import { ReactNode } from 'react';

import { DatePickerInput, DatePickerInputProps } from '../DatePicker/DatePicker';
import { Field, FieldHint, FieldLabel, FieldError, FieldProps } from '../Field';
import { Flex } from '../Flex';
import { useControllableState } from '../hooks/useControllableState';
import { useId } from '../hooks/useId';
import { TimePickerInput, TimePickerProps } from '../TimePicker';

export interface DateTimePickerProps
  extends Omit<DatePickerInputProps, 'value' | 'step' | 'onChange' | 'error'>,
    Pick<TimePickerProps, 'step' | 'selectButtonTitle'>,
    Pick<FieldProps, 'name' | 'hint' | 'error'> {
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
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  selectButtonTitle: _selectButtonTitle,
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

  const handleDateChange = (date: Date | undefined) => {
    if (timeValue && date) {
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

  const handleDateClear: DatePickerInputProps['onClear'] = (e) => {
    setDateValue(undefined);

    if (onClear) {
      onClear(e);
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
          <DatePickerInput
            ariaLabel={label || ariaLabel}
            selectedDate={dateValue}
            onChange={handleDateChange}
            error={typeof error === 'string'}
            required={required}
            size={size}
            onClear={handleDateClear}
            clearLabel={`${clearLabel} date`}
            disabled={disabled}
            id={generatedId}
            {...props}
          />
          <TimePickerInput
            size={size}
            aria-label={label || ariaLabel}
            error={typeof error === 'string'}
            value={timeValue}
            onChange={handleTimeChange}
            /**
             * In reality the time picker is only cleared when there is no date otherwise it's just 00:00
             * and we should show that for accurate UX and therefore you cannot clear it when it's 00:00.
             */
            onClear={timeValue !== undefined && timeValue !== '0:0:0' ? handleTimeClear : undefined}
            clearLabel={`${clearLabel} time`}
            required={required}
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
