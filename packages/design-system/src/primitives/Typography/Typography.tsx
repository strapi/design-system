import * as React from 'react';

import { styled, type CSSProperties, type DefaultTheme } from 'styled-components';

import { extractStyleFromTheme } from '../../helpers/theme';
import { ellipsis, variant, type TEXT_VARIANTS } from '../../styles/type';
import {
  DefaultThemeOrCSSProp,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  PropsToTransientProps,
} from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

interface TransientTypographyProps {
  ellipsis?: boolean;
  fontSize?: keyof DefaultTheme['fontSizes'];
  fontWeight?: keyof DefaultTheme['fontWeights'];
  lineHeight?: DefaultThemeOrCSSProp<'lineHeights', 'lineHeight'>;
  textAlign?: CSSProperties['textAlign'];
  textColor?: DefaultThemeOrCSSProp<'colors', 'color'>;
  textDecoration?: CSSProperties['textDecoration'];
  textTransform?: CSSProperties['textTransform'];
  variant?: (typeof TEXT_VARIANTS)[number];
}

type TypographyProps<C extends React.ElementType = 'span'> = Omit<BoxProps<C>, 'ref'> & TransientTypographyProps;

const Typography = forwardRef(
  <C extends React.ElementType = 'span'>(props: TypographyProps<C>, ref: PolymorphicRef<C>) => {
    const {
      ellipsis,
      fontSize,
      fontWeight,
      lineHeight,
      textAlign,
      textColor = 'currentcolor',
      textDecoration,
      textTransform,
      variant,
      ...rest
    } = props;

    const mappedProps: PropsToTransientProps<TransientTypographyProps> = {
      $ellipsis: ellipsis,
      $fontSize: fontSize,
      $fontWeight: fontWeight,
      $lineHeight: lineHeight,
      $textAlign: textAlign,
      $textColor: textColor,
      $textDecoration: textDecoration,
      $textTransform: textTransform,
      $variant: variant,
    };

    return <StyledTypography ref={ref} tag="span" {...mappedProps} {...rest} />;
  },
) as TypographyComponent;

type TypographyComponent<C extends React.ElementType = 'span'> = <T extends React.ElementType = C>(
  props: PolymorphicComponentPropsWithRef<T, TypographyProps<T>>,
) => JSX.Element;

const StyledTypography = styled<BoxComponent<'span'>>(Box)<PropsToTransientProps<TransientTypographyProps>>`
  ${variant}
  ${({ $ellipsis }) => ($ellipsis ? ellipsis : '')}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({ theme, $fontWeight }) => extractStyleFromTheme(theme.fontWeights, $fontWeight, undefined)};
  font-size: ${({ theme, $fontSize }) => extractStyleFromTheme(theme.fontSizes, $fontSize, undefined)};
  line-height: ${({ theme, $lineHeight }) => extractStyleFromTheme(theme.lineHeights, $lineHeight, $lineHeight)};
  color: ${({ theme, $textColor }) => extractStyleFromTheme(theme.colors, $textColor, $textColor)};
  text-align: ${({ $textAlign }) => $textAlign};
  text-decoration: ${({ $textDecoration }) => $textDecoration};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export { Typography };
export type { TypographyProps, TypographyComponent, TransientTypographyProps };
