import * as React from 'react';

import styled from 'styled-components';

import { BaseCheckbox, BaseCheckboxProps, CheckboxElement } from '../BaseCheckbox';
import { Box } from '../Box';
import { Typography } from '../Typography';

interface CheckboxProps extends BaseCheckboxProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  ({ children, disabled = false, ...props }, forwardedRef) => {
    return (
      <CheckboxLabel as="label" textColor="neutral800" disabled={disabled}>
        <BaseCheckbox ref={forwardedRef} disabled={disabled} {...props} />
        <Box paddingLeft={2}>{children}</Box>
      </CheckboxLabel>
    );
  },
);

const CheckboxLabel = styled(Typography)<Pick<CheckboxProps, 'disabled'>>`
  display: flex;
  align-items: flex-start;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

export { Checkbox };
export type { CheckboxProps };
