import * as React from 'react';

import { styled } from 'styled-components';

import { handleResponsiveValues, ResponsiveValue } from '../../helpers/handleResponsiveValues';
import { PropsToTransientProps } from '../../types';
import { Box, BoxComponent, BoxProps } from '../Box';

type GridProps<C extends React.ElementType = 'div'> = BoxProps<C> & {
  gridCols?: number;
  gap?: ResponsiveValue;
};

const Grid = <C extends React.ElementType = 'div'>(props: GridProps<C>) => {
  const { gap = 0, gridCols = 12, ...rest } = props;

  return <GridWrapper $gap={gap} $gridCols={gridCols} {...rest} />;
};

type GridComponent<C extends React.ElementType = 'div'> = typeof Grid<C>;

const GridWrapper = styled<BoxComponent>(Box)<PropsToTransientProps<Required<Pick<GridProps, 'gridCols' | 'gap'>>>>`
  display: grid;
  grid-template-columns: repeat(${({ $gridCols }) => $gridCols}, 1fr);
  ${({ theme, $gap }) => handleResponsiveValues('gap', $gap, theme)}
`;

export { Grid };
export type { GridProps, GridComponent };
