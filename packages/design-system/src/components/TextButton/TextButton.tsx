import * as React from 'react';

import { Loader } from '@strapi/icons';
import { styled, keyframes } from 'styled-components';

import { focus } from '../../styles/buttons';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography } from '../Typography';

type TextButtonProps<C extends React.ElementType = 'button'> = FlexProps<C> & {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  loading?: boolean;
  startIcon?: React.ReactNode;
};

const TextButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    { children, startIcon, endIcon, disabled = false, loading = false, ...props }: TextButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <TextButtonWrapper
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        tag="button"
        type="button"
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

        <Typography variant="pi">{children}</Typography>

        {endIcon}
      </TextButtonWrapper>
    );
  },
) as TextButtonComponent;

type TextButtonComponent<C extends React.ElementType = 'button'> = <T extends React.ElementType = C>(
  props: PolymorphicComponentPropsWithRef<T, TextButtonProps<T>>,
) => React.JSX.Element;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingWrapper = styled.span`
  display: flex;
  animation: ${rotation} 2s infinite linear;
  will-change: transform;
`;

const TextButtonWrapper = styled<FlexComponent<'button'>>(Flex)`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary600};
  cursor: pointer;

  &[aria-disabled='true'] {
    pointer-events: none;
    color: ${(props) => props.theme.colors.neutral600};
  }

  ${focus}
`;

export { TextButton };
export type { TextButtonProps };
