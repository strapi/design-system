import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@strapi/icons/ExternalLink';
import { NavLink } from 'react-router-dom';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { buttonFocusStyle } from '../themes/utils';

const LinkWrapper = styled.a`
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

export const Link = forwardRef(({ href, to, children, disabled, startIcon, endIcon, ...props }, ref) => {
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
      {...props}
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
});

Link.displayName = 'Link';

Link.defaultProps = {
  endIcon: undefined,
  href: undefined,
  to: undefined,
  disabled: false,
  startIcon: undefined,
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  href(props) {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  },

  startIcon: PropTypes.element,
  to(props) {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  },
};
