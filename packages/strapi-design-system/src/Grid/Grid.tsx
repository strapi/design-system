import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../Box';
import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';
import { PropsToTransientProps } from '../types';

export interface GridProps extends BoxProps {
  gridCols?: number;
  gap?: ResponsiveValue;
}

const GridWrapper = styled<BoxComponent>(Box)<PropsToTransientProps<Required<Pick<GridProps, 'gridCols' | 'gap'>>>>`
  display: grid;
  grid-template-columns: repeat(${({ $gridCols }) => $gridCols}, 1fr);
  ${({ theme, $gap }) => handleResponsiveValues('gap', $gap, theme)}
`;

export const Grid = (props: GridProps) => {
  const { gap = '0', gridCols = 12, ...rest } = props;

  return <GridWrapper gap={gap} gridCols={gridCols} {...rest} />;
};
