import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../Box';
import { Typography } from '../../Typography';

export const Crumb = ({ children, isCurrent, ...props }) => (
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

Crumb.defaultProps = {
  isCurrent: false,
};

Crumb.propTypes = {
  children: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool,
};
