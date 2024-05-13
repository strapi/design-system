import * as React from 'react';

import { styled } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';

import checkmarkIconDisabled from './assets/checkmark-black.svg';
import checkmarkIcon from './assets/checkmark.svg';

interface BaseCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'> {
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
  value?: boolean;
}

type CheckboxElement = HTMLInputElement;

const BaseCheckbox = React.forwardRef<CheckboxElement, BaseCheckboxProps>(
  ({ indeterminate = false, name, value = false, onValueChange, ...inputProps }, forwardedRef) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null!);

    const composedRefs = useComposedRefs(checkboxRef, forwardedRef);

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
      <CheckboxInput
        checked={value}
        onChange={handleValueChange}
        type="checkbox"
        ref={composedRefs}
        name={name}
        {...inputProps}
      />
    );
  },
);

BaseCheckbox.displayName = 'BaseCheckbox';

const CheckboxInput = styled.input`
  min-width: 1.8rem;
  height: 1.8rem;
  margin: 0;
  appearance: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  background-color: ${({ theme }) => theme.colors.neutral0};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary600};
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    &:after {
      content: '';
      display: block;
      position: relative;
      background: ${() => `url("${checkmarkIcon}") no-repeat no-repeat center center`};
      width: 1rem;
      height: 1rem;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:disabled:after {
      background: ${() => `url("${checkmarkIconDisabled}") no-repeat no-repeat center center`};
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

export { BaseCheckbox };
export type { BaseCheckboxProps, CheckboxElement };
