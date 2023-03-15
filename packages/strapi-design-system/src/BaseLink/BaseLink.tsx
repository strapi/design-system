import React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';

const A = styled(Box)`
  cursor: pointer;
`;

export interface BaseLinkProps extends BoxProps<HTMLAnchorElement> {
  disabled?: boolean;
  href?: string;
  isExternal?: boolean;
  rel?: string;
  target?: string;
}

export const BaseLink = React.forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ href, rel = 'noreferrer noopener', target = '_self', disabled = false, isExternal = false, ...props }, ref) => {
    return (
      <A
        as="a"
        ref={ref}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? rel : undefined}
        href={disabled ? '#' : href}
        aria-disabled={disabled}
        {...props}
      />
    );
  },
);

BaseLink.displayName = 'BaseLink';
