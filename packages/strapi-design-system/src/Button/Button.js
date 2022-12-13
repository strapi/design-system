import React from 'react';

import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Loader from '@strapi/icons/Loader';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';
import { BaseButton } from '../BaseButton';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingWrapper = styled.div`
  animation: ${rotation} 2s infinite linear;
  will-change: transform;
`;

const BoxFullHeight = styled(Box)`
  height: 100%;
`;

export const ButtonWrapper = styled(BaseButton)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.buttonPrimary600};
  border: 1px solid ${({ theme }) => theme.colors.buttonPrimary600};
  height: ${({ theme, size }) => theme.sizes.button[size]};
  padding-left: ${({ theme }) => theme.spaces[4]};
  padding-right: ${({ theme }) => theme.spaces[4]};

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
  ${({ fullWidth }) =>
    fullWidth &&
    `
    display: inline-flex;
    justify-content: center;
    width: 100%;
  `}
`;

export const Button = React.forwardRef(
  ({ variant, startIcon, endIcon, disabled, children, onClick, size, loading, fullWidth, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const handleClick = (e) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    return (
      <ButtonWrapper
        ref={ref}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        size={size}
        variant={variant}
        onClick={handleClick}
        fullWidth={fullWidth}
        {...props}
      >
        {(startIcon || loading) && (
          <BoxFullHeight aria-hidden paddingRight={2}>
            {loading ? (
              <LoadingWrapper>
                <Loader />
              </LoadingWrapper>
            ) : (
              startIcon
            )}
          </BoxFullHeight>
        )}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold" lineHeight={0}>
          {children}
        </Typography>

        {endIcon && (
          <Box aria-hidden paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';

Button.defaultProps = {
  disabled: false,
  endIcon: undefined,
  fullWidth: false,
  loading: false,
  onClick: undefined,
  size: 'S',
  startIcon: undefined,
  variant: 'default',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  variant: PropTypes.oneOf(VARIANTS),
};
