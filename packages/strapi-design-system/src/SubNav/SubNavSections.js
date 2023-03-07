import React, { Children } from 'react';

import PropTypes from 'prop-types';

import { Box } from '../Box';
import { Flex } from '../Flex';

export const SubNavSections = ({ children, spacing = 2, horizontal = false, ...props }) => {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      <Flex
        as="ol"
        gap={spacing}
        direction={horizontal ? 'row' : 'column'}
        alignItems={horizontal ? 'center' : 'stretch'}
        {...props}
      >
        {Children.map(children, (child, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{child}</li>;
        })}
      </Flex>
    </Box>
  );
};

SubNavSections.propTypes = {
  children: PropTypes.node.isRequired,
};
