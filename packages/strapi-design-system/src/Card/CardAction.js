import styled from 'styled-components';

import { Stack } from '../Stack';

export const CardAction = styled(Stack).attrs({
  horizontal: true,
  spacing: 2,
})`
  position: absolute;
  top: ${({ theme }) => theme.spaces[3]};
  right: ${({ position, theme }) => (position === 'end' ? theme.spaces[3] : undefined)};
  left: ${({ position, theme }) => (position === 'start' ? theme.spaces[3] : undefined)};
`;
