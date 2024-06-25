import * as React from 'react';

import { styled } from 'styled-components';

import { SimpleMenu, type SimpleMenuProps } from '../SimpleMenu';

const StyledButton = styled(SimpleMenu)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[2]}`};
  height: unset;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;

export interface CrumbSimpleMenuProps extends SimpleMenuProps {
  'aria-label': string;
  icon?: React.ReactElement;
  endIcon?: React.ReactNode;
}

export const CrumbSimpleMenu = React.forwardRef<HTMLButtonElement, CrumbSimpleMenuProps>(
  ({ children, ...props }, forwardedRef) => (
    <StyledButton ref={forwardedRef} endIcon={null} size="S" {...props}>
      {children}
    </StyledButton>
  ),
);

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';
