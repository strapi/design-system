import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseRadio } from '../BaseRadio/BaseRadio';
import { Box } from '../Box';
import { Typography } from '../Typography';

const TextLabel = styled(Typography)`
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
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
};
