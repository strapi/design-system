import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sizes } from '../themes/sizes';
import { Field, FieldHint, FieldError, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { ToggleCheckbox } from '../ToggleCheckbox';

const FieldWrapper = styled(Field)`
  width: fit-content;
`;

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const ToggleInput = ({ size, error, hint, label, name, labelAction, required, ...props }) => {
  return (
    <FieldWrapper name={name} hint={hint} error={error}>
      <Stack size={1}>
        <Flex>
          <FieldLabel required={required}>{label}</FieldLabel>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
        </Flex>
        <ToggleCheckbox size={size} name={name} {...props}>
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
  error: undefined,
  hint: undefined,
  label: '',
  labelAction: undefined,
  name: '',
  required: false,
  size: 'M',
};

ToggleInput.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.node,
  name: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
