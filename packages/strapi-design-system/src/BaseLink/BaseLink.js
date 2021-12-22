import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@strapi/icons/ExternalLink';
import { Typography } from '../Typography';
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
export const BaseLink = React.forwardRef(
  ({ href, children, disabled, startIcon, endIcon, target, rel, ...props }, ref) => {
    return (
      <LinkWrapper
        target={disabled ? undefined : target}
        ref={ref}
        rel={target === '_blank' ? 'noreferrer noopener' : rel}
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
  },
);

BaseLink.displayName = 'BaseLink';

BaseLink.defaultProps = {
  href: undefined,
  disabled: false,
  rel: undefined,
  target: undefined,
};

BaseLink.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  href: (props) => {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }
  },
  rel: PropTypes.string,
  startIcon: PropTypes.element,
  target: PropTypes.string,
};
