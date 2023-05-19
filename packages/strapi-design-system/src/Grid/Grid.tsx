import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import handleResponsiveValues from '../helpers/handleResponsiveValues';

export interface GridProps extends BoxProps {
  gap?: number | Array<number>;
  gridCols?: number;
}

export const Grid = styled(Box)<Pick<GridProps, 'gap' | 'gridCols'>>`
  display: grid;
  grid-template-columns: repeat(${({ gridCols = 12 }) => gridCols}, 1fr);
  ${({ theme, gap = 0 }) => handleResponsiveValues('gap', gap, theme)}
`;
