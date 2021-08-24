import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

export const Row = styled(Box)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
`;

Row.defaultProps = {
  alignItems: 'center',
  inline: false,
  justifyContent: undefined,
  reverse: false,
  wrap: undefined,
};

Row.propTypes = {
  alignItems: PropTypes.string,
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.string,
};
