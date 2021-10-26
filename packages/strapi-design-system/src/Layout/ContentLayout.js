import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const ContentLayout = ({ children }) => {
  return (
    <Box paddingLeft={10} paddingRight={10}>
      {children}
    </Box>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
