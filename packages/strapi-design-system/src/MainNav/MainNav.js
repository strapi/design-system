import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled(Flex)`
  width: ${({ condensed }) => (condensed ? 'max-content' : `${224 / 16}rem`)};
  background: ${({ theme }) => theme.colors.neutral0};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  /* That doesn't work, overflow-y auto still hides the condensed toggle button when on condensed state */
  overflow-x: visible;
  z-index: 2;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const MainNav = ({ condensed, ...props }) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper alignItems="normal" direction="column" as="nav" condensed={condensed} {...props} />
    </MainNavContext.Provider>
  );
};

MainNav.defaultProps = {
  condensed: false,
};

MainNav.propTypes = {
  condensed: PropTypes.bool,
};
