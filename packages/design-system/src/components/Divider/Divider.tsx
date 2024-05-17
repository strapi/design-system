import * as React from 'react';

import { styled } from 'styled-components';

import { PropsToTransientProps } from '../../types';
import { Box, BoxComponent, BoxProps } from '../Box';

type DividerElement = HTMLDivElement;

interface DividerProps extends Omit<BoxProps<'div'>, 'tag'> {}

const Divider = React.forwardRef<DividerElement, DividerProps>((props, forwardedRef) => {
  return (
    <DividerImpl
      ref={forwardedRef}
      background="neutral150"
      {...props}
      data-orientation="horizontal"
      role="separator"
      tag="div"
    />
  );
});

const DividerImpl = styled<BoxComponent<'div'>>(Box)<PropsToTransientProps<DividerProps>>`
  height: 1px;
  border: none;
  /* If contained in a Flex parent we want to prevent the Divider to shink */
  flex-shrink: 0;
`;

export { Divider };
export type { DividerElement, DividerProps };
