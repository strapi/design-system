import * as React from 'react';

import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { inputFocusStyle } from '../../themes/utils';
import { Field, useField } from '../Field';

interface TextareaProps
  extends Omit<BoxProps<'textarea'>, 'children'>,
    Pick<Field.InputProps, 'hasError' | 'id' | 'name' | 'required'> {
  value?: string;
  'aria-describedby'?: string;
  resizable?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      disabled,
      hasError: hasErrorProp,
      id: idProp,
      name: nameProp,
      required: requiredProp,
      resizable = true,
      ...props
    },
    ref,
  ) => {
    const { error, ...field } = useField('Textarea');
    const hasError = Boolean(error) || hasErrorProp;
    const id = field.id ?? idProp;
    const name = field.name ?? nameProp;
    const required = field.required || requiredProp;
    let ariaDescription: string | undefined;
    if (error) {
      ariaDescription = `${id}-error`;
    } else if (field.hint) {
      ariaDescription = `${id}-hint`;
    }

    return (
      <Wrapper borderColor={hasError ? 'danger600' : 'neutral200'} $hasError={hasError} hasRadius>
        <TextareaElement
          aria-invalid={hasError}
          aria-required={required}
          tag="textarea"
          background={disabled ? 'neutral150' : 'neutral0'}
          color={disabled ? 'neutral600' : 'neutral800'}
          disabled={disabled}
          fontSize={2}
          hasRadius
          ref={ref}
          lineHeight={4}
          padding={4}
          width="100%"
          height="100%"
          id={id}
          name={name}
          aria-describedby={ariaDescription}
          $resizable={resizable}
          {...props}
        />
      </Wrapper>
    );
  },
);

const Wrapper = styled<BoxComponent>(Box)<{ $hasError?: boolean }>`
  ${inputFocusStyle()}
`;

const TextareaElement = styled<BoxComponent<'textarea'>>(Box)`
  display: block;
  border: none;
  resize: ${({ $resizable }) => ($resizable ? 'vertical' : 'none')};
  min-height: ${({ minHeight }) => minHeight || '10.5rem'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral600};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    opacity: 1;
  }

  &:focus-within {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export { Textarea };
export type { TextareaProps };
