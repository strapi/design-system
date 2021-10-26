import React from 'react';
import { Flex } from '../Flex';
import { Box } from '../Box';

export const CardBody = (props) => {
  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={2} paddingBottom={2}>
      <Flex {...props} alignItems="flex-start" />
    </Box>
  );
};
