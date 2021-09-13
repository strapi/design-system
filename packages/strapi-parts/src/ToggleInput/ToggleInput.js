import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field, FieldHint, FieldError, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Row } from '../Row';
import { ToggleCheckbox } from '../ToggleCheckbox';

const FieldWrapper = styled(Field)`
  width: fit-content;
`;

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const ToggleInput = ({ error, hint, label, name, labelAction, ...props }) => {
  return (
    <FieldWrapper name={name} hint={hint} error={error}>
      <Stack size={1}>
        <Row>
          <FieldLabel>{label}</FieldLabel>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
        </Row>
        <ToggleCheckbox name={name} {...props}>
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
};

ToggleInput.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.node,
  name: PropTypes.string,
};
