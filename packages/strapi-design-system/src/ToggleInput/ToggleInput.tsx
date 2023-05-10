import React from 'react';

import styled from 'styled-components';

import { Field, FieldHint, FieldError, FieldLabel } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
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

interface ToggleInputProps {
  checked?: boolean;
  clearLabel?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  id?: string;
  label?: string;
  labelAction?: React.ReactNode;
  name?: string;
  onClear?: () => void;
  required?: boolean;
  size?: keyof typeof sizes.input;
}

export const ToggleInput = ({
  disabled = false,
  size = 'M',
  error,
  hint,
  label,
  name = '',
  labelAction,
  required = false,
  id,
  onClear,
  clearLabel,
  checked = false,
  ...props
}: ToggleInputProps) => {
  const generatedId = useId(id);

  return (
    <FieldWrapper name={name} hint={hint} error={error} id={generatedId} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
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
      </Flex>
    </FieldWrapper>
  );
};

ToggleInput.displayName = 'ToggleInput';
