import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { inputFocusStyle } from '../themes/utils';

export const MainRow = styled(Flex)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-left: ${({ theme }) => theme.spaces[3]};
  padding-right: ${({ theme }) => theme.spaces[1]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${({ theme, $disabled }) =>
    $disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  `
      : undefined}

  ${inputFocusStyle()}
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  display: block;
  padding: 0;
  width: 100%;
  min-width: auto;
  min-height: ${({ theme, size = 'M' }) => theme.sizes.input[size]};
  font-size: ${14 / 16}rem;
  color: ${({ theme }) => theme.colors.neutral800};

  &:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  &[aria-disabled='true'] {
    background: inherit;
    color: inherit;
    cursor: not-allowed;
  }
`;

export const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  ${({ isSelected, theme }) => isSelected && `background: ${theme.colors.primary100};`}

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;
