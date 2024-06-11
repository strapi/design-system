import * as React from 'react';

import { styled, type CSSProperties, type DefaultTheme } from 'styled-components';

import { handleResponsiveValues, type ResponsiveValue } from '../../helpers/handleResponsiveValues';
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
  background?: ResponsiveValue<'background'>;
  /**
   * Flex basis
   */
  basis?: CSSProperties['flexBasis'];
  /**
   * Border color
   */
  borderColor?: ResponsiveValue<'borderColor'>;
  /**
   * Text color
   */
  color?: ResponsiveValue<'color'>;
  /**
   * Flex
   */
  flex?: CSSProperties['flex'];
  fontSize?: ResponsiveValue<'fontSize'>;
  /**
   * Flex grow
   */
  grow?: CSSProperties['flexGrow'];
  /**
   * If `true`, will add a border radius to the `Box`
   */
  hasRadius?: boolean;
  /**
   * Responsive hiding. If `true`, will the `Box` for medium size screens with max-width:1280px.
   */
  hiddenM?: boolean;
  /**
   * Responsive hiding. If `true`, will the `Box` for small size screens with max-width:768px.
   */
  hiddenS?: boolean;
  /**
   * Responsive hiding. If `true`, will the `Box` for extra small size screens with max-width:520px.
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
  borderRadius?: ResponsiveValue<'borderRadius'>;
  borderStyle?: ResponsiveValue<'borderStyle'>;
  borderWidth?: ResponsiveValue<'borderWidth'>;
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

const getBorderProp = ({ theme, $borderColor, $borderStyle, $borderWidth }) => {
  // This condition prevents borderColor from override the border-color attribute when not passing borderStyle nor borderWidth
  if ($borderColor && !$borderStyle && typeof $borderWidth === 'undefined') {
    if (typeof $borderColor === 'object') {
      const themedValue = Object.keys($borderColor).reduce((acc, key) => {
        acc[key] = `1px solid ${theme.colors[$borderColor[key]]}`;
        return acc;
      }, {});

      return themedValue;
    }

    return `1px solid ${theme.colors[$borderColor]}`;
  }

  return undefined;
};

const generateResponsiveValues = (theme, value) => {
  if (typeof value === 'undefined') {
    return undefined;
  }

  if (typeof value === 'object') {
    const themedValue = Object.keys(value).reduce((acc, key) => {
      acc[key] = extractStyleFromTheme(theme, value[key], value[key]);
      return acc;
    }, {});

    return themedValue;
  }
  return extractStyleFromTheme(theme, value, value);
};

const StyledBox = styled.div<PropsToTransientProps<TransientBoxProps>>`
  ${({ theme, $hiddenM }) =>
    $hiddenM
      ? `${theme.breakpoints.medium} { display: none; } ${theme.breakpoints.large} { display: inherit}`
      : undefined}
  ${({ theme, $hiddenS }) =>
    $hiddenS
      ? `${theme.breakpoints.small} { display: none; } ${theme.breakpoints.medium} { display: inherit}`
      : undefined}
  ${({ theme, $hiddenXS }) =>
    $hiddenXS
      ? `${theme.breakpoints.initial} { display: none; } ${theme.breakpoints.small} { display: inherit}`
      : undefined}

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
    const responsiveProps = ((props) => ({
      padding: props.$padding,
      paddingTop: props.$paddingTop,
      paddingBottom: props.$paddingBottom,
      paddingLeft: props.$paddingLeft,
      paddingRight: props.$paddingRight,
      margin: props.$margin,
      marginTop: props.$marginTop,
      marginBottom: props.$marginBottom,
      marginLeft: props.$marginLeft,
      marginRight: props.$marginRight,
      gap: props.$gap,
      color: generateResponsiveValues(theme.colors, props.$color),
      background: generateResponsiveValues(theme.colors, props.$background),
      'font-size': generateResponsiveValues(theme.fontSizes, props.$fontSize),
      'border-radius': props.$hasRadius ? theme.borderRadius : props.$borderRadius,
      'border-style': props.$borderStyle,
      'border-width': props.$borderWidth,
      'border-color': generateResponsiveValues(theme.colors, props.$borderColor),
      border: getBorderProp({
        theme,
        $borderColor: props.$borderColor,
        $borderStyle: props.$borderStyle,
        $borderWidth: props.$borderWidth,
      }),
    }))(props);

    return handleResponsiveValues(responsiveProps, theme);
  }};
`;

type BoxComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: BoxProps<T>,
) => JSX.Element;

export { Box };
export type { BoxComponent, BoxProps, TransientBoxProps };
