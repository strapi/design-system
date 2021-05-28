import styled from 'styled-components';
import { Box } from '../Box';

export const DropdownIconWrapper = styled(Box)`
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ expanded }) => (expanded ? `rotate(180deg)` : undefined)};

  svg {
    height: ${6 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ expanded, theme }) => (expanded ? theme.colors.primary600 : theme.colors.neutral600)};
  }
`;
