import styled from 'styled-components';

import { Box } from '../Box';

export interface SkipToContentProps {
  children?: React.ReactNode;
}

const AnchorBox = styled(Box)`
  text-decoration: none;

  &:focus {
    left: ${({ theme }) => theme.spaces[3]};
    top: ${({ theme }) => theme.spaces[3]};
  }
`;

export const SkipToContent = ({ children }: SkipToContentProps) => {
  return (
    <AnchorBox
      as="a"
      href="#main-content"
      background="primary600"
      color="neutral0"
      left="-100%"
      padding={3}
      position="absolute"
      top="-100%"
      hasRadius
      zIndex={9999}
    >
      {children}
    </AnchorBox>
  );
};
