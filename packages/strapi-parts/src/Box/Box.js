import PropTypes from 'prop-types';
import styled from 'styled-components';
import handleResponsiveSpacing from '../helpers/handleResponsiveSpacing';

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
  ${({ theme, padding }) => handleResponsiveSpacing('padding', padding, theme)}
  ${({ theme, paddingTop }) => handleResponsiveSpacing('padding-top', paddingTop, theme)}
  ${({ theme, paddingRight }) => handleResponsiveSpacing('padding-right', paddingRight, theme)}
  ${({ theme, paddingBottom }) => handleResponsiveSpacing('padding-bottom', paddingBottom, theme)}
  ${({ theme, paddingLeft }) => handleResponsiveSpacing('padding-left', paddingLeft, theme)}

  // Responsive hiding
  ${({ theme, hiddenS }) => (hiddenS ? `${theme.mediaQueries.tablet} { display: none; }` : undefined)}
  ${({ theme, hiddenXS }) => (hiddenXS ? `${theme.mediaQueries.mobile} { display: none; }` : undefined)}
  

  // Borders
  border-radius: ${({ theme, hasRadius }) => (hasRadius ? theme.borderRadius : undefined)};
  border: ${({ theme, borderColor }) => (borderColor ? `1px solid ${theme.colors[borderColor]}` : undefined)};

  // Shadows
  box-shadow: ${({ theme, shadow }) => theme.shadows[shadow]};
`;

Box.displayName = 'Box';

Box.defaultProps = {
  background: undefined,
  borderColor: undefined,
  color: undefined,
  hiddenS: false,
  hiddenXS: false,
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
  borderColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  hasRadius: PropTypes.bool,
  hiddenS: PropTypes.bool,
  hiddenXS: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  shadow: PropTypes.string,
};
