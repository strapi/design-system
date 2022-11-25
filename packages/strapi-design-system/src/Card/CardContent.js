import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

const BreakBox = styled(Box)`
  word-break: break-all;
`;

export const CardContent = ({ children, ...props }) => {
  return <BreakBox {...props}>{children}</BreakBox>;
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
