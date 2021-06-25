import styled from 'styled-components';
import { Box } from '../Box';

export const SelectButtonWrapper = styled.div`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  `
      : undefined}

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }
`;

export const IconBox = styled(Box)`
  background: transparent;
  border: none;
  position: relative;
  z-index: 1;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

export const CaretBox = styled(IconBox)`
  display: flex;
  background: none;
  border: none;

  svg {
    width: ${6 / 16}rem;
  }
`;
