import React from 'react';
import PropTypes from 'prop-types';
import { BaseCheckbox } from '../BaseCheckbox';
import { Stack } from '../Stack';
import { Field, FieldHint, FieldError, useField } from '../Field';
import { CheckboxLabel } from './CheckboxLabel';
import { Box } from '../Box';

const CheckboxTick = (props) => {
  const { id } = useField();

  const fieldId = `field-${id}`;

  return <BaseCheckbox id={fieldId} {...props} />;
};

export const Checkbox = ({ children, disabled, id, hint, error, ...props }) => {
  return (
    <Field id={id} hint={hint} error={error}>
      <Stack size={1}>
        <CheckboxLabel as="label" textColor="neutral800" disabled={disabled}>
          <CheckboxTick disabled={disabled} {...props} />
          <Box paddingLeft={2}>{children}</Box>
        </CheckboxLabel>

        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

Checkbox.defaultProps = {
  disabled: false,
  id: undefined,
  error: undefined,
  hint: undefined,
};
Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
};
