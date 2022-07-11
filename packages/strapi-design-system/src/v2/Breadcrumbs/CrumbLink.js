import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseLink } from '../../BaseLink';

const StyledLink = styled(BaseLink)`
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: ${({ theme }) => theme.lineHeights[3]};
  padding: ${({ theme }) => theme.spaces[1]};
  text-decoration: none;

  :hover,
  :focus {
    color: ${({ theme }) => theme.colors.neutral700};
  }
`;

export const CrumbLink = ({ children, ...props }) => <StyledLink {...props}>{children}</StyledLink>;

CrumbLink.displayName = 'CrumbLink';

CrumbLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
