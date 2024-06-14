import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import {
  handleResponsiveValues,
  type ResponsiveProperty,
  type ShorthandResponsiveProperty,
  type IndividualResponsiveProperty,
  type IndividualResponsivePropertyWithNumber,
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
  margin?: ShorthandResponsiveProperty<'spaces'>;
  padding?: ShorthandResponsiveProperty<'spaces'>;

  /**
   * Individual Responsive Properties
   */
  marginLeft?: IndividualResponsiveProperty<'spaces'>;
  marginRight?: IndividualResponsiveProperty<'spaces'>;
  marginTop?: IndividualResponsiveProperty<'spaces'>;
  marginBottom?: IndividualResponsiveProperty<'spaces'>;
  marginBlock?: IndividualResponsiveProperty<'spaces'>;
  marginBlockStart?: IndividualResponsiveProperty<'spaces'>;
  marginBlockEnd?: IndividualResponsiveProperty<'spaces'>;
  marginInline?: IndividualResponsiveProperty<'spaces'>;
  marginInlineStart?: IndividualResponsiveProperty<'spaces'>;
  marginInlineEnd?: IndividualResponsiveProperty<'spaces'>;
  paddingLeft?: IndividualResponsiveProperty<'spaces'>;
  paddingRight?: IndividualResponsiveProperty<'spaces'>;
  paddingTop?: IndividualResponsiveProperty<'spaces'>;
  paddingBottom?: IndividualResponsiveProperty<'spaces'>;
  paddingBlock?: IndividualResponsiveProperty<'spaces'>;
  paddingBlockStart?: IndividualResponsiveProperty<'spaces'>;
  paddingBlockEnd?: IndividualResponsiveProperty<'spaces'>;
  paddingInline?: IndividualResponsiveProperty<'spaces'>;
  paddingInlineStart?: IndividualResponsiveProperty<'spaces'>;
  paddingInlineEnd?: IndividualResponsiveProperty<'spaces'>;
  borderRadius?: IndividualResponsiveProperty<'spaces'>;
  borderWidth?: IndividualResponsiveProperty<'spaces'>;
  top?: IndividualResponsiveProperty<'spaces'>;
  left?: IndividualResponsiveProperty<'spaces'>;
  bottom?: IndividualResponsiveProperty<'spaces'>;
  right?: IndividualResponsiveProperty<'spaces'>;
  width?: IndividualResponsiveProperty<'spaces'>;
  height?: IndividualResponsiveProperty<'spaces'>;
  maxWidth?: IndividualResponsiveProperty<'spaces'>;
  minWidth?: IndividualResponsiveProperty<'spaces'>;
  maxHeight?: IndividualResponsiveProperty<'spaces'>;
  minHeight?: IndividualResponsiveProperty<'spaces'>;
  /**
   * Theme Properties
   */
  borderColor?: IndividualResponsiveProperty<'colors'>;
  color?: IndividualResponsiveProperty<'colors'>;
  background?: IndividualResponsiveProperty<'colors'>;
  shadow?: IndividualResponsiveProperty<'shadows'>;
  fontSize?: IndividualResponsiveProperty<'fontSizes'>;
  fontWeight?: IndividualResponsivePropertyWithNumber<'fontWeights'>;
  lineHeight?: IndividualResponsiveProperty<'lineHeights'>;
  zIndex?: IndividualResponsivePropertyWithNumber<'zIndices'>;
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
      color: props.$color,
      background: props.$background,
      fontSize: props.$fontSize,
      fontWeight: props.$fontWeight,
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
      shadow: props.$shadow,
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
      shrink: props.$shrink,
      grow: props.$grow,
      basis: props.$basis,
    }))(props);

    // @ts-expect-error fix: Type 'symbol' is not assignable to type 'ShorthandResponsiveProperty<"spaces"> | undefined
    return handleResponsiveValues(responsiveProps, theme);
  }};
`;

type BoxComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: BoxProps<T>,
) => JSX.Element;

export { Box };
export type { BoxComponent, BoxProps, TransientBoxProps };
