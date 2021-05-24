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
      <Checkbox id="default" name={name} onValueChange={onChange}>
        {label}
      </Checkbox>
    );
  }

  return <div>hello world</div>;
};

GenericInput.propTypes = {
  type: PropTypes.oneOf(["text", "checkbox"]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
