import React from 'react';

import { Box } from '../Box';

export interface NavFooterProps {
  children: React.ReactNode;
}

export const NavFooter = ({ children }: NavFooterProps) => {
  return <Box position="relative">{children}</Box>;
};
