import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Typography } from '../Typography';

const CardTimerWrapper = styled(Box)`
  position: absolute;
  bottom: ${({ theme }) => theme.spaces[1]};
  right: ${({ theme }) => theme.spaces[1]};
`;

export const CardTimer = ({ children, ...props }) => (
  <CardTimerWrapper padding={1} background="neutral800" color="neutral0" as="time" hasRadius {...props}>
    <Typography variant="pi" textColor="neutral0">
      {children}
    </Typography>
  </CardTimerWrapper>
);

CardTimer.propTypes = {
  children: PropTypes.node.isRequired,
};
