import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  color: true,
};

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  // Colors
  background: ${({ theme, background }) => theme.colors[background]};
  color: ${({ theme, color }) => theme.colors[color]};

  // Spaces
  padding: ${({ theme, padding }) => theme.spaces[padding]};
  padding-top: ${({ theme, paddingTop }) => theme.spaces[paddingTop]};
  padding-right: ${({ theme, paddingRight }) => theme.spaces[paddingRight]};
  padding-bottom: ${({ theme, paddingBottom }) => theme.spaces[paddingBottom]};
  padding-left: ${({ theme, paddingLeft }) => theme.spaces[paddingLeft]};

  // Grid
  grid-area: ${({ area }) => area};
`;

Box.displayName = Box;

Box.defaultProps = {
  background: undefined,
  color: undefined,
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
  padding: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
};
