import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { useMainNav } from '../MainNav/useMainNav';
import { MainNavSizes } from '../MainNav/constants';
import { SubNavSize } from '../SubNav/constants';

const handleLeftMargin = ({ hasMainNavCondensed, hasSideNav }) => {
  const mainNavSize = hasMainNavCondensed ? MainNavSizes.S : MainNavSizes.M;

  if (hasSideNav) {
    return `calc(${mainNavSize} + ${SubNavSize})`;
  }

  return mainNavSize;
};

const GridContainer = styled(Box)`
  display: grid;
  margin-left: ${handleLeftMargin};
`;

const OverflowingItem = styled(Box)`
  overflow-x: hidden;
`;

export const Layout = ({ sideNav, children }) => {
  const { condensed } = useMainNav();

  return (
    <GridContainer hasSideNav={Boolean(sideNav)} hasMainNavCondensed={condensed}>
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
