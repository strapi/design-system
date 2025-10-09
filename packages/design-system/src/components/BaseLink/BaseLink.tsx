import * as React from 'react';

import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { forwardRef } from '../../utilities/forwardRef';

type BaseLinkProps<C extends React.ElementType = 'a'> = BoxProps<C> & {
  disabled?: boolean;
  isExternal?: boolean;
};

const BaseLinkComp = styled<BoxComponent<'a'>>(Box)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ href, disabled = false, isExternal = false, ...props }, ref) => {
    return (
      <BaseLinkComp
        tag="a"
        ref={ref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        href={href}
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled}
        pointerEvents={disabled ? 'none' : undefined}
        cursor={disabled ? undefined : 'pointer'}
        {...props}
      />
    );
  },
);

type BaseLinkComponent<C extends React.ElementType = 'a'> = (props: BaseLinkProps<C>) => React.ReactNode;

export { BaseLink };
export type { BaseLinkProps, BaseLinkComponent };
