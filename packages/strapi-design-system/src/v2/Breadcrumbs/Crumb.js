import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '../../Typography';

export const Crumb = ({ children, isCurrent, ...props }) => (
  <Typography
    variant="pi"
    textColor="neutral800"
    fontWeight={isCurrent ? 'bold' : 'normal'}
    aria-current={isCurrent}
    {...props}
  >
    {children}
  </Typography>
);

Crumb.displayName = 'Crumb';

Crumb.defaultProps = {
  isCurrent: false,
};

Crumb.propTypes = {
  children: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool,
};
