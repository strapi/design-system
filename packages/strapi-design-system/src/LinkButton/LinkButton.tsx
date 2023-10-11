import * as React from 'react';

import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { BaseButtonWrapper, BaseButtonProps } from '../BaseButton';
import { VARIANTS, BUTTON_SIZES } from '../Button/constants';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

const LinkWrapper = styled(BaseButtonWrapper)<Required<Pick<LinkButtonProps, 'variant'>>>`
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
`;

interface SharedLinkProps extends BaseButtonProps {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  size?: (typeof BUTTON_SIZES)[number];
  startIcon?: React.ReactNode;
  variant?: (typeof VARIANTS)[number];
}

interface ToLinkProps extends SharedLinkProps {
  to: NavLinkProps['to'];
  href?: never;
}

interface HrefLinkProps extends SharedLinkProps {
  href: string;
  to?: never;
}

type LinkButtonProps = ToLinkProps | HrefLinkProps;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = 'default', startIcon, endIcon, disabled = false, children, size = 'S', href, to, ...props }, ref) => {
    const target = href ? '_blank' : undefined;
    const rel = href ? 'noreferrer noopener' : undefined;

    const paddingX = size === 'S' ? 2 : '10px';
    const paddingY = 4;

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
        background="buttonPrimary600"
        borderColor="buttonPrimary600"
        hasRadius
        gap={2}
        inline
        paddingBottom={paddingX}
        paddingLeft={paddingY}
        paddingRight={paddingY}
        paddingTop={paddingX}
        pointerEvents={disabled ? 'none' : undefined}
        {...props}
        as={to && !disabled ? NavLink : 'a'}
      >
        {startIcon && <Flex aria-hidden>{startIcon}</Flex>}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold" textColor="buttonNeutral0">
          {children}
        </Typography>

        {endIcon && <Flex aria-hidden>{endIcon}</Flex>}
      </LinkWrapper>
    );
  },
);
