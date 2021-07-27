import React from 'react';
import { useField } from './FieldContext';
import { P } from '../Text';

export const FieldError = () => {
  const { id, error } = useField();

  if (!error) {
    return null;
  }

  return (
    <P small={true} id={`field-error-${id}`} textColor="danger600">
      {error}
    </P>
  );
};
