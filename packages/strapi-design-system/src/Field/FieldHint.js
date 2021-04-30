import React from 'react';
import { useField } from './FieldContext';
import { Text } from '../Text';

export const FieldHint = () => {
  const { id, hint, error } = useField();

  if (!hint || error) {
    return null;
  }

  return (
    <Text small={true} id={`field-hint-${id}`} textColor="neutral600">
      {hint}
    </Text>
  );
};
