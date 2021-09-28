import React from 'react';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Text } from '../Text';

export const FieldLabel = ({ children, required, ...props }) => {
  const { id } = useField();

  return (
    <Text textColor="neutral800" htmlFor={id} small bold as="label" required={required} {...props}>
      {children}
      <Text textColor="danger600">{required && '*'}</Text>
    </Text>
  );
};

FieldLabel.defaultProps = {
  required: false,
};
FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};
