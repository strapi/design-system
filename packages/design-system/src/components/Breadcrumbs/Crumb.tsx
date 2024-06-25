import * as React from 'react';

import { Box } from '../../primitives/Box';
import { Typography, TypographyProps } from '../../primitives/Typography';

export interface CrumbProps extends TypographyProps {
  isCurrent?: boolean;
}

export const Crumb = React.forwardRef<HTMLDivElement, CrumbProps>(
  ({ children, isCurrent = false, ...props }, forwardedRef) => (
    <Box paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1} ref={forwardedRef}>
      <Typography
        variant="pi"
        textColor="neutral800"
        fontWeight={isCurrent ? 'bold' : 'regular'}
        aria-current={isCurrent}
        {...props}
      >
        {children}
      </Typography>
    </Box>
  ),
);

Crumb.displayName = 'Crumb';
