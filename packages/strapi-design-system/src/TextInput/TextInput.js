import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '../Field';
import { Stack } from '../Stack';
import { Row } from '../Row';
import { Box } from '../Box';
import styled from 'styled-components';

const TextInputWrapper = styled.div`
  & textarea {
    height: ${80 / 16}rem;
  }
`;

export const TextInput = React.forwardRef(
  ({ leftAction, rightAction, name, hint, error, label, labelAction, ...props }, ref) => {
    return (
      <TextInputWrapper>
        <Field name={name} hint={hint} error={error}>
          <Stack size={1}>
            <Row cols="auto auto 1fr" gap={1}>
              <FieldLabel>{label}</FieldLabel>
              {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
            </Row>
            <FieldInput ref={ref} leftAction={leftAction} rightAction={rightAction} {...props} />
            <FieldHint />
            <FieldError />
          </Stack>
        </Field>
      </TextInputWrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

TextInput.defaultProps = {
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  leftAction: undefined,
  rightAction: undefined,
};

TextInput.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelAction: PropTypes.element,
  leftAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  rightAction: PropTypes.element,
};
