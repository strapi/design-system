import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';

const BreakBox = styled(Box)`
  word-break: break-all;
`;

export const CardContent = ({ children, ...props }) => {
  return <BreakBox {...props}>{children}</BreakBox>;
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
