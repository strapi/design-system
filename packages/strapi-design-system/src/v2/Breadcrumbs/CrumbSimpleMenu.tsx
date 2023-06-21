import React from 'react';

import styled from 'styled-components';

import { Button, ButtonProps } from '../../Button';
import { SimpleMenu } from '../SimpleMenu';

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[2]}`};
  height: unset;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;

export interface CrumbSimpleMenuProps extends ButtonProps {
  'aria-label': string;
  icon?: React.ReactElement;
  endIcon?: React.ReactNode;
}

export const CrumbSimpleMenu = ({ children, ...props }: CrumbSimpleMenuProps) => (
  <SimpleMenu endIcon={null} as={StyledButton} size="S" {...props}>
    {children}
  </SimpleMenu>
);

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';
