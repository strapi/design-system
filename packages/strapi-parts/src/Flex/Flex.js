import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

export const Flex = styled(Box)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
`;

Flex.defaultProps = {
  alignItems: 'center',
  basis: undefined,
  direction: 'row',
  inline: false,
  justifyContent: undefined,
  reverse: false,
  wrap: undefined,
};

Flex.propTypes = {
  alignItems: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.string,
};
