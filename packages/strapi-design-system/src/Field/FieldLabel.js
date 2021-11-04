import React from 'react';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Typography } from '../Text';

export const FieldLabel = ({ children, required, ...props }) => {
  const { id } = useField();

  return (
    <Typography
      variant="pi"
      textColor="neutral800"
      htmlFor={id}
      fontWeight="bold"
      as="label"
      required={required}
      {...props}
    >
      {children}
      {required && (
        <Typography textColor="danger600" lineHeight={0}>
          *
        </Typography>
      )}
    </Typography>
  );
};

FieldLabel.defaultProps = {
  required: false,
};
FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};
