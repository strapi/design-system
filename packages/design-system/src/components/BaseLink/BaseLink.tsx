import * as React from 'react';

import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxProps } from '../Box';

type BaseLinkProps<C extends React.ElementType = 'a'> = BoxProps<C> & {
  disabled?: boolean;
  isExternal?: boolean;
};

const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ href, rel = 'noreferrer noopener', target = '_self', disabled = false, isExternal = false, ...props }, ref) => {
    return (
      <Box
        tag="a"
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

type BaseLinkComponent<C extends React.ElementType = 'a'> = (props: BaseLinkProps<C>) => React.ReactNode;

export { BaseLink };
export type { BaseLinkProps, BaseLinkComponent };
