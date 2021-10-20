import React from 'react';
import PropTypes from 'prop-types';
import TimeIcon from '@strapi/icons/Time';
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
    const valueMinutes = value.split(':')[1];
    const minutes = times.reduce((prev, curr) => {
      const minutes = curr.split(':')[1];
      return Math.abs(minutes - valueMinutes) < Math.abs(prev - valueMinutes) ? minutes : prev;
    }, times[0].split(':')[1]);

    return `${value.split(':')[0]}:${minutes}`;
  };

  return (
    <Select
      id={generatedId}
      label={label}
      placeholder={'--:--'}
      hint={hint}
      onClear={onClear}
      clearLabel={clearLabel}
      error={error}
      value={value ? getClosestValue() : null}
      size={size}
      onChange={onChange}
      disabled={disabled}
      startIcon={
        <TimeIconWrapper>
          <TimeIcon />
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
  id: undefined,
  onClear: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
  size: 'M',
  step: 15,
};

TimePicker.propTypes = {
  clearLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
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
