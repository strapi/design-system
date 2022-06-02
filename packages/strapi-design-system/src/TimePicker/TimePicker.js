import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Clock from '@strapi/icons/Clock';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { Select, Option } from '../Select';
import { useId } from '../helpers/useId';

const TimeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 1rem;
    width: 1rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const TimePicker = ({
  disabled,
  error,
  hint,
  id,
  onClear,
  onChange,
  value,
  clearLabel,
  label,
  step,
  size,
  ...props
}) => {
  const generatedId = useId('timepicker', id);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')), []);
  const minutes = useMemo(
    () => Array.from({ length: Math.ceil(60 / step) }, (_, i) => (step * i).toString().padStart(2, '0')),
    [step],
  );

  // The time picker will select the closest value in the list.
  // This is a temporary fix.
  const getClosestValue = () => {
    const valueHour = value.split(':')[0];
    const valueMinute = value.split(':')[1];

    const hour = hours.reduce((prev, curr) => {
      return Math.abs(curr - valueHour) < Math.abs(prev - valueHour) ? curr : prev;
    }, hours[0]);
    const minute = minutes.reduce((prev, curr) => {
      return Math.abs(curr - valueMinute) < Math.abs(prev - valueMinute) ? curr : prev;
    }, minutes[0]);

    return { hour, minute };
  };

  return (
    <Select
      id={generatedId}
      label={label}
      placeholder="--:--"
      hint={hint}
      onClear={onClear}
      clearLabel={clearLabel}
      error={error}
      value={value ? getClosestValue() : { hour: null, minute: null }}
      size={size}
      onChange={({ hour, minute }) => onChange(`${hour}:${minute}`)}
      disabled={disabled}
      startIcon={
        <TimeIconWrapper>
          <Clock />
        </TimeIconWrapper>
      }
      timepicker
      {...props}
    >
      {hours.map((hour) => (
        <Option value={hour} key={hour} timepickerValue="hour">
          {hour}
        </Option>
      ))}
      {minutes.map((minute) => (
        <Option value={minute} key={minute} timepickerValue="minute">
          {minute}
        </Option>
      ))}
    </Select>
  );
};

TimePicker.defaultProps = {
  disabled: false,
  error: undefined,
  hint: undefined,
  id: undefined,
  label: undefined,
  onClear: undefined,
  size: 'M',
  step: 15,
  value: undefined,
};

TimePicker.propTypes = {
  clearLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
};
