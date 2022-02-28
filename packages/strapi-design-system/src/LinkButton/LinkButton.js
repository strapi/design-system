import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { VARIANTS, BUTTON_SIZES } from '../Button/constants';
import { BaseButtonWrapper } from '../BaseButton';
import { BaseLink } from '../BaseLink';

const LinkWrapper = styled(BaseButtonWrapper)`
  padding: ${({ theme, size }) => `${size === 'S' ? theme.spaces[2] : '10px'} ${theme.spaces[4]}`};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
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

export const LinkButton = React.forwardRef(
  ({ variant, startIcon, endIcon, disabled, children, size, as, ...props }, ref) => {
    return (
      <LinkWrapper ref={ref} aria-disabled={disabled} size={size} variant={variant} {...props} as={as || BaseLink}>
        {startIcon && (
          <Box aria-hidden={true} paddingRight={2}>
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
          <Box aria-hidden={true} paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </LinkWrapper>
    );
  },
);

LinkButton.displayName = 'LinkButton';

LinkButton.defaultProps = {
  as: BaseLink,
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
  as: PropTypes.elementType,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  href: (props) => {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }
  },
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  to: (props) => {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }
  },
  variant: PropTypes.oneOf(VARIANTS),
};
