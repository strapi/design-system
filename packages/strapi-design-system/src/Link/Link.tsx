import * as React from 'react';

import { ExternalLink } from '@strapi/icons';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from '../Box';
import { buttonFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';

const LinkWrapper = styled.a<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};

  svg path {
    transition: fill 150ms ease-out;
    fill: currentColor;
  }

  svg {
    font-size: ${10 / 16}rem;
  }

  ${Typography} {
    transition: color 150ms ease-out;
    color: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary700};
  }

  ${buttonFocusStyle};
`;

const IconWrapper = styled(Box)`
  display: flex;
`;

interface SharedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface ToLinkProps extends SharedLinkProps {
  to: NavLinkProps['to'];
  href?: never;
}

interface HrefLinkProps extends SharedLinkProps {
  href: string;
  to?: never;
}

type LinkProps = ToLinkProps | HrefLinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, to, disabled = false, startIcon, endIcon, ...restProps }, ref) => {
    const target = href ? '_blank' : undefined;
    const rel = href ? 'noreferrer noopener' : undefined;

    return (
      <LinkWrapper
        as={to && !disabled ? NavLink : 'a'}
        target={target}
        rel={rel}
        to={disabled ? undefined : to}
        href={disabled ? '#' : href}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        {startIcon && (
          <IconWrapper as="span" aria-hidden paddingRight={2}>
            {startIcon}
          </IconWrapper>
        )}

        <Typography>{children}</Typography>

        {endIcon && !href && (
          <IconWrapper as="span" aria-hidden paddingLeft={2}>
            {endIcon}
          </IconWrapper>
        )}

        {href && (
          <IconWrapper as="span" aria-hidden paddingLeft={2}>
            <ExternalLink />
          </IconWrapper>
        )}
      </LinkWrapper>
    );
  },
);
