import * as React from 'react';

import styled, { CSSProperties, DefaultTheme } from 'styled-components';

import { TEXT_VARIANTS } from './constants';
import { ellipsisStyle, variantStyle } from './utils';
import { extractStyleFromTheme } from '../helpers/theme';
import { DefaultThemeOrCSSProp } from '../types';

const transientProps: Partial<Record<keyof TypographyProps, boolean>> = {
  fontSize: true,
  fontWeight: true,
};

export type TypographyProps<TElement extends keyof JSX.IntrinsicElements = 'span'> =
  React.ComponentPropsWithoutRef<TElement> & {
    as?: string | React.ComponentType<any>;
    forwardedAs?: string | React.ComponentType<any>;
    children?: React.ReactNode;
    ellipsis?: boolean;
    fontSize?: keyof DefaultTheme['fontSizes'];
    fontWeight?: keyof DefaultTheme['fontWeights'];
    lineHeight?: DefaultThemeOrCSSProp<'lineHeights', 'lineHeight'>;
    textAlign?: CSSProperties['textAlign'];
    textColor?: keyof DefaultTheme['colors'];
    textDecoration?: CSSProperties['textDecoration'];
    textTransform?: CSSProperties['textTransform'];
    variant?: (typeof TEXT_VARIANTS)[number];
  };

export const Typography = styled.span.withConfig<TypographyProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof TypographyProps] && defPropValFN(prop),
})`
  ${variantStyle}
  ${ellipsisStyle}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({ theme, fontWeight }) => extractStyleFromTheme(theme.fontWeights, fontWeight, undefined)};
  font-size: ${({ theme, fontSize }) => extractStyleFromTheme(theme.fontSizes, fontSize, undefined)};
  line-height: ${({ theme, lineHeight }) => extractStyleFromTheme(theme.lineHeights, lineHeight, lineHeight)};
  color: ${({ theme, textColor }) => theme.colors[textColor || 'neutral800']};
  text-align: ${({ textAlign }) => textAlign};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-transform: ${({ textTransform }) => textTransform};
`;
