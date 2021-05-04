import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';

const DividerWrapper = styled(Box)`
  height: 1px;
  margin: 0;
  border: none;
`;

export const Divider = (props) => <DividerWrapper {...props} as="hr" />;

/**
 * The background props is implicitly passed to the Box component
 * Make sure to KEEP this line
 */
Divider.defaultProps = {
  background: 'neutral150',
};

Divider.propTypes = {
  background: PropTypes.string,
};
