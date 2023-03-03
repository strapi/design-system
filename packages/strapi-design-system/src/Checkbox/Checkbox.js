import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseCheckbox } from '../BaseCheckbox';
import { Box } from '../Box';
import { Field, FieldHint, FieldError, useField } from '../Field';
import { useId } from '../hooks/useId';
import { Stack } from '../Stack';
import { Typography } from '../Typography';

const CheckboxLabel = styled(Typography)`
  display: flex;
  align-items: flex-start;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

const CheckboxTick = (props) => {
  const { id } = useField();

  return <BaseCheckbox id={id} {...props} />;
};

export const Checkbox = ({ children, disabled, id, hint, error, ...props }) => {
  const generatedId = useId(id);

  let ariaDescription;

  if (error) {
    ariaDescription = `${generatedId}-error`;
  } else if (hint) {
    ariaDescription = `${generatedId}-hint`;
  }

  return (
    <Field id={generatedId} hint={hint} error={error}>
      <Stack spacing={1}>
        <CheckboxLabel as="label" textColor="neutral800" disabled={disabled}>
          <CheckboxTick disabled={disabled} aria-describedby={ariaDescription} {...props} />
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
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
