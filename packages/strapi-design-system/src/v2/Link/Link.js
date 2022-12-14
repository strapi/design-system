import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@strapi/icons/ExternalLink';
import { Typography } from '../../Typography';
import { Box } from '../../Box';
import { buttonFocusStyle } from '../../themes/utils';
import { BaseLink } from '../../BaseLink';

const LinkWrapper = styled(BaseLink)`
  display: inline-flex;
  align-items: center;
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

export const Link = React.forwardRef(({ children, href, disabled, startIcon, endIcon, ...props }, ref) => {
  return (
    <LinkWrapper ref={ref} href={href} disabled={disabled} {...props}>
      {startIcon && (
        <IconWrapper as="span" aria-hidden paddingRight={2}>
          {startIcon}
        </IconWrapper>
      )}

      <Typography textColor={disabled ? 'neutral600' : 'primary600'}>{children}</Typography>

      {endIcon && (
        <IconWrapper as="span" aria-hidden paddingLeft={2}>
          {endIcon}
        </IconWrapper>
      )}

      {href && !endIcon && (
        <IconWrapper as="span" aria-hidden paddingLeft={2}>
          <ExternalLink />
        </IconWrapper>
      )}
    </LinkWrapper>
  );
});

Link.displayName = 'Link';

Link.defaultProps = {
  as: undefined,
  href: undefined,
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
};

Link.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  href: PropTypes.string,
  startIcon: PropTypes.element,
};
