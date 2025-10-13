import * as React from 'react';

import { ExternalLink } from '@strapi/icons';
import { styled, type DefaultTheme } from 'styled-components';

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
  /**
   * @default primary600
   */
  color?: keyof DefaultTheme['colors'];
  /**
   * @default primary700
   */
  activeColor?: keyof DefaultTheme['colors'];
};

const Link = forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      children,
      href,
      disabled = false,
      startIcon,
      endIcon,
      isExternal = false,
      color = 'primary600',
      activeColor = 'primary700',
      ...props
    }: LinkProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    return (
      <LinkWrapper
        ref={ref}
        href={href}
        disabled={disabled}
        isExternal={isExternal}
        $activeColor={activeColor}
        $color={color}
        {...props}
      >
        {startIcon}
        <Typography textColor={disabled ? 'neutral600' : color}>{children}</Typography>
        {endIcon}
        {href && !endIcon && isExternal && <ExternalLink fill={color} />}
      </LinkWrapper>
    );
  },
);

type LinkComponent<C extends React.ElementType = 'a'> = (props: LinkProps<C>) => React.ReactNode;

const LinkWrapper = styled<BaseLinkComponent>(BaseLink)<{
  $color?: keyof DefaultTheme['colors'];
  $activeColor?: keyof DefaultTheme['colors'];
}>`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: ${({ theme }) => theme.spaces[2]};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  svg {
    font-size: 1rem;

    path {
      fill: ${({ disabled, $color, theme }) =>
        disabled ? theme.colors.neutral600 : theme.colors[$color || 'primary600']};
    }
  }

  &:hover {
    & > span {
      color: ${({ theme, $color }) => theme.colors[$color || 'primary600']};
    }

    svg path {
      fill: ${({ theme, $color }) => theme.colors[$color || 'primary600']};
    }
  }

  &:active {
    color: ${({ theme, $activeColor }) => theme.colors[$activeColor || 'primary700']};
  }

  ${focus};
`;

export { Link };
export type { LinkProps, LinkComponent };
