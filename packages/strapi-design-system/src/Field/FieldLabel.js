import React from 'react';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Text } from '../Text';

export const FieldLabel = ({ children }) => {
  const { id } = useField();

  const fieldId = `field-${id}`;

  return (
    <Text textColor="neutral800" htmlFor={fieldId} small={true} highlighted={true} as="label">
      {children}
    </Text>
  );
};

FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
};
