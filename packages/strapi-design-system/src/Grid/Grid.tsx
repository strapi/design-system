import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';

export interface GridProps extends BoxProps {
  gridCols?: number;
  gap?: ResponsiveValue;
}

const GridWrapper = styled(Box)<Required<Pick<GridProps, 'gridCols' | 'gap'>>>`
  display: grid;
  grid-template-columns: repeat(${({ gridCols }) => gridCols}, 1fr);
  ${({ theme, gap }) => handleResponsiveValues('gap', gap, theme)}
`;

export const Grid = (props: GridProps) => {
  const { gap = '0', gridCols = 12, ...rest } = props;

  return <GridWrapper gap={gap} gridCols={gridCols} {...rest} />;
};
