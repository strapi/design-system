import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sizes } from '../themes/sizes';
import { useId } from '../helpers/useId';
import { Field, FieldHint, FieldError, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { Flex } from '../Flex';
import { TextButton } from '../TextButton';
import { ToggleCheckbox } from '../ToggleCheckbox';

const FieldWrapper = styled(Field)`
  width: fit-content;
`;

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

const ClearButton = styled(TextButton)`
  align-self: flex-end;
  margin-left: auto;
`;

export const ToggleInput = ({
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
  const generatedId = useId('toggleinput', id);

  return (
    <FieldWrapper name={name} hint={hint} error={error} id={generatedId}>
      <Stack size={1}>
        <Flex>
          <FieldLabel required={required}>{label}</FieldLabel>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
          {clearLabel && onClear && checked !== null && <ClearButton onClick={onClear}>{clearLabel}</ClearButton>}
        </Flex>
        <ToggleCheckbox id={generatedId} size={size} name={name} onClear={onClear} checked={checked} {...props}>
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
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.node,
  name: PropTypes.string,
  onClear: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
