import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BaseCheckbox } from '../BaseCheckbox';
import { Text } from '../Text';
import { Box } from '../Box';

const TextLabel = styled(Text)`
  display: flex;
  align-items: center;
  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  }
`;

export const Checkbox = ({ children, disabled, ...props }) => {
  return (
    <TextLabel as="label" textColor="neutral800" disabled={disabled}>
      <BaseCheckbox disabled={disabled} {...props} />
      <Box paddingLeft={2}>{children}</Box>
    </TextLabel>
  );
};

Checkbox.defaultProps = {
  disabled: false,
};
Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
