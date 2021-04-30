import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
`;

Row.defaultProps = {
  alignItems: 'center',
  justifyContent: undefined,
  reverse: false,
  wrap: undefined,
};

Row.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.string,
};
