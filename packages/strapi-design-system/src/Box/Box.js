import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Box = styled.div`
  // Colors
  background: ${({ theme, background }) => theme.colors[background]};
  color: ${({ theme, color }) => theme.colors[color]};

  // Spaces
  margin: ${({ theme, margin }) => theme.spaces[margin]};
  margin-top: ${({ theme, marginTop }) => theme.spaces[marginTop]};
  margin-right: ${({ theme, marginRight }) => theme.spaces[marginRight]};
  margin-bottom: ${({ theme, marginBottom }) => theme.spaces[marginBottom]};
  margin-left: ${({ theme, marginLeft }) => theme.spaces[marginLeft]};
  padding: ${({ theme, padding }) => theme.spaces[padding]};
  padding-top: ${({ theme, paddingTop }) => theme.spaces[paddingTop]};
  padding-right: ${({ theme, paddingRight }) => theme.spaces[paddingRight]};
  padding-bottom: ${({ theme, paddingBottom }) => theme.spaces[paddingBottom]};
  padding-left: ${({ theme, paddingLeft }) => theme.spaces[paddingLeft]};
`;

Box.displayName = Box;

Box.defaultProps = {
  background: undefined,
  color: undefined,
  margin: undefined,
  marginTop: undefined,
  marginRight: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  padding: undefined,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  padding: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
};
