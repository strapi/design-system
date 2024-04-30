import * as React from 'react';

import { styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../Flex';
import { focus } from '../styles/buttons';

type BaseButtonProps<C extends React.ElementType = 'button'> = FlexProps<C>;

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ disabled, children, background = 'neutral0', ...props }, ref) => {
    return (
      <BaseButtonWrapper
        ref={ref}
        aria-disabled={disabled}
        tag="button"
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

const BaseButtonWrapper = styled<FlexComponent<'button'>>(Flex)`
  &[aria-disabled='true'] {
    pointer-events: none;
  }

  ${focus}
`;

export { BaseButton };
export type { BaseButtonProps };
