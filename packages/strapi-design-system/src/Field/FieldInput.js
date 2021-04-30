import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Row } from '../Row';

const Input = styled.input`
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  color: ${({ theme }) => theme.colors.neutral800};
  background: ${({ theme }) => theme.colors.neutral0};
  font-weight: 400;
  // TODO: Make sure to use the theme when it's ready
  font-size: ${14 / 16}rem;
  display: block;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  :disabled {
    color: ${({ theme }) => theme.colors.neutral500};
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;

export const FieldInput = forwardRef(({ action, ...props }, ref) => {
  const { id, error, hint, name } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `field-error-${id}`;
  } else if (hint) {
    ariaDescription = `field-hint-${id}`;
  }

  const fieldId = `field-${id}`;
  const hasError = Boolean(error);

  return (
    <Row justifyContent="space-between">
      <Input
        id={fieldId}
        name={name}
        ref={ref}
        hasError={hasError}
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        {...props}
      />
      {action}
    </Row>
  );
});

FieldInput.displayName = 'FieldInput';

FieldInput.defaultProps = {
  action: undefined,
};

FieldInput.propTypes = {
  action: PropTypes.element,
};
