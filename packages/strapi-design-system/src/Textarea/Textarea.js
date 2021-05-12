import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Row } from '../Row';
import { Box } from '../Box';
import styled from 'styled-components';

const TextareaWrapper = styled.div`
  & textarea {
    height: ${80 / 16}rem;
  }
`;

export const Textarea = React.forwardRef(
  ({ leftAction, rightAction, name, hint, error, label, children, action, ...props }, ref) => {
    return (
      <TextareaWrapper>
        <Field name={name} hint={hint} error={error}>
          <Stack size={1}>
            <Row cols="auto auto 1fr" gap={1}>
              <FieldLabel>{label}</FieldLabel>
              {action && <Box paddingLeft={1}>{action}</Box>}
            </Row>
            <FieldInput
              ref={ref}
              as="textarea"
              leftAction={leftAction}
              rightAction={rightAction}
              value={children}
              {...props}
            />
            <FieldHint />
            <FieldError />
          </Stack>
        </Field>
      </TextareaWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  action: undefined,
  error: undefined,
  hint: undefined,
  leftAction: undefined,
  rightAction: undefined,
  children: '',
};

Textarea.propTypes = {
  action: PropTypes.element,
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  leftAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  rightAction: PropTypes.element,
};
