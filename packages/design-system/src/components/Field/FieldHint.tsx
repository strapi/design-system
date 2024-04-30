import { Typography } from '../Typography';

import { useField } from './FieldContext';

export const FieldHint = () => {
  const { id, hint, error } = useField();

  if (!hint || error) {
    return null;
  }

  return (
    <Typography variant="pi" tag="p" id={`${id}-hint`} textColor="neutral600">
      {hint}
    </Typography>
  );
};
