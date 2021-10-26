import React from 'react';
import { Stack } from '../Stack';
import { Box } from '../Box';

export const SubNavSections = (props) => {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      <Stack as="ul" size={2} {...props}></Stack>
    </Box>
  );
};
