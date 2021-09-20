import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  TextInput, // text
  Textarea,
  Select,
  Option,
  DatePicker,
} from "@strapi/parts";

import Wysiwyg from './../shared/Wysiwyg/index';

const Inputs = ({
  name,
  onChange,
  type,
  options,
  value,
  label,
  customInputs,
  ...rest
}) => {
  const C = customInputs[type];

  if (C) {
    return (
      <C
        {...rest}
        label={label}
        name={name}
        onChange={onChange}
        options={options}
        type={type}
        value={value}
      />
    );
  }

  switch (type) {
    case "string":
    case "email":
      const handleChange = ({ target: { name, value } }) => {
        onChange({ name, value });
      };

      return (
        <TextInput
          {...rest}
          name={name}
          onChange={handleChange}
          label={label}
          type={type === "email" ? "email" : "text"}
          value={value || ""}
        />
      );
    case "checkbox": {
      const handleValueChange = (value) => {
        onChange({ name, value });
      };

      return (
        <Checkbox
          {...rest}
          name={name}
          value={value}
          onValueChange={handleValueChange}
        >
          {label}
        </Checkbox>
      );
    }
    case "textarea": {
      const handleChange = ({ target: { name, value } }) => {
        onChange({ name, value });
      };

      return (
        <Textarea onChange={handleChange} {...rest} name={name} label={label}>
          {value}
        </Textarea>
      );
    }
    case "select": {
      const handleChange = (value) => {
        onChange({ name, value });
      };

      const handleClear = () => {
        onChange({ name, value: undefined });
      };

      return (
        <Select
          label={label}
          name={name}
          onChange={handleChange}
          onClear={handleClear}
          placeholder="Select a value..."
          value={value}
          {...rest}
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      );
    }
    case "date": {
      const handleChange = (nextDate) => {
        onChange({ name, value: nextDate });
      };

      return (
        <DatePicker
          onChange={handleChange}
          selectedDate={value}
          label={label}
          name={name}
          selectedDateLabel={(formattedDate) =>
            `Date picker, current is ${formattedDate}`
          }
        />
      );
    }
    case "wysiwyg": {
      const handleChange = (value) => {
        onChange({ name, value });
      };

      return (
        <Wysiwyg
          {...rest}
          label={label}
          name={name}
          onChange={handleChange}
          placeholder='Add a title'
          options={options}
          value={value}
          error='This is a required field'
        />
      )
    }

    default:
      return "Unknown";
  }
};

Inputs.defaultProps = {
  customInputs: {},
};

Inputs.propTypes = {
  customInputs: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default Inputs;
