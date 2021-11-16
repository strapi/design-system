import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '../Grid';
import { MainNavSizes } from '../MainNav/constants';
import { useMainNav } from '../MainNav/useMainNav';
import { SubNavSize } from './constants';

const SubNavWrapper = styled(Grid)`
  width: ${SubNavSize};
  background: ${({ theme }) => theme.colors.neutral100};
  position: fixed;
  top: 0;
  left: ${({ condensed }) => (condensed ? MainNavSizes.S : MainNavSizes.M)};
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  z-index: 1;
`;

export const SubNav = ({ ariaLabel, ...props }) => {
  const { condensed } = useMainNav();
  return <SubNavWrapper aria-label={ariaLabel} as="nav" condensed={condensed} {...props} />;
};

SubNav.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
};
