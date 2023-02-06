import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '../Typography';
import { Box } from '../Box';
import { BaseButtonWrapper } from '../BaseButton';

import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { VARIANTS, BUTTON_SIZES } from '../Button/constants';

const LinkWrapper = styled(BaseButtonWrapper)<Required<Pick<LinkButtonProps, 'size' | 'variant'>>>`
  padding: ${({ theme, size }) => `${size === 'S' ? theme.spaces[2] : '10px'} ${theme.spaces[4]}`};
  background: ${({ theme }) => theme.colors.buttonPrimary600};
  border: 1px solid ${({ theme }) => theme.colors.buttonPrimary600};
  border-radius: ${({ theme }) => theme.borderRadius};
  ${Box} {
    display: flex;
    align-items: center;
  }
  ${Typography} {
    color: ${({ theme }) => theme.colors.buttonNeutral0};
  }
  &[aria-disabled='true'] {
    ${getDisabledStyle}
    &:active {
      ${getDisabledStyle}
    }
  }
  &:hover {
    ${getHoverStyle}
  }
  &:active {
    ${getActiveStyle}
  }
  ${getVariantStyle}
  /**
    Link specific properties
  */
  display: inline-flex;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
`;

interface SharedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  size?: typeof BUTTON_SIZES[number];
  startIcon?: React.ReactNode;
  variant?: typeof VARIANTS[number];
}

interface ToLinkProps extends SharedLinkProps {
  to: NavLinkProps['to'];
  href: never;
}

interface HrefLinkProps extends SharedLinkProps {
  href: string;
  to: never;
}

type LinkButtonProps = ToLinkProps | HrefLinkProps;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = 'default', startIcon, endIcon, disabled = false, children, size = 'S', href, to, ...props }, ref) => {
    const target = href ? '_blank' : undefined;
    const rel = href ? 'noreferrer noopener' : undefined;

    return (
      <LinkWrapper
        ref={ref}
        aria-disabled={disabled}
        size={size}
        variant={variant}
        target={target}
        rel={rel}
        to={disabled ? undefined : to}
        href={disabled ? '#' : href}
        {...props}
        as={to && !disabled ? NavLink : 'a'}
      >
        {startIcon && (
          <Box aria-hidden paddingRight={2}>
            {startIcon}
          </Box>
        )}
        {size === 'S' ? (
          <Typography variant="pi" fontWeight="bold">
            {children}
          </Typography>
        ) : (
          <Typography fontWeight="bold">{children}</Typography>
        )}
        {endIcon && (
          <Box aria-hidden paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </LinkWrapper>
    );
  },
);
