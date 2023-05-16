import React from 'react';

import { Box, BoxProps } from '../Box';

export type BaseLinkProps = BoxProps<'a'> & {
  disabled?: boolean;
  isExternal?: boolean;
};

export const BaseLink = React.forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ href, rel = 'noreferrer noopener', target = '_self', disabled = false, isExternal = false, ...props }, ref) => {
    return (
      <Box
        as="a"
        ref={ref}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? rel : undefined}
        href={disabled ? '#' : href}
        aria-disabled={disabled}
        cursor="pointer"
        {...props}
      />
    );
  },
);

BaseLink.displayName = 'BaseLink';
