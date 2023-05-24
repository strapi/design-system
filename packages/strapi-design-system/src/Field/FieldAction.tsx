import { cloneElement, forwardRef, ReactNode } from 'react';

import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';
import { VisuallyHidden } from '../VisuallyHidden';

const FieldActionWrapper = styled(Flex)`
  font-size: 1.6rem;
  padding: 0;
`;

export interface FieldActionProps extends FlexProps<'button'> {
  label: string;
  children: ReactNode;
}

export const FieldAction = forwardRef<HTMLButtonElement, FieldActionProps>(({ label, children, ...props }, ref) => (
  <FieldActionWrapper
    justifyContent="unset"
    background="transparent"
    borderStyle="none"
    type="button"
    {...props}
    as="button"
    ref={ref}
  >
    <VisuallyHidden as="span">{label}</VisuallyHidden>
    {cloneElement(children as React.ReactElement, {
      'aria-hidden': true,
      focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
    })}
  </FieldActionWrapper>
));
