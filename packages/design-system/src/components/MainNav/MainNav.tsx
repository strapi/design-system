import * as React from 'react';

import { styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../Flex';

import { MainNavContext } from './MainNavContext';

const MainNavWrapper = styled<FlexComponent<'nav'>>(Flex)<{ $condensed: boolean }>`
  width: ${({ $condensed }) => ($condensed ? 'max-content' : `22.4rem`)};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export interface MainNavProps extends FlexProps<'nav'> {
  condensed?: boolean;
}

export const MainNav = ({ condensed = false, ...props }: MainNavProps) => {
  return (
    <MainNavContext.Provider value={condensed}>
      <MainNavWrapper
        alignItems="normal"
        tag="nav"
        background="neutral0"
        $condensed={condensed}
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
