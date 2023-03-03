import React, { useContext } from 'react';

import styled from 'styled-components';

import { RadioContext } from './context';
import { RadioGroupSize } from './RadioGroup';
import { getRadioSize, getSelectedRadioSize, getSelectedRadioPosition } from './utils';
import { useId } from '../hooks/useId';

const RadioInput = styled.input<{ size: RadioGroupSize | number }>`
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.primary600};
  border-radius: 50%;
  height: ${({ size }) => (typeof size === 'number' ? size : getRadioSize(size))};
  width: ${({ size }) => (typeof size === 'number' ? size : getRadioSize(size))};
  -webkit-appearance: none;

  &:after {
    border-radius: 50%;
    content: '';
    position: relative;
    z-index: 1;
    display: block;
    height: ${({ size }) => (typeof size === 'number' ? size : getSelectedRadioSize(size))};
    width: ${({ size }) => (typeof size === 'number' ? size : getSelectedRadioSize(size))};
    left: ${getSelectedRadioPosition};
    top: ${getSelectedRadioPosition};
  }

  &:checked:after {
    background: ${({ theme }) => theme.colors.primary600};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    background: ${({ theme }) => theme.colors.neutral200};
  }
`;

export interface BaseRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  value: string;
}

export const BaseRadio = React.forwardRef<HTMLInputElement, BaseRadioProps>(
  ({ value, disabled = false, ...props }, ref) => {
    const generatedId = useId();
    const { onChange, selected, name, size } = useContext(RadioContext);
    const isSelected = selected === value;

    return (
      <RadioInput
        ref={ref}
        type="radio"
        name={name}
        value={value}
        tabIndex={isSelected ? 0 : -1}
        aria-checked={isSelected}
        checked={isSelected}
        disabled={disabled}
        id={generatedId}
        // @ts-expect-error size is a html prop already.
        size={size}
        onChange={onChange}
        {...props}
      />
    );
  },
);

BaseRadio.displayName = 'Radio';
