import React from 'react';
import styled from 'styled-components';
import { Grid } from '../Grid';
import { useMainNav } from './useMainNav';
import { MainNavSizes } from './constants';

const MainNavWrapper = styled(Grid)`
  width: ${({ condensed }) => (condensed ? MainNavSizes.S : MainNavSizes.M)};
  background: ${({ theme }) => theme.colors.neutral0};
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 2;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const MainNav = (props) => {
  const { condensed } = useMainNav();
  return <MainNavWrapper as="nav" condensed={condensed} {...props} />;
};
