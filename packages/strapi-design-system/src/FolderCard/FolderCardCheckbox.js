import React from 'react';
import { Box } from '../Box';
import { BaseCheckbox } from '../BaseCheckbox';
import { useFolderCard } from './FolderCardContext';

export const FolderCardCheckbox = (props) => {
  const { id } = useFolderCard();

  return (
    <Box position="relative" zIndex={2}>
      <BaseCheckbox aria-labelledby={`${id}-title`} {...props} />
    </Box>
  );
};
