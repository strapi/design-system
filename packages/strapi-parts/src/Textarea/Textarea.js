import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError } from '../Field';
import { TextareaInput } from './TextareaInput';
import { Stack } from '../Stack';
import { Row } from '../Row';
import { Box } from '../Box';
import styled from 'styled-components';

const TextareaWrapper = styled.div`
  & textarea {
    // TODO: remove when we'll have fonts in the theme
    height: ${80 / 16}rem;
    line-height: ${20 / 16}rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  & textarea::placeholder {
    font-weight: 400;
    font-size: ${14 / 16}rem;
    line-height: 1.43;
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }
`;

export const Textarea = React.forwardRef(({ name, hint, error, label, children, labelAction, id, ...props }, ref) => {
  return (
    <TextareaWrapper>
      <Field name={name} hint={hint} error={error} id={id}>
        <Stack size={1}>
          <Row cols="auto auto 1fr" gap={1}>
            <FieldLabel>{label}</FieldLabel>
            {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
          </Row>
          <TextareaInput ref={ref} as="textarea" value={children} {...props} />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    </TextareaWrapper>
  );
});

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  children: '',
};

Textarea.propTypes = {
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
};
