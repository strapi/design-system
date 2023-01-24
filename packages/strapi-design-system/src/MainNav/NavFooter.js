import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const NavFooter = ({ children }) => {
  return <Box position="relative">{children}</Box>;
};

NavFooter.displayName = 'NavFooter';

NavFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
