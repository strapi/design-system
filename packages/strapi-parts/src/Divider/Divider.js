import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';

const DividerWrapper = styled(Box)`
  height: 1px;
  border: none;
  ${({ unsetMargin }) => (unsetMargin ? 'margin: 0;' : '')}
`;

export const Divider = ({ unsetMargin, ...props }) => <DividerWrapper {...props} as="hr" unsetMargin={unsetMargin} />;

/**
 * The background props is implicitly passed to the Box component
 * Make sure to KEEP this line
 */
Divider.defaultProps = {
  background: 'neutral150',
  unsetMargin: true,
};

Divider.propTypes = {
  background: PropTypes.string,
  unsetMargin: PropTypes.bool,
};
