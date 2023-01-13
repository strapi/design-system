import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

const DividerWrapper = styled(Box)`
  height: 1px;
  border: none;
  /* If contained in a Flex parent we want to prevent the Divider to shink */
  flex-shrink: 0;
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
