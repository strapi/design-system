import * as React from 'react';

import { styled } from 'styled-components';

import { VisuallyHidden } from '../../utilities/VisuallyHidden';
import { Flex, FlexComponent, FlexProps } from '../Flex';

const FieldActionWrapper = styled<FlexComponent<'button'>>(Flex)`
  font-size: 1.6rem;
  padding: 0;
`;

export interface FieldActionProps extends FlexProps<'button'> {
  label: string;
  children: React.ReactNode;
}

export const FieldAction = React.forwardRef<HTMLButtonElement, FieldActionProps>(
  ({ label, children, ...props }, ref) => (
    <FieldActionWrapper
      justifyContent="unset"
      background="transparent"
      borderStyle="none"
      type="button"
      {...props}
      tag="button"
      ref={ref}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {React.cloneElement(children as React.ReactElement, {
        'aria-hidden': true,
        focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
      })}
    </FieldActionWrapper>
  ),
);
