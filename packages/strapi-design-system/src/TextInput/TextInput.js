import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { sizes } from '../themes/sizes';
import { useId } from '../helpers/useId';

export const TextInput = React.forwardRef(
  ({ size, startAction, endAction, name, hint, error, label, labelAction, id, required, ...props }, ref) => {
    const generatedId = useId('textinput', id);
    const inputWrapperRef = useRef(null);

    if (!label && !props['aria-label']) {
      throw new Error('The TextInput component needs a "label" or an "aria-label" props');
    }

    useImperativeHandle(ref, () => ({
      inputWrapperRef,
    }));

    return (
      <div ref={inputWrapperRef}>
        <Field name={name} hint={hint} error={error} id={generatedId}>
          <Stack spacing={1}>
            {label && (
              <FieldLabel required={required} action={labelAction}>
                {label}
              </FieldLabel>
            )}
            <FieldInput size={size} ref={ref} startAction={startAction} endAction={endAction} {...props} />
            <FieldHint />
            <FieldError />
          </Stack>
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
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
};
