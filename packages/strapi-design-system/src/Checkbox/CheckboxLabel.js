import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { useField } from '../Field';

const TextLabel = styled(Text)`
  display: flex;
  align-items: center;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  }
`;

export const CheckboxLabel = (props) => {
  const { id, error, hint } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `field-error-${id}`;
  } else if (hint) {
    ariaDescription = `field-hint-${id}`;
  }

  const hasError = Boolean(error);

  return (
    <TextLabel
      as="label"
      textColor="neutral800"
      aria-describedby={ariaDescription}
      aria-invalid={hasError}
      {...props}
    />
  );
};
