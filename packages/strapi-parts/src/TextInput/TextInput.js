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

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const TextInput = React.forwardRef(
  ({ startAction, endAction, name, hint, error, label, labelAction, id, ...props }, ref) => {
    const generatedId = useId('textinput', id);
    const inputWrapperRef = useRef(null);

    if (!label && !props['aria-label']) {
      throw new Error('The TextInput component needs a "label" or an "aria-label" props');
    }

    useImperativeHandle(ref, () => ({
      inputWrapperRef,
    }));

    return (
      <TextInputWrapper ref={inputWrapperRef}>
        <Field name={name} hint={hint} error={error} id={generatedId}>
          <Stack size={1}>
            {label && (
              <Row>
                <FieldLabel>{label}</FieldLabel>
                {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
              </Row>
            )}
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
  'aria-label': undefined,
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  startAction: undefined,
  endAction: undefined,
};

TextInput.propTypes = {
  'aria-label': PropTypes.string,
  endAction: PropTypes.element,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  startAction: PropTypes.element,
};
