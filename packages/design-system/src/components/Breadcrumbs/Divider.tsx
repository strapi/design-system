import * as React from 'react';

import { Box } from '../../primitives/Box';
import { Typography } from '../../primitives/Typography';

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
