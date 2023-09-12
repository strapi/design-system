import React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Field, FieldLabel, FieldHint, FieldError, FieldProps, useField, FieldLabelProps } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { inputFocusStyle } from '../themes/utils';

export interface TextareaProps extends TextareaInputBoxProps, Pick<FieldProps, 'hint' | 'error'> {
  /**
   * @preserve
   * @deprecated use `value` instead
   */
  children?: string;
  label?: string;
  labelAction?: FieldLabelProps['action'];
  value?: string;
}

interface TextareaInputBoxProps extends BoxProps<'textarea'> {}

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

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputBoxProps>(({ disabled, ...props }, ref) => {
  const { id, error, hint, required } = useField();

  const hasError = Boolean(error);
  let ariaDescription = hint ? `${id}-hint` : undefined;

  if (error) {
    ariaDescription = `${id}-error`;
  }

  return (
    <Wrapper borderColor={hasError ? 'danger600' : 'neutral200'} hasError={hasError} hasRadius>
      <TextareaElement
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        aria-required={required}
        as="textarea"
        background={disabled ? 'neutral150' : 'neutral0'}
        color={disabled ? 'neutral600' : 'neutral800'}
        disabled={disabled}
        fontSize={2}
        hasRadius
        height={`${105 / 16}rem`}
        id={id}
        ref={ref}
        lineHeight={4}
        padding={4}
        width="100%"
        {...props}
      />
    </Wrapper>
  );
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, hint, error, label, labelAction, id, required = false, children, value, ...props }, ref) => {
    const generatedId = useId(id);

    return (
      <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}

          <TextareaInput ref={ref} value={children ?? value} {...props} />

          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },
);
