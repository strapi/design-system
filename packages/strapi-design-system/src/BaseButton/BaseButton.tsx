import React, { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';
import { buttonFocusStyle } from '../themes/utils';

export const BaseButtonWrapper = styled(Flex)`
  svg {
    height: ${({ theme }) => theme.spaces[3]};
    width: ${({ theme }) => theme.spaces[3]};

    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral0};
    }
  }

  &[aria-disabled='true'] {
    pointer-events: none;
  }

  ${buttonFocusStyle}
`;

export interface BaseButtonProps<TElement extends HTMLElement = HTMLButtonElement> extends FlexProps<TElement> {
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ disabled, children, background = 'neutral0', ...props }, ref) => {
    return (
      <BaseButtonWrapper
        ref={ref}
        aria-disabled={disabled}
        as="button"
        type="button"
        disabled={disabled}
        padding={2}
        hasRadius
        background={background}
        borderColor="neutral200"
        cursor="pointer"
        {...props}
      >
        {children}
      </BaseButtonWrapper>
    );
  },
);

BaseButton.displayName = 'BaseButton';
