import React from 'react';

import { Box } from '../../Box';
import { Typography, TypographyProps } from '../../Typography';

export interface CrumbProps extends TypographyProps {
  isCurrent?: boolean;
}

export const Crumb = ({ children, isCurrent = false, ...props }: CrumbProps) => (
  <Box paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
    <Typography
      variant="pi"
      textColor="neutral800"
      fontWeight={isCurrent ? 'bold' : 'normal'}
      aria-current={isCurrent}
      {...props}
    >
      {children}
    </Typography>
  </Box>
);

Crumb.displayName = 'Crumb';
