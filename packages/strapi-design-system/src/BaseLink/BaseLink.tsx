import React from 'react';

import styled from 'styled-components';

const A = styled.a`
  cursor: pointer;
`;

export interface BaseLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
