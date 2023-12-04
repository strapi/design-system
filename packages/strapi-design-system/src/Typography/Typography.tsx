import * as React from 'react';

import styled, { DefaultTheme, WebTarget } from 'styled-components';

import { TEXT_VARIANTS } from './constants';
import { ellipsisStyle, variantStyle } from './utils';
import { extractStyleFromTheme } from '../helpers/theme';
import { DefaultThemeOrCSSProp } from '../types';

export type TypographyProps<TElement extends keyof JSX.IntrinsicElements = 'span'> =
  React.ComponentPropsWithoutRef<TElement> & {
    $ellipsis?: boolean;
    $fontSize?: keyof DefaultTheme['fontSizes'];
    $fontWeight?: keyof DefaultTheme['fontWeights'];
    $lineHeight?: DefaultThemeOrCSSProp<'lineHeights', 'lineHeight'>;
    $textAlign?: React.CSSProperties['textAlign'];
    $textColor?: keyof DefaultTheme['colors'];
    $textDecoration?: React.CSSProperties['textDecoration'];
    $textTransform?: React.CSSProperties['textTransform'];
    $variant?: (typeof TEXT_VARIANTS)[number];

    as?: WebTarget;
    forwardedAs?: WebTarget;
  };

export const Typography = styled.span<TypographyProps>`
  ${variantStyle}
  ${ellipsisStyle}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({ theme, $fontWeight }) => extractStyleFromTheme(theme.fontWeights, $fontWeight, undefined)};
  font-size: ${({ theme, $fontSize }) => extractStyleFromTheme(theme.fontSizes, $fontSize, undefined)};
  line-height: ${({ theme, $lineHeight }) => extractStyleFromTheme(theme.lineHeights, $lineHeight, $lineHeight)};
  color: ${({ theme, $textColor }) => theme.colors[$textColor || 'neutral800']};
  text-align: ${({ $textAlign }) => $textAlign};
  text-decoration: ${({ $textDecoration }) => $textDecoration};
  text-transform: ${({ $textTransform }) => $textTransform};
`;
