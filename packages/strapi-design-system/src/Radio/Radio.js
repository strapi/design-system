import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BaseRadio } from '../BaseRadio/BaseRadio';
import { Text } from '../Text';
import { Box } from '../Box';

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Radio = ({ value, id, children }) => {
  return (
    <RadioWrapper>
      <BaseRadio value={value} id={id} />

      <Box paddingLeft={2}>
        <Text htmlFor={value} as="label">
          {children}
        </Text>
      </Box>
    </RadioWrapper>
  );
};

Radio.propTypes = {
  value: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
