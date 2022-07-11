import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '../../Typography';

export const Crumb = ({ children, ...props }) => (
  <Typography variant="pi" textColor="neutral800" fontWeight="bold" {...props}>
    {children}
  </Typography>
);

Crumb.displayName = 'Crumb';

Crumb.propTypes = {
  children: PropTypes.string.isRequired,
};
