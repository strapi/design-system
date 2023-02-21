import React from 'react';

import { Typography } from '../Typography';
import { useField } from './FieldContext';

export const FieldError = () => {
  const { id, error } = useField();

  if (!error || typeof error !== 'string') {
    return null;
  }

  return (
    <Typography variant="pi" as="p" id={`${id}-error`} textColor="danger600" data-strapi-field-error>
      {error}
    </Typography>
  );
};
