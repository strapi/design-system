import * as React from 'react';

import { Box, BoxProps } from '../Box';
import { Typography } from '../Typography';

export interface CardTimerProps extends BoxProps {
  children: React.ReactNode;
}

export const CardTimer = ({ children, ...props }: CardTimerProps) => (
  <Box
    as="time"
    background="neutral800"
    bottom={1}
    right={1}
    color="neutral0"
    hasRadius
    position="absolute"
    padding={1}
    {...props}
  >
    <Typography variant="pi" textColor="neutral0">
      {children}
    </Typography>
  </Box>
);
