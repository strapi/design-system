import React from 'react';
import { useField } from './FieldContext';
import { Typography } from '../Typography';

export const FieldHint = () => {
  const { id, hint, error } = useField();

  if (!hint || error) {
    return null;
  }

  return (
    <Typography variant="pi" as="p" id={`${id}-hint`} textColor="neutral600">
      {hint}
    </Typography>
  );
};
