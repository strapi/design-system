import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { inputFocusStyle } from '../themes/utils';

export const MainRow = styled(Flex)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
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

export const ValueContainer = styled.div`
  padding: 1px 2px;
  grid-area: 1 / 1 / 2 / 3;
`;

export const InputContainer = styled(Flex)`
  display: grid;
  flex: 1 1 0%;
  position: relative;
`;

export const Input = styled.input`
  display: inline-grid;
  grid-area: 1 / 1 / 2 / 3;
  grid-template-columns: 0px min-content;
  background: transparent;
  min-height: ${40 / 16}rem;
  border: none;
  flex: 1;
  font-size: ${14 / 16}rem;
  color: ${({ theme }) => theme.colors.neutral800};
  outline: none;
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
