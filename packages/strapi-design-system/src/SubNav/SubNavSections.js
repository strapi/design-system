import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '../Stack';
import { Box } from '../Box';

export const SubNavSections = ({ children, ...props }) => {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      <Stack as="ul" spacing={2} {...props}>
        {Children.map(children, (child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </Stack>
    </Box>
  );
};

SubNavSections.propTypes = {
  children: PropTypes.node.isRequired,
};
