import styled, { CSSProperties, DefaultTheme } from 'styled-components';

import { ellipsisStyle, variantStyle, handleColor } from './utils';
import { TEXT_VARIANTS } from './constants';

import { extractStyleFromTheme } from '../helpers/theme';

const transientProps: Partial<Record<keyof TypographyProps, boolean>> = {
  fontSize: true,
  fontWeight: true,
};

export interface TypographyProps {
  as?: string | React.ComponentType<any>;
  forwardedAs?: string | React.ComponentType<any>;
  children?: React.ReactNode;
  ellipsis?: boolean;
  fontSize?: keyof DefaultTheme['fontSizes'];
  fontWeight?: keyof DefaultTheme['fontWeights'];
  lineHeight?: keyof DefaultTheme['lineHeights'];
  textAlign?: CSSProperties['textAlign'];
  textColor?: keyof DefaultTheme['colors'];
  textDecoration?: CSSProperties['textDecoration'];
  textTransform?: CSSProperties['textTransform'];
  variant?: typeof TEXT_VARIANTS[number];
}

export const Typography = styled.span.withConfig<TypographyProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof TypographyProps] && defPropValFN(prop),
})`
  ${variantStyle}
  ${ellipsisStyle}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({ theme, fontWeight }) => extractStyleFromTheme(theme.fontWeights, fontWeight, undefined)};
  font-size: ${({ theme, fontSize }) => extractStyleFromTheme(theme.fontSizes, fontSize, undefined)};
  line-height: ${({ theme, lineHeight }) => extractStyleFromTheme(theme.lineHeights, lineHeight, undefined)};
  color: ${handleColor};
  text-align: ${({ textAlign }) => textAlign};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-transform: ${({ textTransform }) => textTransform};
`;
