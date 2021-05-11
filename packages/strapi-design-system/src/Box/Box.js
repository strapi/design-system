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

  // Radius
  border-radius: ${({ theme, hasRadius }) => (hasRadius ? theme.borderRadius : undefined)};

  // Shadows
  box-shadow: ${({ theme, shadow }) => theme.shadows[shadow]};
`;

Box.displayName = 'Box';

Box.defaultProps = {
  background: undefined,
  color: undefined,
  padding: undefined,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  hasRadius: false,
  shadow: undefined,
};

Box.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  hasRadius: PropTypes.bool,
  padding: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  shadow: PropTypes.string,
};
