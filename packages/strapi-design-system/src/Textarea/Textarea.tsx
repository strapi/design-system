import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../Box';
import { FieldProps } from '../Field';
import { inputFocusStyle } from '../themes/utils';

interface TextareaProps extends BoxProps<'textarea'>, Pick<FieldProps, 'error'> {
  value?: string;
  'aria-describedby'?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ disabled, error, required, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <Wrapper borderColor={hasError ? 'danger600' : 'neutral200'} hasError={hasError} hasRadius>
        <TextareaElement
          aria-invalid={hasError}
          aria-required={required}
          tag="textarea"
          background={disabled ? 'neutral150' : 'neutral0'}
          color={disabled ? 'neutral600' : 'neutral800'}
          disabled={disabled}
          fontSize={2}
          hasRadius
          height="10.5rem"
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

const Wrapper = styled<BoxComponent>(Box)`
  ${inputFocusStyle()}
`;

const TextareaElement = styled<BoxComponent<'textarea'>>(Box)`
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

export { Textarea };
export type { TextareaProps };
