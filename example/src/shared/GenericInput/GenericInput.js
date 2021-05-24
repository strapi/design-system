import React from "react";
import PropTypes from "prop-types";
import { TextInput, Checkbox, RadioGroup, Radio } from "@strapi/design-system";

export const GenericInput = ({
  type,
  label,
  name,
  onChange,
  options,
  ...props
}) => {
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

  if (type === "radio") {
    return (
      <RadioGroup
        onChange={(e) => onChange(e.target.value)}
        name={name}
        {...props}
      >
        {options.map((option) => (
          <Radio value={option.value} key={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    );
  }

  return null;
};

GenericInput.defaultProps = {
  label: undefined,
  options: [],
};

GenericInput.propTypes = {
  type: PropTypes.oneOf(["text", "checkbox", "radio"]).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
