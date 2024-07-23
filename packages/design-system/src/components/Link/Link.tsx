import * as React from 'react';

import { ExternalLink } from '@strapi/icons';
import { styled } from 'styled-components';

import { Typography } from '../../primitives/Typography';
import { focus } from '../../styles/buttons';
import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseLink, BaseLinkComponent, BaseLinkProps } from '../BaseLink';

type LinkProps<C extends React.ElementType = 'a'> = BaseLinkProps<C> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /**
   * @default false
   */
  isExternal?: boolean;
};

const Link = forwardRef(
  <C extends React.ElementType = 'a'>(
    { children, href, disabled = false, startIcon, endIcon, isExternal = false, ...props }: LinkProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    return (
      <LinkWrapper ref={ref} href={href} disabled={disabled} isExternal={isExternal} {...props}>
        {startIcon}
        <Typography textColor={disabled ? 'neutral600' : 'primary600'}>{children}</Typography>
        {endIcon}
        {href && !endIcon && isExternal && <ExternalLink />}
      </LinkWrapper>
    );
  },
);

type LinkComponent<C extends React.ElementType = 'a'> = (props: LinkProps<C>) => React.ReactNode;

const LinkWrapper = styled<BaseLinkComponent>(BaseLink)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: ${({ theme }) => theme.spaces[2]};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  svg {
    font-size: 1rem;

    path {
      fill: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};
    }
  }

  &:hover {
    span {
      color: ${({ theme }) => theme.colors.primary500};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary700};
  }

  ${focus};
`;

export { Link };
export type { LinkProps, LinkComponent };
