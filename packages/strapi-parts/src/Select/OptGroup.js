import PropTypes from 'prop-types';
import React from 'react';
import { Option } from './Option';

export const OptGroup = ({ children, label, ...props }) => {
  return (
    <>
      <Option {...props}>{label}</Option>
      {children}
    </>
  );
};

OptGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  label: PropTypes.string.isRequired,
};
