import React from 'react';

import PropTypes from 'prop-types';

import { TextareaInput } from './TextareaInput';
import { Field, FieldLabel, FieldHint, FieldError } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';

export const Textarea = React.forwardRef(
  ({ name, hint, error, label, children, labelAction, id, required, ...props }, ref) => {
    const generatedId = useId(id);

    return (
      <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}

          <TextareaInput ref={ref} value={children} {...props} />

          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },
);

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  'aria-label': undefined,
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  children: '',
  required: false,
};

Textarea.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
