import * as React from 'react';

import { styled } from 'styled-components';

import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

type BaseLinkProps<C extends React.ElementType = 'a'> = BoxProps<C> & {
  disabled?: boolean;
  isExternal?: boolean;
};

const BaseLinkImpl = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ href, disabled = false, isExternal = false, ...props }, ref) => {
    return (
      <BaseLink
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

const BaseLink = styled<BoxComponent<'a'>>(Box)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

type BaseLinkComponent<C extends React.ElementType = 'a'> = (props: BaseLinkProps<C>) => React.ReactNode;

export { BaseLinkImpl as BaseLink };
export type { BaseLinkProps, BaseLinkComponent };
