import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import {
  handleResponsiveValues,
  type ResponsiveProperty,
  type ResponsiveThemeProperty,
} from '../../helpers/handleResponsiveValues';
import { PolymorphicComponentPropsWithRef, PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';

interface TransientBoxProps {
  /**
   * CSS Properties
   */
  pointerEvents?: ResponsiveProperty<CSSProperties['pointerEvents']>;
  display?: ResponsiveProperty<CSSProperties['display']>;
  position?: ResponsiveProperty<CSSProperties['position']>;
  overflow?: ResponsiveProperty<CSSProperties['overflow']>;
  cursor?: ResponsiveProperty<CSSProperties['cursor']>;
  transition?: ResponsiveProperty<CSSProperties['transition']>;
  transform?: ResponsiveProperty<CSSProperties['transform']>;
  animation?: ResponsiveProperty<CSSProperties['animation']>;
  textAlign?: ResponsiveProperty<CSSProperties['textAlign']>;
  textTransform?: ResponsiveProperty<CSSProperties['textTransform']>;
  flex?: ResponsiveProperty<CSSProperties['flex']>;
  grow?: ResponsiveProperty<CSSProperties['flexGrow']>;
  basis?: ResponsiveProperty<CSSProperties['flexBasis']>;
  shrink?: ResponsiveProperty<CSSProperties['flexShrink']>;
  borderStyle?: ResponsiveProperty<CSSProperties['borderStyle']>;
  order?: ResponsiveProperty<CSSProperties['order']>;
  /**
   * Shorthand Responsive Properties
   */
  margin?: ResponsiveThemeProperty<'spaces', 'margin'>;
  padding?: ResponsiveThemeProperty<'spaces', 'padding'>;

  /**
   * Individual Responsive Properties
   */
  marginLeft?: ResponsiveThemeProperty<'spaces', 'marginLeft'>;
  marginRight?: ResponsiveThemeProperty<'spaces', 'marginRight'>;
  marginTop?: ResponsiveThemeProperty<'spaces', 'marginTop'>;
  marginBottom?: ResponsiveThemeProperty<'spaces', 'marginBottom'>;
  marginBlock?: ResponsiveThemeProperty<'spaces', 'marginBlock'>;
  marginBlockStart?: ResponsiveThemeProperty<'spaces', 'marginBlockStart'>;
  marginBlockEnd?: ResponsiveThemeProperty<'spaces', 'marginBlockEnd'>;
  marginInline?: ResponsiveThemeProperty<'spaces', 'marginInline'>;
  marginInlineStart?: ResponsiveThemeProperty<'spaces', 'marginInlineStart'>;
  marginInlineEnd?: ResponsiveThemeProperty<'spaces', 'marginInlineEnd'>;
  paddingLeft?: ResponsiveThemeProperty<'spaces', 'paddingLeft'>;
  paddingRight?: ResponsiveThemeProperty<'spaces', 'paddingRight'>;
  paddingTop?: ResponsiveThemeProperty<'spaces', 'paddingTop'>;
  paddingBottom?: ResponsiveThemeProperty<'spaces', 'paddingBottom'>;
  paddingBlock?: ResponsiveThemeProperty<'spaces', 'paddingBlock'>;
  paddingBlockStart?: ResponsiveThemeProperty<'spaces', 'paddingBlockStart'>;
  paddingBlockEnd?: ResponsiveThemeProperty<'spaces', 'paddingBlockEnd'>;
  paddingInline?: ResponsiveThemeProperty<'spaces', 'paddingInline'>;
  paddingInlineStart?: ResponsiveThemeProperty<'spaces', 'paddingInlineStart'>;
  paddingInlineEnd?: ResponsiveThemeProperty<'spaces', 'paddingInlineEnd'>;
  borderRadius?: ResponsiveThemeProperty<'spaces', 'borderRadius'>;
  borderWidth?: ResponsiveThemeProperty<'spaces', 'borderWidth'>;
  top?: ResponsiveThemeProperty<'spaces', 'top'>;
  left?: ResponsiveThemeProperty<'spaces', 'left'>;
  bottom?: ResponsiveThemeProperty<'spaces', 'bottom'>;
  right?: ResponsiveThemeProperty<'spaces', 'right'>;
  width?: ResponsiveThemeProperty<'spaces', 'width'>;
  height?: ResponsiveThemeProperty<'spaces', 'height'>;
  maxWidth?: ResponsiveThemeProperty<'spaces', 'maxWidth'>;
  minWidth?: ResponsiveThemeProperty<'spaces', 'minWidth'>;
  maxHeight?: ResponsiveThemeProperty<'spaces', 'maxHeight'>;
  minHeight?: ResponsiveThemeProperty<'spaces', 'minHeight'>;
  /**
   * Theme Properties
   */
  borderColor?: ResponsiveThemeProperty<'colors', 'borderColor'>;
  color?: ResponsiveThemeProperty<'colors', 'color'>;
  background?: ResponsiveThemeProperty<'colors', 'background'>;
  shadow?: ResponsiveThemeProperty<'shadows', 'boxShadow'>;
  fontSize?: ResponsiveThemeProperty<'fontSizes', 'fontSize'>;
  fontWeight?: ResponsiveThemeProperty<'fontWeights', 'fontWeight'>;
  lineHeight?: ResponsiveThemeProperty<'lineHeights', 'lineHeight'>;
  zIndex?: ResponsiveThemeProperty<'zIndices', 'zIndex'>;
  hasRadius?: boolean;
}

type BoxProps<C extends React.ElementType = 'div'> = PolymorphicComponentPropsWithRef<
  C,
  TransientBoxProps & {
    children?: React.ReactNode;
  }
>;

const Box = forwardRef(<C extends React.ElementType = 'div'>(props: BoxProps<C>, ref: PolymorphicRef<C>) => {
  const {
    animation,
    background,
    basis,
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    bottom,
    color,
    cursor,
    display,
    flex,
    fontSize,
    fontWeight,
    grow,
    hasRadius,
    height,
    left,
    lineHeight,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    order,
    overflow,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    pointerEvents,
    position,
    right,
    shadow,
    shrink,
    tag,
    textAlign,
    textTransform,
    top,
    transform,
    transition,
    width,
    zIndex,
    ...rest
  } = props;

  const AsComponent = tag || 'div';

  const mappedProps: PropsToTransientProps<TransientBoxProps> = {
    $animation: animation,
    $background: background,
    $basis: basis,
    $borderColor: borderColor,
    $borderRadius: borderRadius,
    $borderStyle: borderStyle,
    $borderWidth: borderWidth,
    $bottom: bottom,
    $color: color,
    $cursor: cursor,
    $display: display,
    $flex: flex,
    $fontSize: fontSize,
    $fontWeight: fontWeight,
    $grow: grow,
    $hasRadius: hasRadius,
    $height: height,
    $left: left,
    $lineHeight: lineHeight,
    $margin: margin,
    $marginBottom: marginBottom,
    $marginLeft: marginLeft,
    $marginRight: marginRight,
    $marginTop: marginTop,
    $maxHeight: maxHeight,
    $maxWidth: maxWidth,
    $minHeight: minHeight,
    $minWidth: minWidth,
    $order: order,
    $overflow: overflow,
    $padding: padding,
    $paddingBottom: paddingBottom,
    $paddingLeft: paddingLeft,
    $paddingRight: paddingRight,
    $paddingTop: paddingTop,
    $pointerEvents: pointerEvents,
    $position: position,
    $right: right,
    $shadow: shadow,
    $shrink: shrink,
    $textAlign: textAlign,
    $textTransform: textTransform,
    $top: top,
    $transform: transform,
    $transition: transition,
    $width: width,
    $zIndex: zIndex,
  };

  return <StyledBox as={AsComponent} ref={ref} {...mappedProps} {...rest} />;
}) as BoxComponent;

const StyledBox = styled.div<PropsToTransientProps<TransientBoxProps>>`
  ${({ theme, ...props }) => {
    return handleResponsiveValues(
      {
        animation: props.$animation,
        background: props.$background,
        borderColor: props.$borderColor,
        borderRadius: props.$hasRadius ? theme.borderRadius : props.$borderRadius,
        borderStyle: props.$borderColor && !props.$borderStyle ? 'solid' : props.$borderStyle,
        borderWidth: props.$borderColor && !props.$borderWidth ? '1px' : props.$borderWidth,
        bottom: props.$bottom,
        boxShadow: props.$shadow,
        color: props.$color,
        cursor: props.$cursor,
        display: props.$display,
        flex: props.$flex,
        flexBasis: props.$basis,
        flexGrow: props.$grow,
        flexShrink: props.$shrink,
        fontSize: props.$fontSize,
        fontWeight: props.$fontWeight,
        height: props.$height,
        left: props.$left,
        lineHeight: props.$lineHeight,
        margin: props.$margin,
        marginBottom: props.$marginBottom,
        marginLeft: props.$marginLeft,
        marginRight: props.$marginRight,
        marginTop: props.$marginTop,
        maxHeight: props.$maxHeight,
        maxWidth: props.$maxWidth,
        minHeight: props.$minHeight,
        minWidth: props.$minWidth,
        order: props.$order,
        overflow: props.$overflow,
        padding: props.$padding,
        paddingBottom: props.$paddingBottom,
        paddingLeft: props.$paddingLeft,
        paddingRight: props.$paddingRight,
        paddingTop: props.$paddingTop,
        pointerEvents: props.$pointerEvents,
        position: props.$position,
        right: props.$right,
        textAlign: props.$textAlign,
        textTransform: props.$textTransform,
        top: props.$top,
        transform: props.$transform,
        transition: props.$transition,
        width: props.$width,
        zIndex: props.$zIndex,
      },
      theme,
    );
  }};
`;

type BoxComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: BoxProps<T>,
) => JSX.Element;

export { Box };
export type { BoxComponent, BoxProps, TransientBoxProps };
