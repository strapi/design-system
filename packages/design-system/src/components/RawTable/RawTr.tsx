import * as React from 'react';

import { Box, BoxProps } from '../Box';

import { RawTdProps } from './RawCell';

export interface RawTrProps extends BoxProps<'tr'> {
  'aria-rowindex'?: number;
}

export const RawTr = ({ children, ...props }: RawTrProps) => {
  const childrenClone = React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<RawTdProps>, {
        'aria-colindex': index + 1,
        coords: { col: index + 1, row: props['aria-rowindex'] ?? 0 },
      });
    }

    return child;
  });

  return (
    <Box tag="tr" {...props}>
      {childrenClone}
    </Box>
  );
};
