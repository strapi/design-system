import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { useGrid } from './GridContext';

const GridItemWrapper = styled(Box)`
  flex: ${({ col }) => col};
  flex-basis: ${({ col, theme, gap, gridCols }) =>
    col ? `calc(${(col / gridCols) * 100}% - ${theme.spaces[gap]})` : undefined};
`;

export const GridItem = (props) => {
  const { gap, gridCols } = useGrid();

  return <GridItemWrapper gap={gap} gridCols={gridCols} {...props} />;
};
