import * as React from 'react';

import { styled, type CSSProperties, type DefaultTheme } from 'styled-components';

import { handleResponsiveValues, ResponsiveValue } from '../../helpers/handleResponsiveValues';
import { extractStyleFromTheme } from '../../helpers/theme';
import {
  DefaultThemeOrCSSProp,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  PropsToTransientProps,
} from '../../types';
import { forwardRef } from '../../utilities/forwardRef';

interface TransientBoxProps
  extends Pick<
    CSSProperties,
    | 'alignItems'
    | 'justifyContent'
    | 'flexDirection'
    | 'gap'
    | 'flexWrap'
    | 'pointerEvents'
    | 'display'
    | 'position'
    | 'overflow'
    | 'cursor'
    | 'transition'
    | 'transform'
    | 'animation'
    | 'textAlign'
    | 'textTransform'
  > {
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
  color?: DefaultThemeOrCSSProp<'colors', 'color'>;
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
  padding?: ResponsiveValue<'padding'>;
  /**
   * Padding bottom. Supports responsive values
   */
  paddingBottom?: ResponsiveValue<'paddingBottom'>;
  /**
   * Padding left. Supports responsive values
   */
  paddingLeft?: ResponsiveValue<'paddingLeft'>;
  /**
   * Padding right. Supports responsive values
   */
  paddingRight?: ResponsiveValue<'paddingRight'>;
  /**
   * Padding top. Supports responsive values
   */
  paddingTop?: ResponsiveValue<'paddingTop'>;
  /**
   * Margin. Supports responsive values
   */
  margin?: ResponsiveValue<'margin'>;
  marginLeft?: ResponsiveValue<'marginLeft'>;
  marginBottom?: ResponsiveValue<'marginBottom'>;
  marginRight?: ResponsiveValue<'marginRight'>;
  marginTop?: ResponsiveValue<'marginTop'>;
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
  zIndex?: DefaultThemeOrCSSProp<'zIndicies', 'zIndex'>;
}

type BoxProps<C extends React.ElementType = 'div'> = PolymorphicComponentPropsWithRef<
  C,
  TransientBoxProps & {
    children?: React.ReactNode;
  }
>;

const Box = forwardRef(<C extends React.ElementType = 'div'>(props: BoxProps<C>, ref: PolymorphicRef<C>) => {
  const {
    background,
    basis,
    borderColor,
    color,
    flex,
    fontSize,
    grow,
    hasRadius,
    hiddenS,
    hiddenXS,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    margin,
    marginLeft,
    marginBottom,
    marginRight,
    marginTop,
    shadow,
    shrink,
    lineHeight,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    top,
    left,
    bottom,
    right,
    borderRadius,
    borderStyle,
    borderWidth,
    tag,
    pointerEvents,
    display,
    position,
    zIndex,
    overflow,
    cursor,
    transition,
    transform,
    animation,
    textAlign,
    textTransform,
    ...rest
  } = props;

  const AsComponent = tag || 'div';

  const mappedProps: PropsToTransientProps<TransientBoxProps> = {
    $background: background,
    $basis: basis,
    $borderColor: borderColor,
    $color: color,
    $flex: flex,
    $fontSize: fontSize,
    $grow: grow,
    $hasRadius: hasRadius,
    $hiddenS: hiddenS,
    $hiddenXS: hiddenXS,
    $padding: padding,
    $paddingBottom: paddingBottom,
    $paddingLeft: paddingLeft,
    $paddingRight: paddingRight,
    $paddingTop: paddingTop,
    $margin: margin,
    $marginLeft: marginLeft,
    $marginBottom: marginBottom,
    $marginRight: marginRight,
    $marginTop: marginTop,
    $shadow: shadow,
    $shrink: shrink,
    $lineHeight: lineHeight,
    $width: width,
    $minWidth: minWidth,
    $maxWidth: maxWidth,
    $height: height,
    $minHeight: minHeight,
    $maxHeight: maxHeight,
    $top: top,
    $left: left,
    $bottom: bottom,
    $right: right,
    $borderRadius: borderRadius,
    $borderStyle: borderStyle,
    $borderWidth: borderWidth,
    $pointerEvents: pointerEvents,
    $display: display,
    $position: position,
    $zIndex: zIndex,
    $overflow: overflow,
    $cursor: cursor,
    $transition: transition,
    $transform: transform,
    $animation: animation,
    $textAlign: textAlign,
    $textTransform: textTransform,
  };

  return <StyledBox as={AsComponent} ref={ref} {...mappedProps} {...rest} />;
}) as BoxComponent;

const StyledBox = styled.div<PropsToTransientProps<TransientBoxProps>>`
  // Font
  font-size: ${({ $fontSize, theme }) => extractStyleFromTheme(theme.fontSizes, $fontSize, $fontSize)};

  // Colors
  background: ${({ theme, $background }) => extractStyleFromTheme(theme.colors, $background, $background)};
  color: ${({ theme, $color }) => extractStyleFromTheme(theme.colors, $color, $color)};

  // Responsive hiding
  ${({ theme, $hiddenS }) => ($hiddenS ? `${theme.mediaQueries.tablet} { display: none; }` : undefined)}
  ${({ theme, $hiddenXS }) => ($hiddenXS ? `${theme.mediaQueries.mobile} { display: none; }` : undefined)}
  

  // Borders
  border-radius: ${({ theme, $hasRadius, $borderRadius }) => ($hasRadius ? theme.borderRadius : $borderRadius)};
  border-style: ${({ $borderStyle }) => $borderStyle};
  border-width: ${({ $borderWidth }) => $borderWidth};
  border-color: ${({ $borderColor, theme }) => extractStyleFromTheme(theme.colors, $borderColor, undefined)};
  border: ${({ theme, $borderColor, $borderStyle, $borderWidth }) => {
    // This condition prevents borderColor from override the border-color attribute when not passing borderStyle nor borderWidth
    if ($borderColor && !$borderStyle && typeof $borderWidth === 'undefined') {
      return `1px solid ${theme.colors[$borderColor]}`;
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  }};

  // Shadows
  box-shadow: ${({ theme, $shadow }) => extractStyleFromTheme(theme.shadows, $shadow, undefined)};

  // Handlers
  pointer-events: ${({ $pointerEvents }) => $pointerEvents};

  // Display
  display: ${({ $display }) => $display};

  // Position
  position: ${({ $position }) => $position};
  left: ${({ $left, theme }) => extractStyleFromTheme(theme.spaces, $left, $left)};
  right: ${({ $right, theme }) => extractStyleFromTheme(theme.spaces, $right, $right)};
  top: ${({ $top, theme }) => extractStyleFromTheme(theme.spaces, $top, $top)};
  bottom: ${({ $bottom, theme }) => extractStyleFromTheme(theme.spaces, $bottom, $bottom)};
  z-index: ${({ $zIndex, theme }) => extractStyleFromTheme(theme.zIndices, $zIndex, $zIndex)};
  overflow: ${({ $overflow }) => $overflow};

  // Size
  width: ${({ $width, theme }) => extractStyleFromTheme(theme.spaces, $width, $width)};
  max-width: ${({ $maxWidth, theme }) => extractStyleFromTheme(theme.spaces, $maxWidth, $maxWidth)};
  min-width: ${({ $minWidth, theme }) => extractStyleFromTheme(theme.spaces, $minWidth, $minWidth)};
  height: ${({ $height, theme }) => extractStyleFromTheme(theme.spaces, $height, $height)};
  max-height: ${({ $maxHeight, theme }) => extractStyleFromTheme(theme.spaces, $maxHeight, $maxHeight)};
  min-height: ${({ $minHeight, theme }) => extractStyleFromTheme(theme.spaces, $minHeight, $minHeight)};

  // Animation
  transition: ${({ $transition }) => $transition};
  transform: ${({ $transform }) => $transform};
  animation: ${({ $animation }) => $animation};

  //Flexbox children props
  flex-shrink: ${({ $shrink }) => $shrink};
  flex-grow: ${({ $grow }) => $grow};
  flex-basis: ${({ $basis }) => $basis};
  flex: ${({ $flex }) => $flex};

  // Text
  text-align: ${({ $textAlign }) => $textAlign};
  text-transform: ${({ $textTransform }) => $textTransform};
  line-height: ${({ theme, $lineHeight }) => extractStyleFromTheme(theme.lineHeights, $lineHeight, $lineHeight)};

  // Cursor
  cursor: ${({ $cursor }) => $cursor};

  ${({ theme, ...props }) => {
    // Get only the responsive values from the props
    const responsiveProps = (({
      $padding,
      $paddingTop,
      $paddingBottom,
      $paddingLeft,
      $paddingRight,
      $margin,
      $marginTop,
      $marginBottom,
      $marginLeft,
      $marginRight,
      $gap,
    }) => ({
      padding: $padding,
      paddingTop: $paddingTop,
      paddingBottom: $paddingBottom,
      paddingLeft: $paddingLeft,
      paddingRight: $paddingRight,
      margin: $margin,
      marginTop: $marginTop,
      marginBottom: $marginBottom,
      marginLeft: $marginLeft,
      marginRight: $marginRight,
      gap: $gap,
    }))(props);

    return handleResponsiveValues(responsiveProps, theme);
  }};
`;

type BoxComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: BoxProps<T>,
) => JSX.Element;

export { Box };
export type { BoxComponent, BoxProps, TransientBoxProps };
