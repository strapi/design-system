import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TextInput, // text
  Textarea,
  Select,
  Option,
  DatePicker,
} from '@strapi/design-system';

const Inputs = ({ name, onChange, type, value, ...rest }) => {
  switch (type) {
    case 'string':
    case 'email':
      const handleChange = ({ target: { name, value } }) => {
        onChange({ name, value });
      };

      return (
        <TextInput
          {...rest}
          name={name}
          onChange={handleChange}
          type={type === 'email' ? 'email' : 'text'}
          value={value || ''}
        />
      );
    case 'checkbox':
      return <Checkbox {...rest} name={name} />;
    case 'textarea':
      return <Textarea {...rest} name={name} />;
    case 'select':
      return 'TODO ...';
    case 'date':
      // return null;
      return <DatePicker {...rest} />;

    default:
      return 'Unknown';
  }
};

Inputs.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default Inputs;
