import React from 'react';

import styled from 'styled-components';

import { BaseLink, BaseLinkProps } from '../../BaseLink';

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

export const CrumbLink = ({ children, ...props }: BaseLinkProps) => <StyledLink {...props}>{children}</StyledLink>;

CrumbLink.displayName = 'CrumbLink';
