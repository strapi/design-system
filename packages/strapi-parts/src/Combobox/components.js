import { Box } from '../Box';
import { Row } from '../Row';
import styled from 'styled-components';

export const MainRow = styled(Row)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

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

export const Input = styled.input`
  min-height: ${40 / 16}rem;
  border: none;
  flex: 1;
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
