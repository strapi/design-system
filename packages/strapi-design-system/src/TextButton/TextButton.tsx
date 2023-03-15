import * as React from 'react';

import { Loader } from '@strapi/icons';
import styled, { keyframes } from 'styled-components';

import { Flex, FlexProps } from '../Flex';
import { buttonFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';

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
  border: none;

  &[aria-disabled='true'] {
    pointer-events: none;
    svg path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }

  ${buttonFocusStyle}
`;

export type TextButtonProps = FlexProps<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    endIcon?: React.ReactNode;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    startIcon?: React.ReactNode;
  };

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
        background="transparent"
        gap={2}
        {...props}
      >
        {loading ? (
          <LoadingWrapper aria-hidden>
            <Loader />
          </LoadingWrapper>
        ) : (
          startIcon
        )}

        <Typography variant="pi" textColor={isDisabled ? 'neutral600' : 'primary600'}>
          {children}
        </Typography>

        {endIcon}
      </TextButtonWrapper>
    );
  },
);

TextButton.displayName = 'TextButton';
