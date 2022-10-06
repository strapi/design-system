import React from 'react';
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
  showErrorBorder,
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
  const hoursCount = 24;
  const times = [];
  let min = 0;

  for (let i = 0; i < hoursCount; i++) {
    min = 0;

    while (min < 60) {
      times.push(`${i < 10 ? '0' + i : i}:${min < 10 ? '0' + min : min}`);
      min += step;
    }
  }

  // The time picker will select the closest value in the list.
  // This is a temporary fix.
  const getClosestValue = () => {
    const valueHours = value.split(':')[0];
    const valueMinutes = value.split(':')[1];

    const hours = times.reduce((prev, curr) => {
      const hours = curr.split(':')[0];
      return Math.abs(hours - valueHours) < Math.abs(prev - valueHours) ? hours : prev;
    }, times[0].split(':')[0]);
    const minutes = times.reduce((prev, curr) => {
      const minutes = curr.split(':')[1];
      return Math.abs(minutes - valueMinutes) < Math.abs(prev - valueMinutes) ? minutes : prev;
    }, times[0].split(':')[1]);

    return `${hours}:${minutes}`;
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
      showErrorBorder={showErrorBorder}
      value={value ? getClosestValue() : null}
      size={size}
      onChange={onChange}
      disabled={disabled}
      startIcon={
        <TimeIconWrapper>
          <Clock />
        </TimeIconWrapper>
      }
      {...props}
    >
      {times.map((time) => (
        <Option value={time} key={time}>
          {time}
        </Option>
      ))}
    </Select>
  );
};

TimePicker.defaultProps = {
  disabled: false,
  showErrorBorder: false,
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
  showErrorBorder: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
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
