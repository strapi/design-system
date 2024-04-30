import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../Box';
import { PropsToTransientProps } from '../types';

interface GridItemProps extends BoxProps {
  col?: number;
  s?: number;
  xs?: number;
}

const GridItemImpl = ({ col, s, xs, ...props }: GridItemProps) => <GridItem $col={col} $s={s} $xs={xs} {...props} />;

const GridItem = styled<BoxComponent>(Box)<PropsToTransientProps<GridItemProps>>`
  grid-column: span ${({ $col }) => $col ?? 1};
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-column: span ${({ $s }) => $s};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-column: span ${({ $xs }) => $xs};
  }
`;

export { GridItemImpl as GridItem };
