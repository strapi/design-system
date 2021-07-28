import React from 'react';
import { Row } from '../Row';
import { Box } from '../Box';

export const CardBody = (props) => {
  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={2} paddingBottom={2}>
      <Row {...props} />
    </Box>
  );
};
