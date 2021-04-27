import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BaseRadio } from '../BaseRadio/BaseRadio';
import { Text } from '../Text';
import { Box } from '../Box';

const TextLabel = styled(Text)`
  display: flex;
  align-items: center;
`;

export const Radio = ({ children, ...props }) => {
  return (
    <TextLabel as="label" textColor="neutral800">
      <BaseRadio {...props} />
      <Box paddingLeft={2}>{children}</Box>
    </TextLabel>
  );
};

Radio.propTypes = {
  value: PropTypes.any.isRequired,
  children: PropTypes.string.isRequired,
};
