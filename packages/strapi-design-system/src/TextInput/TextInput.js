import React, { useImperativeHandle, useRef } from 'react';

import PropTypes from 'prop-types';

import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { sizes } from '../themes/sizes';

export const TextInput = React.forwardRef(
  ({ size, startAction, endAction, name, hint, error, label, labelAction, id, required, ...props }, ref) => {
    const generatedId = useId(id);
    const inputWrapperRef = useRef(null);

    if (!label && !props['aria-label']) {
      throw new Error('The TextInput component needs a "label" or an "aria-label" props');
    }

    useImperativeHandle(ref, () => ({
      inputWrapperRef,
    }));

    return (
      <div ref={inputWrapperRef}>
        <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
          <Flex direction="column" alignItems="stretch" gap={1}>
            {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
            <FieldInput size={size} ref={ref} startAction={startAction} endAction={endAction} {...props} />
            <FieldHint />
            <FieldError />
          </Flex>
        </Field>
      </div>
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
  size: 'M',
  endAction: undefined,
  required: false,
};

TextInput.propTypes = {
  'aria-label': PropTypes.string,
  endAction: PropTypes.element,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
};
