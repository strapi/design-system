import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: ${({ hasSideNav }) => (hasSideNav ? `auto 1fr` : '1fr')};
`;

const OverflowingItem = styled(Box)`
  overflow-x: hidden;
`;

export const Layout = ({ sideNav, children }) => {
  return (
    <GridContainer hasSideNav={Boolean(sideNav)}>
      {sideNav}
      <OverflowingItem paddingBottom={10}>{children}</OverflowingItem>
    </GridContainer>
  );
};

Layout.defaultProps = {
  sideNav: undefined,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sideNav: PropTypes.node,
};
