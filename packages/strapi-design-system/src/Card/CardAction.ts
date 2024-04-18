import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';

export type CardActionPosition = 'end' | 'start';

export const CardAction = styled(Flex).attrs({
  direction: 'row',
  gap: 2,
})<{ position: FlexProps['position'] | CardActionPosition }>`
  position: absolute;
  top: ${({ theme }) => theme.spaces[3]};
  right: ${({ position, theme }) => {
    if (position === 'end') {
      return theme.spaces[3];
    }

    return undefined;
  }};
  left: ${({ position, theme }) => {
    if (position === 'start') {
      return theme.spaces[3];
    }

    return undefined;
  }};
`;
