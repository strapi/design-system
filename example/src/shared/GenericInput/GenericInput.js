import React from "react";
import PropTypes from "prop-types";
import { TextInput, Checkbox } from "@strapi/design-system";

export const GenericInput = ({ type, label, name, onChange, ...props }) => {
  if (type === "text") {
    return (
      <TextInput
        type={type}
        name={name}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <Checkbox name={name} onValueChange={onChange} {...props}>
        {label}
      </Checkbox>
    );
  }

  return null;
};

GenericInput.propTypes = {
  type: PropTypes.oneOf(["text", "checkbox"]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
