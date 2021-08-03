import React from 'react';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Text } from '../Text';

export const FieldLabel = ({ children, ...props }) => {
  const { id } = useField();

  return (
    <Text textColor="neutral800" htmlFor={id} small highlighted as="label" {...props}>
      {children}
    </Text>
  );
};

FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
};
