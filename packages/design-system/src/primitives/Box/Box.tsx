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
    background,
    basis,
    borderColor,
    color,
    flex,
    fontSize,
    grow,
    hasRadius,
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
    fontWeight,
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
    $fontWeight: fontWeight,
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
  ${({ theme, ...props }) => {
    return handleResponsiveValues(
      {
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
        color: props.$color,
        background: props.$background,
        fontSize: props.$fontSize,
        fontWeight: props.$fontWeight,
        lineHeight: props.$lineHeight,
        borderRadius: props.$hasRadius ? theme.borderRadius : props.$borderRadius,
        borderStyle: props.$borderColor && !props.$borderStyle ? 'solid' : props.$borderStyle,
        borderWidth: props.$borderColor && !props.$borderWidth ? '1px' : props.$borderWidth,
        borderColor: props.$borderColor,
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
