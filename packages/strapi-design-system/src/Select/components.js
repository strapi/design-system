import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { inputFocusStyle } from '../themes/utils';

export const SelectButtonWrapper = styled(Flex)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[1]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  min-height: ${({ theme, size }) => theme.sizes.input[size]};

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  `
      : undefined}

  ${inputFocusStyle()}
`;

export const IconBox = styled(Box)`
  --input-height: ${({ theme, inputSize = 'M' }) => theme.sizes.input[inputSize]};
  --icon-box-size: calc(var(--input-height) / 2);

  z-index: 1;
  position: relative;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  height: var(--icon-box-size);
  width: var(--icon-box-size);

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;

export const CaretBox = styled(IconBox)`
  svg {
    width: ${6 / 16}rem;
  }
`;
