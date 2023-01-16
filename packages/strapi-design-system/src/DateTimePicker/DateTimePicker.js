import React, { useEffect, useState } from 'react';
import { Stack } from '../Stack';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { useId } from '../helpers/useId';
import { parseDate } from './parseDate';
import { dateTimePickerDefaultProps, dateTimePickerPropTypes } from './DateTimePickerProps';

export const DateTimePicker = ({
  ariaLabel,
  clearLabel,
  disabled,
  error,
  hint,
  label,
  labelAction,
  onChange,
  onClear,
  name,
  required,
  selectButtonTitle,
  size,
  step,
  value,
  ...props
}) => {
  const initialDate = parseDate(value);
  const [dateValue, setDateValue] = useState(initialDate);
  const [timeValue, setTimeValue] = useState(
    initialDate ? `${initialDate.getHours()}:${initialDate.getMinutes()}:${initialDate.getSeconds()}` : null,
  );

  const handleDateChange = (e) => {
    setDateValue(e);

    let dateToSet;

    if (timeValue) {
      dateToSet = new Date(e);
      dateToSet.setHours(timeValue.split(':')[0]);
      dateToSet.setMinutes(timeValue.split(':')[1]);
    } else {
      dateToSet = new Date(e);
      setTimeValue(`${dateToSet.getHours()}:${dateToSet.getMinutes()}:${dateToSet.getSeconds()}`);
    }
    if (onChange) {
      onChange(dateToSet);
    }
  };

  const handleTimeChange = (e) => {
    setTimeValue(e);

    const dateToSet = dateValue ? new Date(dateValue) : new Date();
    dateToSet.setHours(e.split(':')[0]);
    dateToSet.setMinutes(e.split(':')[1]);

    if (!dateValue) {
      setDateValue(dateToSet);
    }

    if (onChange) {
      onChange(dateToSet);
    }
  };

  const handleDateClear = () => {
    setDateValue(undefined);
    setTimeValue(undefined);
    onClear();
  };

  const handleTimeClear = () => {
    setTimeValue(undefined);

    let dateToSet;

    if (dateValue) {
      dateToSet = new Date(dateValue);
      dateToSet.setHours('00');
      dateToSet.setMinutes('00');
    }

    if (onChange) {
      onChange(dateToSet);
    }
  };

  useEffect(() => {
    if (value && +value !== +dateValue) {
      const parsedData = parseDate(value);
      setDateValue(parsedData);
      setTimeValue(
        parsedData ? `${parsedData.getHours()}:${parsedData.getMinutes()}:${parsedData.getSeconds()}` : null,
      );
    } else if (!value) {
      setDateValue(undefined);
      setTimeValue(undefined);
    }
  }, [value, dateValue]);

  const generatedId = useId('datetime-label', props?.id);
  const generatedFieldErrorId = useId('datetimepicker');

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
      <Stack spacing={1}>
        {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
        <Stack horizontal spacing={2}>
          <DatePicker
            data-testid="datetimepicker-date"
            // DateTimePicker sharing its Field id to DatePicker component
            id={generatedId}
            name={name}
            ariaLabel={label || ariaLabel}
            error={typeof error === 'string'}
            selectedDate={dateValue}
            selectedDateLabel={(formattedDate) => `Date picker, current is ${formattedDate}`}
            onChange={handleDateChange}
            required={required}
            size={size}
            onClear={onClear && handleDateClear}
            clearLabel={clearLabel}
            disabled={disabled}
            {...props}
          />
          <TimePicker
            data-testid="datetimepicker-time"
            size={size}
            aria-label={label || ariaLabel}
            error={typeof error === 'string'}
            value={timeValue}
            onChange={handleTimeChange}
            onClear={onClear && handleTimeClear}
            clearLabel={clearLabel}
            required={required}
            selectButtonTitle={selectButtonTitle}
            disabled={disabled}
            step={step}
          />
        </Stack>
        <FieldHint />
        <FieldError id={generatedFieldErrorId} />
      </Stack>
    </Field>
  );
};

DateTimePicker.defaultProps = dateTimePickerDefaultProps;

DateTimePicker.propTypes = dateTimePickerPropTypes;
