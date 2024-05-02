import * as React from 'react';

import { styled } from 'styled-components';

import { focus } from '../../styles/buttons';
import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Flex, FlexComponent, FlexProps } from '../Flex';

type BaseButtonProps<C extends React.ElementType = 'button'> = FlexProps<C> & {
  disabled?: boolean;
};

const BaseButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    { disabled, children, ...props }: BaseButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    return (
      <BaseButtonWrapper
        ref={ref}
        aria-disabled={disabled}
        disabled={disabled}
        tag="button"
        type="button"
        padding={2}
        hasRadius
        background="neutral0"
        borderColor="neutral200"
        cursor="pointer"
        {...props}
      >
        {children}
      </BaseButtonWrapper>
    );
  },
);

type BaseButtonComponent<C extends React.ElementType = 'button'> = (props: BaseButtonProps<C>) => React.ReactNode;

const BaseButtonWrapper = styled<FlexComponent<'button'>>(Flex)`
  &[aria-disabled='true'] {
    pointer-events: none;
  }

  ${focus}
`;

export { BaseButton };
export type { BaseButtonProps, BaseButtonComponent };
