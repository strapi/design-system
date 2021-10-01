import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';
import { getThemeSize } from '../themes/utils';

export const SelectButtonWrapper = styled(Row)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  min-height: ${getThemeSize('input')};

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  `
      : undefined}

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
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
