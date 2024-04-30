import * as React from 'react';

import { styled } from 'styled-components';

import { useId } from '../../hooks/useId';

import { useRadioGroup } from './RadioGroup';

interface BaseRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  value: string;
}

const BaseRadio = React.forwardRef<HTMLInputElement, BaseRadioProps>(({ value, disabled = false, ...props }, ref) => {
  const generatedId = useId();
  const { onChange, selected, name } = useRadioGroup('BaseRadio');
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
      onChange={onChange}
      {...props}
    />
  );
});

BaseRadio.displayName = 'Radio';

const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.primary600};
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;

  &:after {
    border-radius: 50%;
    content: '';
    position: relative;
    z-index: 1;
    display: block;
    height: 1rem;
    width: 1rem;
    left: 0.3rem;
    top: 0.3rem;
  }

  &:checked:after {
    background: ${({ theme }) => theme.colors.primary600};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    background: ${({ theme }) => theme.colors.neutral200};
  }
`;

export { BaseRadio };
export type { BaseRadioProps };
