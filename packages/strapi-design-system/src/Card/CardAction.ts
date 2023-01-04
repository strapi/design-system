import styled from 'styled-components';

import { Stack, StackProps } from '../Stack';

export type CardActionPosition = 'end' | 'start';

export const CardAction = styled(Stack).attrs({
  horizontal: true,
  spacing: 2,
})<{ position: StackProps['position'] | CardActionPosition }>`
  position: absolute;
  top: ${({ theme }) => theme.spaces[3]};
  right: ${({ position, theme }) => {
    // @ts-expect-error styled-components can't overwrite the position prop from Stack
    if (position === 'end') {
      return theme.spaces[3];
    }

    return undefined;
  }};
  left: ${({ position, theme }) => {
    // @ts-expect-error styled-components can't overwrite the position prop from Stack
    if (position === 'start') {
      return theme.spaces[3];
    }

    return undefined;
  }};
`;
