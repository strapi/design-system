import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@strapi/icons/ExternalLink';
import { NavLink } from 'react-router-dom';
import { Typography } from '../Text';
import { Box } from '../Box';
import { buttonFocusStyle } from '../themes/utils';

const LinkWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  svg path {
    fill: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};
  }

  svg {
    font-size: ${10 / 16}rem;
  }

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.primary800};
  }

  ${buttonFocusStyle};
`;

const IconWrapper = styled(Box)`
  display: flex;
`;

// TODO: make sure to use the link from the router library chosen
export const Link = ({ href, to, children, disabled, startIcon, endIcon, ...props }) => {
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
      {...props}
    >
      {startIcon && (
        <IconWrapper as="span" aria-hidden={true} paddingRight={2}>
          {startIcon}
        </IconWrapper>
      )}

      <Typography variant="sigma" textColor={disabled ? 'neutral600' : 'primary600'}>
        {children}
      </Typography>

      {endIcon && !href && (
        <IconWrapper as="span" aria-hidden={true} paddingLeft={2}>
          {endIcon}
        </IconWrapper>
      )}

      {href && (
        <IconWrapper as="span" aria-hidden={true} paddingLeft={2}>
          <ExternalLink />
        </IconWrapper>
      )}
    </LinkWrapper>
  );
};

Link.displayName = 'Link';

Link.defaultProps = {
  href: undefined,
  to: undefined,
  disabled: false,
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  href: (props) => {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }
  },
  startIcon: PropTypes.element,
  to: (props) => {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }
  },
};
