import PropTypes from 'prop-types';
import React from 'react';
import { Option } from './Option';

export const OptGroup = ({ children, label, ...props }) => {
  const childrenValues = children.map((child) => child.props.value);

  return (
    <>
      <Option
        data-opt-group
        data-opt-group-children={childrenValues}
        aria-label={`${label}, ${children.length} items`}
        {...props}
      >
        {label}
      </Option>
      {children}
    </>
  );
};

OptGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  label: PropTypes.string.isRequired,
};

OptGroup.displayName = 'OptGroup';
