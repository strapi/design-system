import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { FieldProps } from '../Field';
import { useId } from '../hooks/useId';
import { inputFocusStyle } from '../themes/utils';

export interface TextareaProps extends TextareaInputBoxProps, Pick<FieldProps, 'error'> {
  /**
   * @preserve
   * @deprecated use `value` instead
   */
  children?: string;
  value?: string;
  'aria-describedby'?: string;
}

interface TextareaInputBoxProps extends Pick<FieldProps, 'error'>, BoxProps<'textarea'> {}

const Wrapper = styled(Box)`
  ${inputFocusStyle()}
`;

const TextareaElement = styled(Box)`
  border: none;
  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &:focus-within {
    outline: none;
  }
`;

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputBoxProps>(
  ({ disabled, error, required, ...props }, ref) => {
    const id = useId();

    const hasError = Boolean(error);

    return (
      <Wrapper borderColor={hasError ? 'danger600' : 'neutral200'} hasError={hasError} hasRadius>
        <TextareaElement
          aria-invalid={hasError}
          aria-required={required}
          as="textarea"
          background={disabled ? 'neutral150' : 'neutral0'}
          color={disabled ? 'neutral600' : 'neutral800'}
          disabled={disabled}
          fontSize={2}
          hasRadius
          height="10.5rem"
          id={id}
          ref={ref}
          lineHeight={4}
          padding={4}
          width="100%"
          {...props}
        />
      </Wrapper>
    );
  },
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ children, value, ...props }, ref) => {
  return <TextareaInput ref={ref} value={children ?? value} {...props} />;
});
