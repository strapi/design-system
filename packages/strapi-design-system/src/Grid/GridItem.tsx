import styled from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../Box';

export interface GridItemProps extends BoxProps {
  col?: number;
  s?: number;
  xs?: number;
}

export const GridItem = styled<BoxComponent>(Box)<GridItemProps>`
  grid-column: span ${({ col }) => col ?? 1};
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-column: span ${({ s }) => s};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-column: span ${({ xs }) => xs};
  }
`;
