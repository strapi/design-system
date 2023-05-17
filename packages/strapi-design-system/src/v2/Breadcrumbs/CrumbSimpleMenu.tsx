import React from 'react';

import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Button, ButtonProps } from '../../Button';
import { SimpleMenu } from '../SimpleMenu';

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[3]}`};

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;

export interface CrumbSimpleMenuProps extends ButtonProps {
  'aria-label': string;
}

export const CrumbSimpleMenu = ({ children, ...props }: CrumbSimpleMenuProps) => (
  <SimpleMenu noBorder icon={<CarretDown />} as={StyledButton} size="S" {...props}>
    {children}
  </SimpleMenu>
);

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';
