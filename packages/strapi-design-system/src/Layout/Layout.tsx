import styled from 'styled-components';

import { Box } from '../Box';

interface LayoutProps {
  children: React.ReactNode;
  sideNav?: React.ReactNode;
}

const GridContainer = styled(Box)<{ hasSideNav: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasSideNav }) => (hasSideNav ? `auto 1fr` : '1fr')};
`;

const OverflowingItem = styled(Box)`
  overflow-x: hidden;
`;

export const Layout = ({ sideNav, children }: LayoutProps) => {
  return (
    <GridContainer hasSideNav={Boolean(sideNav)}>
      {sideNav}
      <OverflowingItem paddingBottom={10}>{children}</OverflowingItem>
    </GridContainer>
  );
};
