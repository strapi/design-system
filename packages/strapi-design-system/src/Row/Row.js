import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => reverse};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
`;

Row.defaultProps = {
  reverse: false,
  justifyContent: undefined,
  alignItems: 'center',
  wrap: undefined,
};

Row.propTypes = {
  reverse: PropTypes.bool,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  wrap: PropTypes.string,
};
