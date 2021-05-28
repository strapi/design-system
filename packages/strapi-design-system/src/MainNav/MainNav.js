import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '../Grid';
import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled(Grid)`
  width: ${({ condensed }) => (condensed ? 'max-content' : `${224 / 16}rem`)};
  background: ${({ theme }) => theme.colors.neutral0};
  height: 100%;
  position: relative;
`;

export const MainNav = ({ condensed, ...props }) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper as="nav" rows="auto auto 1fr auto auto" condensed={condensed} {...props} />
    </MainNavContext.Provider>
  );
};

MainNav.defaultProps = {
  condensed: false,
};

MainNav.propTypes = {
  condensed: PropTypes.bool,
};
