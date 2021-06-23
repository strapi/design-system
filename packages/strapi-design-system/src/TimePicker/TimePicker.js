import React from 'react';
import PropTypes from 'prop-types';
import TimeIcon from '@strapi/icons/Time';
import styled from 'styled-components';
import { Select, Option } from '../Select';

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
  ...props
}) => {
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

  return (
    <Select
      id={id}
      label={label}
      placeholder={'--:--'}
      hint={hint}
      onClear={onClear}
      clearLabel={clearLabel}
      error={error}
      value={value}
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
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
};
