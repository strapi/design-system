import React, { Children } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';

const BoxGrow = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`;

export const NavSections = ({ children, spacing = 4, horizontal = false, ...props }) => {
  return (
    <BoxGrow paddingLeft={3} paddingRight={2} paddingTop={3} paddingBottom={8}>
      <Flex
        as="ul"
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
    </BoxGrow>
  );
};

NavSections.propTypes = {
  children: PropTypes.node.isRequired,
};
