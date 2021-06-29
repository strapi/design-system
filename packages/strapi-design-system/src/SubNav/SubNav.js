import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '../Grid';

const SubNavWrapper = styled(Grid)`
  width: ${232 / 16}rem;
  background: ${({ theme }) => theme.colors.neutral100};
  height: 100%;
  position: relative;
  overflow-y: auto;
`;

export const SubNav = ({ condensed, ...props }) => {
  return <SubNavWrapper as="nav" rows="auto auto 1fr auto auto" condensed={condensed} {...props} />;
};

SubNav.defaultProps = {
  condensed: false,
};

SubNav.propTypes = {
  condensed: PropTypes.bool,
};
