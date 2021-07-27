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
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;

export const SubNav = ({ ariaLabel, ...props }) => {
  return <SubNavWrapper aria-label={ariaLabel} as="nav" {...props} />;
};

SubNav.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
};
