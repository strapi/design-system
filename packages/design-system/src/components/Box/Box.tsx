import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import { handleResponsiveValues, type ResponsiveValue } from '../../helpers/handleResponsiveValues';
import { PolymorphicComponentPropsWithRef, PolymorphicRef, PropsToTransientProps } from '../../types';
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
  shadow?: ResponsiveValue<'boxShadow'>;
  /**
   * Flex shrink
   */
  shrink?: CSSProperties['flexShrink'];

  lineHeight?: ResponsiveValue<'lineHeight'>;
  width?: ResponsiveValue<'width'>;
  minWidth?: ResponsiveValue<'minWidth'>;
  maxWidth?: ResponsiveValue<'maxWidth'>;
  height?: ResponsiveValue<'height'>;
  minHeight?: ResponsiveValue<'minHeight'>;
  maxHeight?: ResponsiveValue<'maxHeight'>;
  top?: ResponsiveValue<'top'>;
  left?: ResponsiveValue<'left'>;
  bottom?: ResponsiveValue<'bottom'>;
  right?: ResponsiveValue<'right'>;
  borderRadius?: ResponsiveValue<'borderRadius'>;
  borderStyle?: ResponsiveValue<'borderStyle'>;
  borderWidth?: ResponsiveValue<'borderWidth'>;
  zIndex?: ResponsiveValue<'zIndex'>;
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

const StyledBox = styled.div<PropsToTransientProps<TransientBoxProps>>`
  ${({ theme, ...props }) => {
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
      top: props.$top,
      left: props.$left,
      bottom: props.$bottom,
      right: props.$right,
      width: props.$width,
      minWidth: props.$minWidth,
      maxWidth: props.$maxWidth,
      height: props.$height,
      minHeight: props.$minHeight,
      maxHeight: props.$maxHeight,
      gap: props.$gap,
      color: props.$color,
      background: props.$background,
      fontSize: props.$fontSize,
      lineHeight: props.$lineHeight,
      borderRadius: props.$hasRadius ? theme.borderRadius : props.$borderRadius,
      borderStyle: props.$borderStyle,
      borderWidth: props.$borderWidth,
      borderColor: props.$borderColor,
      border: getBorderProp({
        theme,
        $borderColor: props.$borderColor,
        $borderStyle: props.$borderStyle,
        $borderWidth: props.$borderWidth,
      }),
      zIndex: props.$zIndex,
      boxShadow: props.$shadow,
      display: props.$display,
      pointerEvents: props.$pointerEvents,
      cursor: props.$cursor,
      textAlign: props.$textAlign,
      textTransform: props.$textTransform,
      transition: props.$transition,
      transform: props.$transform,
      animation: props.$animation,
      position: props.$position,
      overflow: props.$overflow,
      flex: props.$flex,
      flexShrink: props.$shrink,
      flexGrow: props.$grow,
      flexBasis: props.$basis,
    }))(props);

    return handleResponsiveValues(responsiveProps, theme);
  }};
`;

type BoxComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: BoxProps<T>,
) => JSX.Element;

export { Box };
export type { BoxComponent, BoxProps, TransientBoxProps };
