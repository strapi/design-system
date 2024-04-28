import * as React from 'react';

import styled, { css, DefaultTheme } from 'styled-components';

import { useField } from './FieldContext';
import { Box } from '../Box';
import { Flex, FlexComponent } from '../Flex';
import { inputFocusStyle } from '../themes/utils';

// padding-[top|bottom] must ensure, the input matches the height of getThemeSize('input')
const PADDING_Y = {
  S: 0.6,
  M: 1,
} as const;

export interface FieldInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  endAction?: React.ReactNode;
  startAction?: React.ReactNode;
  disabled?: boolean;
  size?: keyof DefaultTheme['sizes']['input'];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  ({ endAction, startAction, disabled = false, onChange, size = 'M', ...props }, ref) => {
    const { id, error, hint, name, required } = useField();

    let ariaDescription: string | undefined;

    if (error) {
      ariaDescription = `${id}-error`;
    } else if (hint) {
      ariaDescription = `${id}-hint`;
    }

    const hasError = Boolean(error);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!disabled && onChange) {
        onChange(e);
      }
    };

    return (
      <InputWrapper justifyContent="space-between" $hasError={hasError} $disabled={disabled}>
        {startAction ? (
          <Box paddingLeft={3} paddingRight={2}>
            {startAction}
          </Box>
        ) : null}
        <Input
          id={id}
          name={name}
          ref={ref}
          aria-describedby={ariaDescription}
          aria-invalid={hasError}
          aria-disabled={disabled}
          disabled={disabled}
          data-disabled={disabled ? '' : undefined}
          $hasLeftAction={Boolean(startAction)}
          $hasRightAction={Boolean(endAction)}
          onChange={handleChange}
          aria-required={required}
          $size={size}
          {...props}
        />
        {endAction ? (
          <Box paddingLeft={2} paddingRight={3}>
            {endAction}
          </Box>
        ) : null}
      </InputWrapper>
    );
  },
);

const Input = styled.input<{
  $hasLeftAction: boolean;
  $hasRightAction: boolean;
  $size: keyof DefaultTheme['sizes']['input'];
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding-bottom: ${({ $size }) => `${PADDING_Y[$size]}rem`};
  padding-left: ${({ theme, $hasLeftAction }) => ($hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, $hasRightAction }) => ($hasRightAction ? 0 : theme.spaces[4])};
  padding-top: ${({ $size }) => `${PADDING_Y[$size]}rem`};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : undefined)};

  color: ${({ theme }) => theme.colors.neutral800};
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes[2]};
  display: block;
  width: 100%;
  background: inherit;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &[aria-disabled='true'] {
    color: inherit;
  }

  //focus managed by InputWrapper
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const InputWrapper = styled<FlexComponent>(Flex)<{ $disabled: boolean; $hasError: boolean }>`
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  ${inputFocusStyle()}

  ${({ theme, $disabled }) =>
    $disabled
      ? css`
          color: ${theme.colors.neutral600};
          background: ${theme.colors.neutral150};
        `
      : undefined}
`;
