import * as React from 'react';

import { Clock } from '@strapi/icons';
import styled, { ThemeSizes } from 'styled-components';

import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { Select, Option } from '../Select';

/**
 * TODO: this should extends SelectProps
 */
export interface TimePickerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'onChange' | 'id' | 'disabled' | 'size' | 'required'
  > {
  /**
   * @default 'Clear'
   */
  clearLabel?: string;
  /**
   * @default false
   */
  disabled?: boolean;
  error?: string | boolean;
  /**
   * TODO: this should be checked against the types for Field
   */
  hint?: string | boolean | React.ReactNode | React.ReactNode[];
  id?: string;
  label: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  /**
   * @default false
   */
  required?: boolean;
  selectButtonTitle?: string;
  /**
   * @default 'M'
   */
  size?: keyof ThemeSizes['input'];
  /**
   * @default 15
   */
  step?: number;
  value: string;
}

export const TimePicker = ({
  disabled = false,
  error,
  hint,
  id,
  onClear,
  onChange,
  value,
  clearLabel = 'Clear',
  label,
  required = false,
  selectButtonTitle,
  step = 15,
  size = 'M',
  ...props
}: TimePickerProps) => {
  const generatedId = useId(id);
  const hoursCount = 24;
  const times: string[] = [];
  let min = 0;

  for (let i = 0; i < hoursCount; i++) {
    min = 0;

    while (min < 60) {
      times.push(`${i < 10 ? `0${i}` : i}:${min < 10 ? `0${min}` : min}`);
      min += step;
    }
  }

  // The time picker will select the closest value in the list.
  // This is a temporary fix.
  // This whole thing needs refactoring – it's nonsensical.
  const getClosestValue = () => {
    const [valueHours, valueMinutes] = value.split(':') as [string, string];

    const hours = times.reduce((prev, curr) => {
      const [h] = curr.split(':');

      // @ts-expect-error this is gonna be refactored in an upcoming initiative
      return Math.abs(h - valueHours) < Math.abs(prev - valueHours) ? h : prev;
    }, times[0].split(':')[0]);

    const minutes = times.reduce((prev, curr) => {
      const minutes = curr.split(':')[1];

      // @ts-expect-error this is gonna be refactored in an upcoming initiative
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
      value={value ? getClosestValue() : null}
      size={size}
      onChange={onChange}
      disabled={disabled}
      required={required}
      selectButtonTitle={selectButtonTitle}
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

const TimeIconWrapper = styled(Flex)`
  & > svg {
    height: 1rem;
    width: 1rem;
  }

  & > svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
