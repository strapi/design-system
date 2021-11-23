import styled from 'styled-components';
import { InputWrapper } from '../Field/FieldInput';
import { Popover } from '../Popover';
import { Box } from '../Box';

export const DatePickerPopover = styled(Popover)`
  max-height: ${3 * 6}rem;
  overflow: hidden;
`;

export const DatePickerButton = styled.button`
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : undefined)};

  & svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const DatePickerWrapper = styled.div`
  ${({ bold, theme }) =>
    bold
      ? `& ${InputWrapper} {
  border: 1px solid ${theme.colors.primary600};
}`
      : undefined}
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
