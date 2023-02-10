import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Typography } from '../../Typography';
import { Flex } from '../../Flex';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../../Button/utils';
import { VARIANTS, BUTTON_SIZES } from '../../Button/constants';
import { BaseButtonWrapper } from '../../BaseButton';
import { BaseLink } from '../../BaseLink';

const LinkWrapper = styled(BaseButtonWrapper)`
  padding: ${({ theme, size }) => `${size === 'S' ? theme.spaces[2] : '10px'} ${theme.spaces[4]}`};
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
  ({ variant, startIcon, endIcon, disabled, children, size, as, ...props }, ref) => {
    const paddingX = size === 'S' ? 2 : '10px';
    const paddingY = 4;

    return (
      <LinkWrapper
        ref={ref}
        aria-disabled={disabled}
        size={size}
        variant={variant}
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
        as={as || BaseLink}
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
