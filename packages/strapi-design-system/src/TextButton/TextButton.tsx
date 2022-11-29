import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from '@strapi/icons';

import { Box } from '../Box';
import { Typography } from '../Typography';
import { Flex, FlexProps } from '../Flex';
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

export interface TextButtonProps extends FlexProps<HTMLButtonElement> {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  startIcon?: React.ReactNode;
}

export const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ children, startIcon, endIcon, onClick, disabled = false, loading = false, ...props }, ref) => {
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
