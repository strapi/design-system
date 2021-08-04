import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Row } from '../Row';
import { Box } from '../Box';
import styled from 'styled-components';
import { useId } from '../helpers/useId';

export const TextInputWrapper = styled.div`
  & textarea {
    height: ${80 / 16}rem;
  }
`;

export const TextInput = React.forwardRef(
  ({ startAction, endAction, name, hint, error, label, labelAction, id, ...props }, ref) => {
    const generatedId = useId('textinput', id);
    const inputWrapperRef = useRef(null);

    useImperativeHandle(ref, () => ({
      inputWrapperRef,
    }));

    return (
      <TextInputWrapper ref={inputWrapperRef}>
        <Field name={name} hint={hint} error={error} id={generatedId}>
          <Stack size={1}>
            <Row cols="auto auto 1fr" gap={1}>
              <FieldLabel>{label}</FieldLabel>
              {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
            </Row>
            <FieldInput ref={ref} startAction={startAction} endAction={endAction} {...props} />
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
  id: undefined,
  startAction: undefined,
  endAction: undefined,
};

TextInput.propTypes = {
  endAction: PropTypes.element,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  startAction: PropTypes.element,
};
