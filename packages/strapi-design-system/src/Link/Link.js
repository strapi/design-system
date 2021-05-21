import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@strapi/icons/ExternalLink';
import { TableLabel } from '../Text';
import { Box } from '../Box';

const LinkWrapper = styled.a`
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
`;

// TODO: make sure to use the link from the router library chosen
export const Link = ({ href, to, children, disabled, leftIcon, rightIcon, ...props }) => {
  const linkHref = disabled ? '#' : href || to;
  const target = href ? '_blank' : undefined;
  const rel = href ? 'noreferrer noopener' : undefined;

  return (
    <LinkWrapper target={target} rel={rel} href={linkHref} disabled={disabled} {...props}>
      <TableLabel textColor={disabled ? 'neutral600' : 'primary600'} as="span">
        {leftIcon && (
          <Box as="span" aria-hidden={true} paddingRight={2}>
            {leftIcon}
          </Box>
        )}
        {children}

        {rightIcon && !href && (
          <Box as="span" aria-hidden={true} paddingLeft={2}>
            {rightIcon}
          </Box>
        )}

        {href && (
          <Box as="span" aria-hidden={true} paddingLeft={2}>
            <ExternalLink />
          </Box>
        )}
      </TableLabel>
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
  href: (props) => {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }
  },
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  to: (props) => {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }
  },
};
