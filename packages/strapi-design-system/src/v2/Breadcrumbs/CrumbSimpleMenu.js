import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CarretDown from '@strapi/icons/CarretDown';
import { Button } from '../../Button';
import { SimpleMenu } from '../SimpleMenu';

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[3]}`};

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;

export const CrumbSimpleMenu = ({ children, ...props }) => (
  <SimpleMenu noBorder icon={<CarretDown />} as={StyledButton} size="S" {...props}>
    {children}
  </SimpleMenu>
);

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';

CrumbSimpleMenu.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
