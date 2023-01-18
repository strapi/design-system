import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Stack } from '../../Stack';
import { Box } from '../../Box';

const BoxGrow = styled(Box)`
  flex-grow: 1;
  overflow-y: scroll;
`;

export const NavSections = ({ children, ...props }) => {
  return (
    <BoxGrow paddingLeft={3} paddingRight={2} paddingTop={3} paddingBottom={8}>
      <Stack as="ul" spacing={4} {...props}>
        {Children.map(children, (child, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{child}</li>;
        })}
      </Stack>
    </BoxGrow>
  );
};

NavSections.propTypes = {
  children: PropTypes.node.isRequired,
};
