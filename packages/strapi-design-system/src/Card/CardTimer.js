import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';

const CardTimerWrapper = styled(Box)`
  position: absolute;
  bottom: ${({ theme }) => theme.spaces[1]};
  right: ${({ theme }) => theme.spaces[1]};
`;

export const CardTimer = ({ children, ...props }) => (
  <CardTimerWrapper padding={1} background="neutral800" color="neutral0" as="time" hasRadius {...props}>
    <Text small>{children}</Text>
  </CardTimerWrapper>
);

CardTimer.propTypes = {
  children: PropTypes.string.isRequired,
};
