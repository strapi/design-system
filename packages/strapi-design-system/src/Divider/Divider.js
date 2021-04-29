import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';

export const Divider = styled(Box)`
  height: 1px;
`;

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
