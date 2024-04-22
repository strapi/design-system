import * as React from 'react';

import styled from 'styled-components';

import { BaseCheckbox, BaseCheckboxProps, CheckboxElement } from '../BaseCheckbox';
import { Box } from '../Box';
import { useId } from '../hooks/useId';
import { Typography } from '../Typography';

const CheckboxLabel = styled(Typography)<Pick<CheckboxProps, 'disabled'>>`
  display: flex;
  align-items: flex-start;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

const CheckboxTick = React.forwardRef<CheckboxElement, BaseCheckboxProps>((props, forwardedRef) => {
  const id = useId();

  return <BaseCheckbox ref={forwardedRef} id={id} {...props} />;
});

interface CheckboxProps extends BaseCheckboxProps {
  children: React.ReactNode;
  disabled?: boolean;
  'aria-describedby'?: string;
}

export const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  ({ children, disabled = false, ...props }, forwardedRef) => {
    return (
      <CheckboxLabel as="label" textColor="neutral800" disabled={disabled}>
        <CheckboxTick ref={forwardedRef} disabled={disabled} {...props} />
        <Box paddingLeft={2}>{children}</Box>
      </CheckboxLabel>
    );
  },
);
