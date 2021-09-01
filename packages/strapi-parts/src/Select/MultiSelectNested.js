import React from 'react';
import PropTypes from 'prop-types';
import { OptGroup } from './OptGroup';
import { Option } from './Option';
import { Select } from './Select';

export const MultiSelectNested = ({ options, ...props }) => {
  return (
    <Select multi {...props}>
      {options.map(({ label, value, children }) =>
        children ? (
          <OptGroup key={label} label={label}>
            {children?.map((child) => (
              <Option key={child.value} value={child.value}>
                {child.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          <Option key={value} value={value}>
            {label}
          </Option>
        ),
      )}
    </Select>
  );
};

MultiSelectNested.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
