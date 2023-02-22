import React from 'react';

import { Typography } from '../Typography';
import { useField } from './FieldContext';

export const FieldHint = () => {
  const { id, hint, error } = useField();

  if (!hint || typeof hint !== 'string' || error) {
    return null;
  }

  return (
    <Typography variant="pi" as="p" id={`${id}-hint`} textColor="neutral600">
      {hint}
    </Typography>
  );
};
