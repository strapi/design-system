import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../../Box';

const BoxRelative = styled(Box)`
  position: relative;
`;

export const NavFooter = ({ children }) => {
  return <BoxRelative>{children}</BoxRelative>;
};

NavFooter.displayName = 'NavFooter';

NavFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
