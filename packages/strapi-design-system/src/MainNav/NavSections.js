import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '../Stack';
import { Box } from '../Box';

export const NavSections = ({ children, ...props }) => {
  return (
    <Box paddingLeft={3} paddingRight={2} paddingTop={3}>
      <Stack as="ul" spacing={4} {...props}>
        {Children.map(children, (child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </Stack>
    </Box>
  );
};

NavSections.propTypes = {
  children: PropTypes.node.isRequired,
};
