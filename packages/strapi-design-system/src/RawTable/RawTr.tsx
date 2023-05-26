import { cloneElement, Children, isValidElement, ReactElement } from 'react';

import { Box, BoxProps } from '../Box';

export interface RawTrProps extends BoxProps<'tr'> {
  'aria-rowindex'?: number;
}

export const RawTr = ({ children, ...props }: RawTrProps) => {
  const childrenClone = Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        'aria-colindex': index + 1,
        coords: { col: index + 1, row: props['aria-rowindex'] },
      });
    }

    return child;
  });

  return (
    <Box as="tr" {...props}>
      {childrenClone}
    </Box>
  );
};
