import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { IconButton } from '../../IconButton';
import { SimpleMenu } from '../SimpleMenu';

import CarretDown from '@strapi/icons/CarretDown';

const IconButtonCustom = styled(IconButton)`
  height: ${({ theme }) => theme.spaces[3]};
`;

export const CrumbSimpleMenu = ({ children, ...props }) => (
  <SimpleMenu noBorder as={IconButtonCustom} icon={<CarretDown />} {...props}>
    {children}
  </SimpleMenu>
);

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';

CrumbSimpleMenu.propTypes = {
  children: PropTypes.shape({ type: PropTypes.oneOf([SimpleMenu]) }),
};
