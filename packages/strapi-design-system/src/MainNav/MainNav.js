import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainNavContext } from './MainNavContext';
import { Flex } from '../Flex';

const MainNavWrapper = styled(Flex)`
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
        width={`${condensed ? 'max-content' : `${224 / 16}rem`}`}
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
