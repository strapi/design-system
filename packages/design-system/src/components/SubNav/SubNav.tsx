import * as React from 'react';

import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../../primitives/Box';

const SUBNAV_WIDTH = `23.2rem`;

interface SubNavProps extends Omit<BoxProps<'nav'>, 'tag'> {}

const SubNav = React.forwardRef<HTMLDivElement, SubNavProps>(({ ...props }, ref) => {
  return <SubNavWrapper ref={ref} {...props} tag="nav" />;
});

const SubNavWrapper = styled<BoxComponent<'nav'>>(Box)`
  width: ${SUBNAV_WIDTH};
  background: ${({ theme }) => theme.colors.neutral100};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  z-index: 1;
`;

export { SubNav };
export type { SubNavProps };
