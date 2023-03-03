import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Field, FieldHint, FieldError, FieldLabel } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { Stack } from '../Stack';
import { TextButton } from '../TextButton';
import { sizes } from '../themes/sizes';
import { ToggleCheckbox } from '../ToggleCheckbox';

const FieldWrapper = styled(Field)`
  max-width: 320px;
`;

const ClearButton = styled(TextButton)`
  align-self: flex-end;
  margin-left: auto;
`;

export const ToggleInput = ({
  disabled,
  size,
  error,
  hint,
  label,
  name,
  labelAction,
  required,
  id,
  onClear,
  clearLabel,
  checked,
  ...props
}) => {
  const generatedId = useId(id);

  return (
    <FieldWrapper name={name} hint={hint} error={error} id={generatedId} required={required}>
      <Stack spacing={1}>
        <Flex>
          <FieldLabel action={labelAction}>{label}</FieldLabel>
          {clearLabel && onClear && checked !== null && !disabled && (
            <ClearButton onClick={onClear}>{clearLabel}</ClearButton>
          )}
        </Flex>
        <ToggleCheckbox id={generatedId} size={size} checked={checked} disabled={disabled} {...props}>
          {label}
        </ToggleCheckbox>
        <FieldHint />
        <FieldError />
      </Stack>
    </FieldWrapper>
  );
};

ToggleInput.displayName = 'ToggleInput';

ToggleInput.defaultProps = {
  checked: false,
  clearLabel: undefined,
  disabled: false,
  error: undefined,
  hint: undefined,
  id: undefined,
  label: '',
  labelAction: undefined,
  name: '',
  onClear: undefined,
  required: false,
  size: 'M',
};

ToggleInput.propTypes = {
  checked: PropTypes.bool,
  clearLabel: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.node,
  name: PropTypes.string,
  onClear: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
