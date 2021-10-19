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
  // Font
  font-size: ${({ fontSize, theme }) => theme.fontSizes[fontSize] || fontSize};

  // Colors
  background: ${({ theme, background }) => theme.colors[background]};
  color: ${({ theme, color }) => theme.colors[color]};

  // Spaces
  ${({ theme, padding }) => handleResponsiveSpacing('padding', padding, theme)}
  ${({ theme, paddingTop }) => handleResponsiveSpacing('padding-top', paddingTop, theme)}
  ${({ theme, paddingRight }) => handleResponsiveSpacing('padding-right', paddingRight, theme)}
  ${({ theme, paddingBottom }) => handleResponsiveSpacing('padding-bottom', paddingBottom, theme)}
  ${({ theme, paddingLeft }) => handleResponsiveSpacing('padding-left', paddingLeft, theme)}
  ${({ theme, marginLeft }) => handleResponsiveSpacing('margin-left', marginLeft, theme)}
  ${({ theme, marginRight }) => handleResponsiveSpacing('margin-right', marginRight, theme)}
  ${({ theme, marginTop }) => handleResponsiveSpacing('margin-top', marginTop, theme)}
  ${({ theme, marginBottom }) => handleResponsiveSpacing('margin-bottom', marginBottom, theme)}

  // Responsive hiding
  ${({ theme, hiddenS }) => (hiddenS ? `${theme.mediaQueries.tablet} { display: none; }` : undefined)}
  ${({ theme, hiddenXS }) => (hiddenXS ? `${theme.mediaQueries.mobile} { display: none; }` : undefined)}
  

  // Borders
  border-radius: ${({ theme, hasRadius }) => (hasRadius ? theme.borderRadius : undefined)};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  border-color: ${({ borderColor, theme }) => theme.colors[borderColor]};
  border: ${({ theme, borderColor, borderStyle, borderWidth }) => {
    // This condition prevents borderColor from override the border-color attribute when not passing borderStyle nor borderWidth
    if (borderColor && !borderStyle && !borderWidth) {
      return `1px solid ${theme.colors[borderColor]}`;
    }

    return undefined;
  }};

  // Shadows
  box-shadow: ${({ theme, shadow }) => theme.shadows[shadow]};

  // Handlers
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  &:hover {
    ${({ _hover, theme }) => (_hover ? _hover(theme) : undefined)}
  }

  // Position
  position: ${({ position }) => position};
  left: ${({ left, theme }) => theme.spaces[left] || left};
  right: ${({ right, theme }) => theme.spaces[right] || right};
  top: ${({ top, theme }) => theme.spaces[top] || top};
  bottom: ${({ bottom, theme }) => theme.spaces[bottom] || bottom};
  z-index: ${({ zIndex }) => zIndex};
  overflow: ${({ overflow }) => overflow};
  cursor: ${({ cursor }) => cursor};

  // Size
  width: ${({ width, theme }) => theme.sizes[width] || width};
  max-width: ${({ maxWidth, theme }) => theme.sizes[maxWidth] || maxWidth};
  min-width: ${({ minWidth, theme }) => theme.sizes[minWidth] || minWidth};
  height: ${({ height, theme }) => theme.sizes[height] || height};
  max-height: ${({ maxHeight, theme }) => theme.sizes[maxHeight] || maxHeight};
  min-height: ${({ minHeight, theme }) => theme.sizes[minHeight] || minHeight};

  // Animation
  transition: ${({ transition }) => transition};
  animation: ${({ animation }) => animation};

  //Flexbox children props
  flex-shrink: ${({ shrink }) => shrink};
  flex-grow: ${({ grow }) => grow};
  flex-basis: ${({ basis }) => basis};
  flex: ${({ flex }) => flex};
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
  children: null,
  shrink: undefined,
  grow: undefined,
  basis: undefined,
  flex: undefined,
  _hover: () => undefined,
};

Box.propTypes = {
  _hover: PropTypes.func,
  background: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  borderColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  color: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  hasRadius: PropTypes.bool,
  hiddenS: PropTypes.bool,
  hiddenXS: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  shadow: PropTypes.string,
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
};
