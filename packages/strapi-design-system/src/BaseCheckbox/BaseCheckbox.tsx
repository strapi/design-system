import * as React from 'react';

import styled from 'styled-components';

import checkmarkIconDisabled from './assets/checkmark-black.svg';
import checkmarkIcon from './assets/checkmark.svg';
import { getCheckboxSize } from './utils';
import { Box } from '../Box';

export type BaseCheckboxSize = 'S' | 'M';

export interface CheckboxInputProps {
  size: BaseCheckboxSize;
}

const CheckboxInput = styled.input`
  height: ${getCheckboxSize};
  min-width: ${getCheckboxSize};
  margin: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  -webkit-appearance: none;
  background-color: ${({ theme }) => theme.colors.neutral0};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary600};
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    &:after {
      content: '';
      display: block;
      position: relative;
      background: url(${checkmarkIcon}) no-repeat no-repeat center center;
      width: 10px;
      height: 10px;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:disabled:after {
      background: url(${checkmarkIconDisabled}) no-repeat no-repeat center center;
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral200};
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
  }

  &:indeterminate {
    background-color: ${({ theme }) => theme.colors.primary600};
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    &:after {
      content: '';
      display: block;
      position: relative;
      color: white;
      height: 2px;
      width: 10px;
      background-color: ${({ theme }) => theme.colors.neutral0};
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.neutral200};
      border: 1px solid ${({ theme }) => theme.colors.neutral300};
      &:after {
        background-color: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }
`;

export interface BaseCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'> {
  /**
   * If `true`, display the indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * `Checkbox` input name
   */
  name?: string;
  /**
   * The callback invoked when click on the `Checkbox`
   * `(value: Bool) => {}`
   */
  onValueChange?: (isChecked: boolean) => void;
  /**
   * Set the size of the checkbox
   */
  size?: BaseCheckboxSize;
  value?: boolean;
}

export const BaseCheckbox = ({
  indeterminate = false,
  size = 'M',
  name,
  value = false,
  onValueChange,
  ...inputProps
}: BaseCheckboxProps) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (checkboxRef.current && indeterminate) {
      checkboxRef.current.indeterminate = indeterminate;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [indeterminate]);

  const handleValueChange = () => {
    if (onValueChange) {
      onValueChange(!value);
    }
  };

  return (
    <Box>
      <CheckboxInput
        size={size}
        checked={value}
        onChange={handleValueChange}
        type="checkbox"
        ref={checkboxRef}
        name={name}
        {...inputProps}
      />
    </Box>
  );
};

BaseCheckbox.displayName = 'BaseCheckbox';
