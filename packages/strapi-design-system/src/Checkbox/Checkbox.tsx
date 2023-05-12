import * as React from 'react';

import styled from 'styled-components';

import { BaseCheckbox, BaseCheckboxProps } from '../BaseCheckbox';
import { Box } from '../Box';
import { Field, FieldHint, FieldError, useField, FieldProps } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { Typography } from '../Typography';

const CheckboxLabel = styled(Typography)<Pick<CheckboxProps, 'disabled'>>`
  display: flex;
  align-items: flex-start;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

const CheckboxTick = (props: BaseCheckboxProps) => {
  const { id } = useField();

  return <BaseCheckbox id={id} {...props} />;
};

interface CheckboxProps extends BaseCheckboxProps, Pick<FieldProps, 'hint' | 'error'> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Checkbox = ({ children, disabled = false, id, hint, error, ...props }: CheckboxProps) => {
  const generatedId = useId(id);

  let ariaDescription: string | undefined;

  if (error) {
    ariaDescription = `${generatedId}-error`;
  } else if (hint) {
    ariaDescription = `${generatedId}-hint`;
  }

  return (
    <Field id={generatedId} hint={hint} error={error}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <CheckboxLabel as="label" textColor="neutral800" disabled={disabled}>
          <CheckboxTick disabled={disabled} aria-describedby={ariaDescription} {...props} />
          <Box paddingLeft={2}>{children}</Box>
        </CheckboxLabel>

        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};
