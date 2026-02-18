import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import {
  handleResponsiveValues,
  type ResponsiveProperty,
  type ResponsiveThemeProperty,
} from '../../helpers/handleResponsiveValues';
import { PolymorphicComponentPropsWithRef, PropsToTransientProps } from '../../types';
interface TransientBoxProps {
  /** CSS `pointer-events`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `pointerEvents`
   * <br/>Usage: `<Box pointerEvents="none" />`
   */
  pointerEvents?: ResponsiveProperty<CSSProperties['pointerEvents']>;
  /** CSS `display`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `display`
   * <br/>Usage: `<Box display="flex" />`
   */
  display?: ResponsiveProperty<CSSProperties['display']>;
  /** CSS `position`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `position`
   * <br/>Usage: `<Box position="relative" />`
   */
  position?: ResponsiveProperty<CSSProperties['position']>;
  /** CSS `overflow`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `overflow`
   * <br/>Usage: `<Box overflow="hidden" />`
   */
  overflow?: ResponsiveProperty<CSSProperties['overflow']>;
  /** CSS `cursor`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `cursor`
   * <br/>Usage: `<Box cursor="pointer" />`
   */
  cursor?: ResponsiveProperty<CSSProperties['cursor']>;
  /** CSS `transition`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `transition`
   * <br/>Usage: `<Box transition="all 0.2s ease" />`
   */
  transition?: ResponsiveProperty<CSSProperties['transition']>;
  /** CSS `transform`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `transform`
   * <br/>Usage: `<Box transform="translateY(4px)" />`
   */
  transform?: ResponsiveProperty<CSSProperties['transform']>;
  /** CSS `animation`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `animation`
   * <br/>Usage: `<Box animation="fadeIn 200ms ease" />`
   */
  animation?: ResponsiveProperty<CSSProperties['animation']>;
  /** CSS `text-align`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `textAlign`
   * <br/>Usage: `<Box textAlign="center" />`
   */
  textAlign?: ResponsiveProperty<CSSProperties['textAlign']>;
  /** CSS `text-transform`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `textTransform`
   * <br/>Usage: `<Box textTransform="uppercase" />`
   */
  textTransform?: ResponsiveProperty<CSSProperties['textTransform']>;
  /** CSS `flex`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `flex`
   * <br/>Usage: `<Box flex="1 1 auto" />`
   */
  flex?: ResponsiveProperty<CSSProperties['flex']>;
  /** CSS `flex-grow`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `grow`
   * <br/>Usage: `<Box grow={1} />`
   */
  grow?: ResponsiveProperty<CSSProperties['flexGrow']>;
  /** CSS `flex-basis`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `basis`
   * <br/>Usage: `<Box basis="200px" />`
   */
  basis?: ResponsiveProperty<CSSProperties['flexBasis']>;
  /** CSS `flex-shrink`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `shrink`
   * <br/>Usage: `<Box shrink={0} />`
   */
  shrink?: ResponsiveProperty<CSSProperties['flexShrink']>;
  /** CSS `border-style`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `borderStyle`
   * <br/>Usage: `<Box borderStyle="solid" />`
   */
  borderStyle?: ResponsiveProperty<CSSProperties['borderStyle']>;
  /** CSS `order`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) property for `order`
   * <br/>Usage: `<Box order={1} />`
   */
  order?: ResponsiveProperty<CSSProperties['order']>;
  /**
   * Shorthand Responsive Properties
   */
  /** Theme Shorthand `margin`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `margin`
   * <br/>Usage: `<Box margin={2} />`
   */
  margin?: ResponsiveThemeProperty<'spaces', 'margin'>;
  /** Theme Shorthand `padding`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `padding`
   * <br/>Usage: `<Box padding={2} />`
   */
  padding?: ResponsiveThemeProperty<'spaces', 'padding'>;
  /** Theme `margin-left`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginLeft`
   * <br/>Usage: `<Box marginLeft={2} />`
   */
  marginLeft?: ResponsiveThemeProperty<'spaces', 'marginLeft'>;
  /** Theme `margin-right`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginRight`
   * <br/>Usage: `<Box marginRight={2} />`
   */
  marginRight?: ResponsiveThemeProperty<'spaces', 'marginRight'>;
  /** Theme `margin-top`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginTop`
   * <br/>Usage: `<Box marginTop={2} />`
   */
  marginTop?: ResponsiveThemeProperty<'spaces', 'marginTop'>;
  /** Theme `margin-bottom`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginBottom`
   * <br/>Usage: `<Box marginBottom={2} />`
   */
  marginBottom?: ResponsiveThemeProperty<'spaces', 'marginBottom'>;
  /** Theme Logical `margin-block`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginBlock`
   * <br/>Usage: `<Box marginBlock={2} />`
   */
  marginBlock?: ResponsiveThemeProperty<'spaces', 'marginBlock'>;
  /** Theme Logical `margin-block-start`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginBlockStart`
   * <br/>Usage: `<Box marginBlockStart={2} />`
   */
  marginBlockStart?: ResponsiveThemeProperty<'spaces', 'marginBlockStart'>;
  /** Theme Logical `margin-block-end`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginBlockEnd`
   * <br/>Usage: `<Box marginBlockEnd={2} />`
   */
  marginBlockEnd?: ResponsiveThemeProperty<'spaces', 'marginBlockEnd'>;
  /** Theme Logical `margin-inline`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginInline`
   * <br/>Usage: `<Box marginInline={2} />`
   */
  marginInline?: ResponsiveThemeProperty<'spaces', 'marginInline'>;
  /** Theme Logical `margin-inline-start`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginInlineStart`
   * <br/>Usage: `<Box marginInlineStart={2} />`
   */
  marginInlineStart?: ResponsiveThemeProperty<'spaces', 'marginInlineStart'>;
  /** Theme Logical `margin-inline-end`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `marginInlineEnd`
   * <br/>Usage: `<Box marginInlineEnd={2} />`
   */
  marginInlineEnd?: ResponsiveThemeProperty<'spaces', 'marginInlineEnd'>;
  /** Theme `padding-left`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingLeft`
   * <br/>Usage: `<Box paddingLeft={2} />`
   */
  paddingLeft?: ResponsiveThemeProperty<'spaces', 'paddingLeft'>;
  /** Theme `padding-right`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingRight`
   * <br/>Usage: `<Box paddingRight={2} />`
   */
  paddingRight?: ResponsiveThemeProperty<'spaces', 'paddingRight'>;
  /** Theme `padding-top`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingTop`
   * <br/>Usage: `<Box paddingTop={2} />`
   */
  paddingTop?: ResponsiveThemeProperty<'spaces', 'paddingTop'>;
  /** Theme `padding-bottom`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingBottom`
   * <br/>Usage: `<Box paddingBottom={2} />`
   */
  paddingBottom?: ResponsiveThemeProperty<'spaces', 'paddingBottom'>;
  /** Theme Logical `padding-block`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingBlock`
   * <br/>Usage: `<Box paddingBlock={2} />`
   */
  paddingBlock?: ResponsiveThemeProperty<'spaces', 'paddingBlock'>;
  /** Theme Logical `padding-block-start`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingBlockStart`
   * <br/>Usage: `<Box paddingBlockStart={2} />`
   */
  paddingBlockStart?: ResponsiveThemeProperty<'spaces', 'paddingBlockStart'>;
  /** Theme Logical `padding-block-end`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingBlockEnd`
   * <br/>Usage: `<Box paddingBlockEnd={2} />`
   */
  paddingBlockEnd?: ResponsiveThemeProperty<'spaces', 'paddingBlockEnd'>;
  /** Theme Logical `padding-inline`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingInline`
   * <br/>Usage: `<Box paddingInline={2} />`
   */
  paddingInline?: ResponsiveThemeProperty<'spaces', 'paddingInline'>;
  /** Theme Logical `padding-inline-start`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingInlineStart`
   * <br/>Usage: `<Box paddingInlineStart={2} />`
   */
  paddingInlineStart?: ResponsiveThemeProperty<'spaces', 'paddingInlineStart'>;
  /** Theme Logical `padding-inline-end`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `paddingInlineEnd`
   * <br/>Usage: `<Box paddingInlineEnd={2} />`
   */
  paddingInlineEnd?: ResponsiveThemeProperty<'spaces', 'paddingInlineEnd'>;
  /** Theme `border-radius`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `borderRadius`
   * <br/>Usage: `<Box borderRadius={...} />`
   */
  borderRadius?: ResponsiveThemeProperty<'spaces', 'borderRadius'>;
  /** Theme `border-width`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `borderWidth`
   * <br/>Usage: `<Box borderWidth="1px" />`
   */
  borderWidth?: ResponsiveThemeProperty<'spaces', 'borderWidth'>;
  /** Theme `top`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `top`
   * <br/>Usage: `<Box top="10rem" />`
   */
  top?: ResponsiveThemeProperty<'spaces', 'top'>;
  /** Theme `left`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `left`
   * <br/>Usage: `<Box left="10rem" />`
   */
  left?: ResponsiveThemeProperty<'spaces', 'left'>;
  /** Theme `bottom`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `bottom`
   * <br/>Usage: `<Box bottom="10rem" />`
   */
  bottom?: ResponsiveThemeProperty<'spaces', 'bottom'>;
  /** Theme `right`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `right`
   * <br/>Usage: `<Box right="10rem" />`
   */
  right?: ResponsiveThemeProperty<'spaces', 'right'>;
  /** Theme `width`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `width`
   * <br/>Usage: `<Box width="10rem" />`
   */
  width?: ResponsiveThemeProperty<'spaces', 'width'>;
  /** Theme `height`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `height`
   * <br/>Usage: `<Box height="10rem" />`
   */
  height?: ResponsiveThemeProperty<'spaces', 'height'>;
  /** Theme `max-width`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `maxWidth`
   * <br/>Usage: `<Box maxWidth="10rem" />`
   */
  maxWidth?: ResponsiveThemeProperty<'spaces', 'maxWidth'>;
  /** Theme `min-width`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `minWidth`
   * <br/>Usage: `<Box minWidth="10rem" />`
   */
  minWidth?: ResponsiveThemeProperty<'spaces', 'minWidth'>;
  /** Theme `max-height`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `maxHeight`
   * <br/>Usage: `<Box maxHeight="10rem" />`
   */
  maxHeight?: ResponsiveThemeProperty<'spaces', 'maxHeight'>;
  /** Theme `min-height`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `minHeight`
   * <br/>Usage: `<Box minHeight="10rem" />`
   */
  minHeight?: ResponsiveThemeProperty<'spaces', 'minHeight'>;
  /** Theme color for `border-color`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `borderColor`
   * <br/>Usage: `<Box borderColor="primary600" />`
   * <br/>Theme: [Color](../?path=/docs/foundations-color--docs)
   */
  borderColor?: ResponsiveThemeProperty<'colors', 'borderColor'>;
  /** Theme color for `color`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `color`
   * <br/>Usage: `<Box color="primary600" />`
   * <br/>Theme: [Color](../?path=/docs/foundations-color--docs)
   */
  color?: ResponsiveThemeProperty<'colors', 'color'>;
  /** Theme color for `background`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `background`
   * <br/>Usage: `<Box background="primary600" />`
   * <br/>Theme: [Color](../?path=/docs/foundations-color--docs)
   */
  background?: ResponsiveThemeProperty<'colors', 'background'>;
  /** Theme shadow for `box-shadow`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `shadow`
   * <br/>Usage: `<Box shadow="filterShadow" />`
   * <br/>Theme: [Elevation](../?path=/docs/foundations-elevation--docs)
   */
  shadow?: ResponsiveThemeProperty<'shadows', 'boxShadow'>;
  /** Theme font size for `font-size`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `fontSize`
   * <br/>Usage: `<Box fontSize={2} />`
   * <br/>Theme: [Typography](../?path=/docs/foundations-typography--docs)
   */
  fontSize?: ResponsiveThemeProperty<'fontSizes', 'fontSize'>;
  /** Theme font weight for `font-weight`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `fontWeight`
   * <br/>Usage: `<Box fontWeight="bold" />`
   * <br/>Theme: [Typography](../?path=/docs/foundations-typography--docs)
   */
  fontWeight?: ResponsiveThemeProperty<'fontWeights', 'fontWeight'>;
  /** Theme line height for `line-height`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `lineHeight`
   * <br/>Usage: `<Box lineHeight={2} />`
   * <br/>Theme: [Typography](../?path=/docs/foundations-typography--docs)
   */
  lineHeight?: ResponsiveThemeProperty<'lineHeights', 'lineHeight'>;
  /** Theme z-index for `z-index`
   * <br/>[Responsive](../?path=/docs/foundations-responsive--docs) theme property for `zIndex`
   * <br/>Usage: `<Box zIndex={1} />`
   */
  zIndex?: ResponsiveThemeProperty<'zIndices', 'zIndex'>;
  /** Use theme `borderRadius` when true
   * Usage: `<Box hasRadius />`
   */
  hasRadius?: boolean;
}

type BoxProps<C extends React.ElementType = 'div'> = PolymorphicComponentPropsWithRef<
  C,
  TransientBoxProps & {
    children?: React.ReactNode;
  }
>;

type BoxDocProps = React.ComponentPropsWithoutRef<'div'> &
  TransientBoxProps & {
    tag?: React.ElementType;
  };

const Box = React.forwardRef<HTMLDivElement, BoxDocProps>(
  (
    {
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
    },
    ref,
  ) => {
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
  },
) as BoxComponent;

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
