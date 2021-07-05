import styled from 'styled-components';

export const CardAction = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spaces[3]};
  right: ${({ position, theme }) => (position === 'end' ? theme.spaces[3] : undefined)};
  left: ${({ position, theme }) => (position === 'start' ? theme.spaces[3] : undefined)};
`;
