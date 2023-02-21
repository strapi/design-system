import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';

const BreakBox = styled(Box)`
  word-break: break-all;
`;

export interface CardContentProps extends BoxProps {
  children: React.ReactNode;
}

export const CardContent = ({ children, ...props }: CardContentProps) => {
  return <BreakBox {...props}>{children}</BreakBox>;
};
