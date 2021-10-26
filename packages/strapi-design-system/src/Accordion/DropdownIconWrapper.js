import styled from 'styled-components';
import { Box } from '../Box';

export const DropdownIconWrapper = styled(Box)`
  height: ${({ size }) => (size === 'M' ? `${32 / 16}rem` : `${24 / 16}rem}`)};
  width: ${({ size }) => (size === 'M' ? `${32 / 16}rem` : `${24 / 16}rem}`)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ expanded }) => (expanded ? `rotate(180deg)` : undefined)};

  svg {
    width: ${({ size }) => (size === 'M' ? `${11 / 16}rem` : `${8 / 16}rem}`)};
  }

  svg path {
    fill: ${({ expanded, theme }) => (expanded ? theme.colors.primary600 : theme.colors.neutral600)};
  }
`;
