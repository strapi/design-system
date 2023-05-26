import * as React from 'react';

import styled, { CSSProperties, DefaultTheme } from 'styled-components';

import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';
import { extractStyleFromTheme } from '../helpers/theme';

type DefaultThemeOrCSSProp<T extends keyof DefaultTheme, K extends keyof CSSProperties> =
  | keyof DefaultTheme[T]
  | CSSProperties[K];

export type BoxProps<TElement extends keyof JSX.IntrinsicElements = 'div'> = React.ComponentPropsWithoutRef<TElement> &
  Pick<
    CSSProperties,
    | 'pointerEvents'
    | 'display'
    | 'position'
    | 'zIndex'
    | 'overflow'
    | 'cursor'
    | 'transition'
    | 'transform'
    | 'animation'
    | 'textAlign'
    | 'textTransform'
  > & {
    /**
     * JavaScript hover handler
     */
    _hover?: (theme: DefaultTheme) => string;
    /**
     * Background color
     */
    background?: DefaultThemeOrCSSProp<'colors', 'background'>;
    /**
     * Flex basis
     */
    basis?: CSSProperties['flexBasis'];
    /**
     * Border color
     */
    borderColor?: keyof DefaultTheme['colors'];
    /**
     * Text color
     */
    color?: keyof DefaultTheme['colors'];
    /**
     * Flex
     */
    flex?: CSSProperties['flex'];
    fontSize?: DefaultThemeOrCSSProp<'fontSizes', 'fontSize'>;
    /**
     * Flex grow
     */
    grow?: CSSProperties['flexGrow'];
    /**
     * If `true`, will add a border radius to the `Box`
     */
    hasRadius?: boolean;
    /**
     * Responsive hiding. If `true`, will the `Box` for tablet size screens.
     */
    hiddenS?: boolean;
    /**
     * Responsive hiding. If `true`, will the `Box` for mobile size screens.
     */
    hiddenXS?: boolean;
    /**
     * Padding. Supports responsive values
     */
    padding?: ResponsiveValue;
    /**
     * Padding bottom. Supports responsive values
     */
    paddingBottom?: ResponsiveValue;
    /**
     * Padding left. Supports responsive values
     */
    paddingLeft?: ResponsiveValue;
    /**
     * Padding right. Supports responsive values
     */
    paddingRight?: ResponsiveValue;
    /**
     * Padding top. Supports responsive values
     */
    paddingTop?: ResponsiveValue;
    marginLeft?: ResponsiveValue;
    marginBottom?: ResponsiveValue;
    marginRight?: ResponsiveValue;
    marginTop?: ResponsiveValue;
    /**
     * Shadow name (see `theme.shadows`)
     */
    shadow?: keyof DefaultTheme['shadows'];
    /**
     * Flex shrink
     */
    shrink?: CSSProperties['flexShrink'];

    lineHeight?: DefaultThemeOrCSSProp<'lineHeights', 'lineHeight'>;
    width?: DefaultThemeOrCSSProp<'spaces', 'width'>;
    minWidth?: DefaultThemeOrCSSProp<'spaces', 'minWidth'>;
    maxWidth?: DefaultThemeOrCSSProp<'spaces', 'maxWidth'>;
    height?: DefaultThemeOrCSSProp<'spaces', 'height'>;
    minHeight?: DefaultThemeOrCSSProp<'spaces', 'minHeight'>;
    maxHeight?: DefaultThemeOrCSSProp<'spaces', 'maxHeight'>;
    top?: DefaultThemeOrCSSProp<'spaces', 'top'>;
    left?: DefaultThemeOrCSSProp<'spaces', 'left'>;
    bottom?: DefaultThemeOrCSSProp<'spaces', 'bottom'>;
    right?: DefaultThemeOrCSSProp<'spaces', 'right'>;
    borderRadius?: CSSProperties['borderRadius'];
    borderStyle?: CSSProperties['borderStyle'];
    borderWidth?: CSSProperties['borderWidth'];

    children?: React.ReactNode;

    as?: string | React.ComponentType<any>;
    forwardedAs?: string | React.ComponentType<any>;
  };

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps: Partial<Record<keyof BoxProps, boolean>> = {
  color: true,
  cursor: true,
  height: true,
  width: true,
};

export const Box = styled.div.withConfig<BoxProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof BoxProps] && defPropValFN(prop),
})`
  // Font
  font-size: ${({ fontSize, theme }) => extractStyleFromTheme(theme.fontSizes, fontSize, fontSize)};

  // Colors
  background: ${({ theme, background }) => extractStyleFromTheme(theme.colors, background, background)};
  color: ${({ theme, color }) => extractStyleFromTheme(theme.colors, color, undefined)};

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
  border-color: ${({ borderColor, theme }) => extractStyleFromTheme(theme.colors, borderColor, undefined)};
  border: ${({ theme, borderColor, borderStyle, borderWidth }) => {
    // This condition prevents borderColor from override the border-color attribute when not passing borderStyle nor borderWidth
    if (borderColor && !borderStyle && typeof borderWidth === 'undefined') {
      return `1px solid ${theme.colors[borderColor]}`;
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  }};

  // Shadows
  box-shadow: ${({ theme, shadow }) => extractStyleFromTheme(theme.shadows, shadow, undefined)};

  // Handlers
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  &:hover {
    ${({ _hover, theme }) => (_hover ? _hover(theme) : undefined)}
  }

  // Display
  display: ${({ display }) => display};

  // Position
  position: ${({ position }) => position};
  left: ${({ left, theme }) => extractStyleFromTheme(theme.spaces, left, left)};
  right: ${({ right, theme }) => extractStyleFromTheme(theme.spaces, right, right)};
  top: ${({ top, theme }) => extractStyleFromTheme(theme.spaces, top, top)};
  bottom: ${({ bottom, theme }) => extractStyleFromTheme(theme.spaces, bottom, bottom)};
  z-index: ${({ zIndex }) => zIndex};
  overflow: ${({ overflow }) => overflow};

  // Size
  width: ${({ width, theme }) => extractStyleFromTheme(theme.spaces, width, width)};
  max-width: ${({ maxWidth, theme }) => extractStyleFromTheme(theme.spaces, maxWidth, maxWidth)};
  min-width: ${({ minWidth, theme }) => extractStyleFromTheme(theme.spaces, minWidth, minWidth)};
  height: ${({ height, theme }) => extractStyleFromTheme(theme.spaces, height, height)};
  max-height: ${({ maxHeight, theme }) => extractStyleFromTheme(theme.spaces, maxHeight, maxHeight)};
  min-height: ${({ minHeight, theme }) => extractStyleFromTheme(theme.spaces, minHeight, minHeight)};

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
  line-height: ${({ theme, lineHeight }) => extractStyleFromTheme(theme.lineHeights, lineHeight, lineHeight)};

  // Cursor
  cursor: ${({ cursor }) => cursor};
`;
