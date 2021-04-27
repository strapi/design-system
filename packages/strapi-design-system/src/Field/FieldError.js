import React from 'react';
import { useField } from './FieldContext';
import { Text } from '../Text';

export const FieldError = () => {
  const { id, error } = useField();

  if (!error) {
    return null;
  }

  return (
    <Text small={true} id={`field-error-${id}`} textColor="danger600">
      {error}
    </Text>
  );
};
