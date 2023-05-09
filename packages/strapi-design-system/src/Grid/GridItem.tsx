import React from 'react';

import styled from 'styled-components';

import { useGrid } from './GridContext';
import { Box, BoxProps } from '../Box';

export interface GridItemProps extends BoxProps<HTMLDivElement> {
  col: number;
  s: number;
  xs: number;
  gap: number | number[];
  gridCols: number;
}

const GridItemWrapper = styled.div<GridItemProps>`
  grid-column: span ${({ col }) => col};
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-column: span ${({ s }) => s};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-column: span ${({ xs }) => xs};
  }
`;

export const GridItem: React.FC<GridItemProps> = ({ col, xs, s, ...props }) => {
  const { gap, gridCols } = useGrid();

  return (
    <GridItemWrapper gap={gap} gridCols={gridCols} col={col} xs={xs} s={s}>
      <Box {...props} />
    </GridItemWrapper>
  );
};
