import React from 'react';
import { Stack } from '../Stack';
import { Box } from '../Box';

export const NavSections = (props) => {
  return (
    <Box paddingLeft={3} paddingRight={3}>
      <Stack as="ul" size={4} {...props}></Stack>
    </Box>
  );
};
