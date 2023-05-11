import * as React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { Field, FieldLabel, FieldHint, FieldError, useField } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { inputFocusStyle } from '../themes/utils';

const TextareaInputWrapper = styled(Box)`
  ${inputFocusStyle()}
`;

const TextareaInputElement = styled(Box)`
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

const TextareaInput = React.forwardRef(({ disabled, ...props }, ref) => {
  const { id, error, hint, required } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `${id}-error`;
  } else if (hint) {
    ariaDescription = `${id}-hint`;
  }

  const hasError = Boolean(error);

  return (
    <TextareaInputWrapper borderColor={hasError ? 'danger600' : 'neutral200'} hasRadius>
      <TextareaInputElement
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        aria-required={required}
        as="textarea"
        background={disabled ? 'neutral150' : 'neutral0'}
        color={disabled ? 'neutral600' : 'neutral800'}
        fontSize={2}
        hasRadius
        height={`${105 / 16}rem`}
        id={id}
        ref={ref}
        disabled={disabled}
        lineHeights={4}
        padding={4}
        width="100%"
        {...props}
      />
    </TextareaInputWrapper>
  );
});

TextareaInput.displayName = 'TextareaInput';

TextareaInput.defaultProps = {
  disabled: false,
};

TextareaInput.propTypes = {
  disabled: PropTypes.bool,
};

export const Textarea = React.forwardRef(
  ({ name, hint, error, label, children, labelAction, id, required, ...props }, ref) => {
    const generatedId = useId(id);

    return (
      <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}

          <TextareaInput ref={ref} value={children} {...props} />

          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },
);

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  'aria-label': undefined,
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  children: '',
  required: false,
};

Textarea.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
