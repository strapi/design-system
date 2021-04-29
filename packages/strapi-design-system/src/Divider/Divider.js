import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

Divider.defaultProps = {
  color: 'neutral150',
};

Divider.propTypes = {
  color: PropTypes.string,
};
