import styled from 'styled-components';
import PropTypes from 'prop-types';

import handleResponsiveValues from '../helpers/handleResponsiveValues';

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
  ${({ theme, padding }) => handleResponsiveValues('padding', padding, theme)}
  ${({ theme, paddingTop }) => handleResponsiveValues('padding-top', paddingTop, theme)}
  ${({ theme, paddingRight }) => handleResponsiveValues('padding-right', paddingRight, theme)}
  ${({ theme, paddingBottom }) => handleResponsiveValues('padding-bottom', paddingBottom, theme)}
  ${({ theme, paddingLeft }) => handleResponsiveValues('padding-left', paddingLeft, theme)}
  ${({ theme, marginLeft }) => handleResponsiveValues('margin-left', marginLeft, theme)}
  ${({ theme, marginRight }) => handleResponsiveValues('margin-right', marginRight, theme)}
  ${({ theme, marginTop }) => handleResponsiveValues('margin-top', marginTop, theme)}
  ${({ theme, marginBottom }) => handleResponsiveValues('margin-bottom', marginBottom, theme)}

  // Responsive hiding
  ${({ theme, hiddenS }) => (hiddenS ? `${theme.mediaQueries.tablet} { display: none; }` : undefined)}
  ${({ theme, hiddenXS }) => (hiddenXS ? `${theme.mediaQueries.mobile} { display: none; }` : undefined)}
  

  // Borders
  border-radius: ${({ theme, hasRadius, borderRadius }) => (hasRadius ? theme.borderRadius : borderRadius)};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  border-color: ${({ borderColor, theme }) => theme.colors[borderColor]};
  border: ${({ theme, borderColor, borderStyle, borderWidth }) => {
    // This condition prevents borderColor from override the border-color attribute when not passing borderStyle nor borderWidth
    if (borderColor && !borderStyle && !borderWidth) {
      return `1px solid ${theme.colors[borderColor]}`;
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  }};

  // Shadows
  box-shadow: ${({ theme, shadow }) => theme.shadows[shadow]};

  // Handlers
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  &:hover {
    ${({ _hover, theme }) => (_hover ? _hover(theme) : undefined)}
  }

  // Display
  display: ${({ display }) => display};

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
  width: ${({ width, theme }) => theme.spaces[width] || width};
  max-width: ${({ maxWidth, theme }) => theme.spaces[maxWidth] || maxWidth};
  min-width: ${({ minWidth, theme }) => theme.spaces[minWidth] || minWidth};
  height: ${({ height, theme }) => theme.spaces[height] || height};
  max-height: ${({ maxHeight, theme }) => theme.spaces[maxHeight] || maxHeight};
  min-height: ${({ minHeight, theme }) => theme.spaces[minHeight] || minHeight};

  // Animation
  transition: ${({ transition }) => transition};
  transform: ${({ transform }) => transform};
  animation: ${({ animation }) => animation};

  //Flexbox children props
  flex-shrink: ${({ shrink }) => shrink};
  flex-grow: ${({ grow }) => grow};
  flex-basis: ${({ basis }) => basis};
  flex: ${({ flex }) => flex};

  // Text
  text-align: ${({ textAlign }) => textAlign};
  text-transform: ${({ textTransform }) => textTransform};
  line-height: ${({ lineHeight }) => lineHeight};

  // Cursor
  cursor: ${({ cursor }) => cursor};
`;

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
  /**
   * JavaScript hover handler
   */
  _hover: PropTypes.func,
  /**
   * Background color
   */
  background: PropTypes.string,
  /**
   * Flex basis
   */
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * Border color
   */
  borderColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Text color
   */
  color: PropTypes.string,
  /**
   * Flex
   */
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * Flex grow
   */
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * If `true`, will add a border radius to the `Box`
   */
  hasRadius: PropTypes.bool,
  /**
   * Responsive hiding. If `true`, will the `Box` for tablet size screens.
   */
  hiddenS: PropTypes.bool,
  /**
   * Responsive hiding. If `true`, will the `Box` for mobile size screens.
   */
  hiddenXS: PropTypes.bool,
  /**
   * Padding. Supports responsive values
   */
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding bottom. Supports responsive values
   */
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding left. Supports responsive values
   */
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding right. Supports responsive values
   */
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding top. Supports responsive values
   */
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Shadow name (see `theme.shadows`)
   */
  shadow: PropTypes.string,
  /**
   * Flex shrink
   */
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
};
