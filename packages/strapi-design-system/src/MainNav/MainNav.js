import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled(Flex)`
  width: ${({ condensed }) => (condensed ? 'max-content' : `${224 / 16}rem`)};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const MainNav = ({ condensed, ...props }) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper
        alignItems="normal"
        as="nav"
        background="neutral0"
        condensed={condensed}
        direction="column"
        height="100vh"
        position="sticky"
        top={0}
        zIndex={2}
        {...props}
      />
    </MainNavContext.Provider>
  );
};

MainNav.defaultProps = {
  condensed: false,
};

MainNav.propTypes = {
  condensed: PropTypes.bool,
};
