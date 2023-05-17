import React from 'react';

import styled from 'styled-components';

import { Grid } from '../../Grid';

export const subNavWidth = `${232 / 16}rem`;

const SubNavWrapper = styled(Grid)`
  width: ${subNavWidth};
  background: ${({ theme }) => theme.colors.neutral100};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  z-index: 1;
`;

// todo: extend GridProps
export interface SubNavProps {
  ariaLabel: string;
}

export const SubNav = ({ ariaLabel, ...props }: SubNavProps) => {
  return <SubNavWrapper aria-label={ariaLabel} as="nav" {...props} />;
};
