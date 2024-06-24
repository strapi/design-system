import { styled } from 'styled-components';

import { PropsToTransientProps } from '../../types';
import { Flex, FlexComponent, FlexProps } from '../Flex';

type CardActionPosition = 'end' | 'start';

type CardActionProps = Omit<FlexProps<'div'>, 'direction' | 'gap' | 'position'> & {
  position: CardActionPosition;
};

const CardActionImpl = ({ position, ...restProps }: CardActionProps) => {
  return <CardAction $position={position} {...restProps} direction="row" gap={2} />;
};

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
