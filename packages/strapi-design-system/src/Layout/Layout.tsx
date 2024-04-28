import styled from 'styled-components';

import { Box, BoxComponent } from '../Box';

interface LayoutProps {
  children: React.ReactNode;
  sideNav?: React.ReactNode;
}

export const Layout = ({ sideNav, children }: LayoutProps) => {
  return (
    <GridContainer $hasSideNav={Boolean(sideNav)}>
      {sideNav}
      <OverflowingItem paddingBottom={10}>{children}</OverflowingItem>
    </GridContainer>
  );
};

const GridContainer = styled<BoxComponent>(Box)<{ $hasSideNav: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasSideNav }) => ($hasSideNav ? `auto 1fr` : '1fr')};
`;

const OverflowingItem = styled<BoxComponent>(Box)`
  overflow-x: hidden;
`;
