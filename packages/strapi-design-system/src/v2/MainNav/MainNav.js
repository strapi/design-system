import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../../Flex';
import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled(Flex)`
  width: ${({ condensed }) => (condensed ? 'max-content' : `${224 / 16}rem`)};
  background: ${({ theme }) => theme.colors.neutral0};
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 2;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const MainNav = ({ condensed, ...props }) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper as="nav" alignItems="normal" direction="column" condensed={condensed} {...props} />
    </MainNavContext.Provider>
  );
};

MainNav.defaultProps = {
  condensed: false,
};

MainNav.propTypes = {
  condensed: PropTypes.bool,
};
