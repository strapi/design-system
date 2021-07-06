import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled.nav`
  width: ${({ condensed }) => (condensed ? 'max-content' : `${224 / 16}rem`)};
  background: ${({ theme }) => theme.colors.neutral0};
  height: 100%;
  position: relative;
`;

export const MainNav = ({ condensed, ...props }) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper condensed={condensed} {...props} />
    </MainNavContext.Provider>
  );
};

MainNav.defaultProps = {
  condensed: false,
};

MainNav.propTypes = {
  condensed: PropTypes.bool,
};
