import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Loader from '@strapi/icons/Loader';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { buttonFocusStyle } from '../themes/utils';

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

const TextButtonWrapper = styled(Flex)`
  background: transparent;
  border: none;

  &[aria-disabled='true'] {
    pointer-events: none;
    svg path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  svg {
    display: flex;
    font-size: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }

  ${buttonFocusStyle}
`;

export const TextButton = React.forwardRef(
  ({ children, startIcon, endIcon, onClick, disabled, loading, ...props }, ref) => {
    const handleClick = onClick && !disabled ? onClick : undefined;
    const isDisabled = disabled || loading;

    return (
      <TextButtonWrapper
        ref={ref}
        aria-disabled={isDisabled}
        onClick={handleClick}
        as="button"
        type="button"
        {...props}
      >
        {(startIcon || loading) && (
          <Box as="span" paddingRight={2} aria-hidden>
            {loading ? (
              <LoadingWrapper>
                <Loader />
              </LoadingWrapper>
            ) : (
              startIcon
            )}
          </Box>
        )}
        <Typography variant="pi" textColor={isDisabled ? 'neutral600' : 'primary600'}>
          {children}
        </Typography>
        {endIcon && (
          <Box as="span" paddingLeft={2} aria-hidden>
            {endIcon}
          </Box>
        )}
      </TextButtonWrapper>
    );
  },
);

TextButton.displayName = 'TextButton';

TextButton.defaultProps = {
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  loading: false,
  onClick: undefined,
};

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  startIcon: PropTypes.element,
};
