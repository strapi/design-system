import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '../Stack';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { Flex } from '../Flex';
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
  }, [value]);

  return (
    <Field name={name} role="group" aria-labelledby="datetime-label" hint={hint} error={error}>
      <Stack spacing={1}>
        {label && (
          <Flex>
            <FieldLabel required={required} action={labelAction} id="datetime-label">
              {label}
            </FieldLabel>
          </Flex>
        )}
        <Stack horizontal spacing={2}>
          <DatePicker
            data-testid="datetimepicker-date"
            name={name}
            ariaLabel={label || ariaLabel}
            error={typeof error === 'string'}
            selectedDate={dateValue}
            selectedDateLabel={(formattedDate) => `Date picker, current is ${formattedDate}`}
            onChange={handleDateChange}
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
            disabled={disabled}
            step={step}
          />
        </Stack>
        <FieldHint />
        <FieldError id="datetimepicker" />
      </Stack>
    </Field>
  );
};

DateTimePicker.defaultProps = dateTimePickerDefaultProps;

DateTimePicker.propTypes = dateTimePickerPropTypes;

DateTimePicker.defaultProps = {
  ariaLabel: undefined,
  clearLabel: 'clear',
  disabled: false,
  error: undefined,
  hint: undefined,
  label: undefined,
  labelAction: undefined,
  onClear: undefined,
  required: false,
  size: 'M',
  step: 1,
  value: undefined,
};

DateTimePicker.propTypes = {
  ariaLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M']),
  step: PropTypes.number,
  value: PropTypes.instanceOf(Date),
};
