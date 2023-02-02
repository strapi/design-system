import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { VARIANTS, BUTTON_SIZES } from '../Button/constants';
import { BaseButtonWrapper } from '../BaseButton';

const LinkWrapper = styled(BaseButtonWrapper)`
  text-decoration: none;

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

export const LinkButton = React.forwardRef(
  ({ variant, startIcon, endIcon, disabled, children, size, href, to, ...props }, ref) => {
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
        {...props}
        as={to && !disabled ? NavLink : 'a'}
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
LinkButton.displayName = 'LinkButton';

LinkButton.defaultProps = {
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  size: 'S',
  variant: 'default',
  onClick: undefined,
  href: undefined,
  to: undefined,
};
LinkButton.propTypes = {
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
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  to(props) {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  },
  variant: PropTypes.oneOf(VARIANTS),
};
