import * as React from 'react';

import { styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { PropsToTransientProps } from '../../types';

type CardActionPosition = 'end' | 'start';

type CardActionProps = Omit<FlexProps<'div'>, 'direction' | 'gap' | 'position'> & {
  position: CardActionPosition;
};

const CardActionImpl = React.forwardRef<HTMLDivElement, CardActionProps>(({ position, ...restProps }, forwardedRef) => {
  return <CardAction ref={forwardedRef} $position={position} {...restProps} direction="row" gap={2} />;
});

const CardAction = styled<FlexComponent>(Flex)<PropsToTransientProps<CardActionProps>>`
  position: absolute;
  top: ${({ theme }) => theme.spaces[3]};
  right: ${({ $position, theme }) => {
    if ($position === 'end') {
      return theme.spaces[3];
    }

    return undefined;
  }};
  left: ${({ $position, theme }) => {
    if ($position === 'start') {
      return theme.spaces[3];
    }

    return undefined;
  }};
`;

export { CardActionImpl as CardAction };
export type { CardActionProps, CardActionPosition };
