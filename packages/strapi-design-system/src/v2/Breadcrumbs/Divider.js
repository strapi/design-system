import React from 'react';

import { Box } from '../../Box';
import { Typography } from '../../Typography';

export const Divider = () => {
  return (
    <Box aria-hidden paddingLeft={1} paddingRight={1}>
      <Typography variant="pi" textColor="neutral500">
        /
      </Typography>
    </Box>
  );
};

Divider.displayName = 'Divider';
