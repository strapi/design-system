import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseLink } from '../../BaseLink';

const StyledLink = styled(BaseLink)`
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: ${({ theme }) => theme.lineHeights[4]};
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[2]}`};
  text-decoration: none;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.neutral700};
  }
`;

export const CrumbLink = ({ children, ...props }) => <StyledLink {...props}>{children}</StyledLink>;

CrumbLink.displayName = 'CrumbLink';

const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.href && !props.to && !props.onClick) {
    return new Error(`One of 'href', 'to' or 'onClick' is required by '${componentName}' component.`);
  }
};

CrumbLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: requiredPropsCheck,
  onClick: requiredPropsCheck,
  to: requiredPropsCheck,
};
