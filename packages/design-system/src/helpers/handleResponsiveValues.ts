import * as React from 'react';

import { DefaultTheme, type CSSProperties } from 'styled-components';

import { extractStyleFromTheme } from './theme';

type Breakpoint = 'initial' | 'small' | 'medium' | 'large';

type ResponsiveProperty<T> =
  | {
      [key in Breakpoint]?: T;
    }
  | T;

// shorthand Responsive property ex: padding, marging, etc
type ShorthandResponsiveProperty<ThemeProperty extends keyof DefaultTheme> = ResponsiveProperty<
  string | keyof DefaultTheme[ThemeProperty] | Array<string | keyof DefaultTheme[ThemeProperty]>
>;
// Individual Responsive property ex: padding-top, margin-left, etc
type IndividualResponsiveProperty<ThemeProperty extends keyof DefaultTheme> = ResponsiveProperty<
  string | keyof DefaultTheme[ThemeProperty]
>;

type IndividualResponsivePropertyWithNumber<ThemeProperty extends keyof DefaultTheme> = ResponsiveProperty<
  number | string | keyof DefaultTheme[ThemeProperty]
>;

type ResponsiveProps = {
  flexWrap?: ResponsiveProperty<CSSProperties['flexWrap']>;
  pointerEvents?: ResponsiveProperty<React.CSSProperties['pointerEvents']>;
  display?: ResponsiveProperty<CSSProperties['display']>;
  position?: ResponsiveProperty<React.CSSProperties['position']>;
  overflow?: ResponsiveProperty<CSSProperties['overflow']>;
  cursor?: ResponsiveProperty<CSSProperties['cursor']>;
  transition?: ResponsiveProperty<CSSProperties['transition']>;
  transform?: ResponsiveProperty<CSSProperties['transform']>;
  animation?: ResponsiveProperty<CSSProperties['animation']>;
  textAlign?: ResponsiveProperty<React.CSSProperties['textAlign']>;
  textTransform?: ResponsiveProperty<CSSProperties['textTransform']>;
  flex?: ResponsiveProperty<CSSProperties['flex']>;
  grow?: ResponsiveProperty<CSSProperties['flexGrow']>;
  basis?: ResponsiveProperty<CSSProperties['flexBasis']>;
  shrink?: ResponsiveProperty<CSSProperties['flexShrink']>;
  borderStyle?: ResponsiveProperty<CSSProperties['borderStyle']>;
  margin?: ShorthandResponsiveProperty<'spaces'>;
  padding?: ShorthandResponsiveProperty<'spaces'>;
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
  borderColor?: IndividualResponsiveProperty<'colors'>;
  gap?: IndividualResponsiveProperty<'spaces'>;
  color?: IndividualResponsiveProperty<'colors'>;
  background?: IndividualResponsiveProperty<'colors'>;
  shadow?: IndividualResponsiveProperty<'shadows'>;
  fontSize?: IndividualResponsiveProperty<'fontSizes'>;
  fontWeight?: IndividualResponsivePropertyWithNumber<'fontWeights'>;
  lineHeight?: IndividualResponsiveProperty<'lineHeights'>;
  zIndex?: IndividualResponsivePropertyWithNumber<'zIndices'>;
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
};

const mappedCSSProps = {
  padding: ['padding-block-start', 'padding-inline-end', 'padding-block-end', 'padding-inline-start'],
  paddingTop: 'padding-block-start',
  paddingRight: 'padding-inline-end',
  paddingBottom: 'padding-block-end',
  paddingLeft: 'padding-inline-start',
  margin: ['margin-block-start', 'margin-inline-end', 'margin-block-end', 'margin-inline-start'],
  marginLeft: 'margin-inline-start',
  marginRight: 'margin-inline-end',
  marginTop: 'margin-block-start',
  marginBottom: 'margin-block-end',
  borderRadius: 'border-radius',
  borderStyle: 'border-style',
  borderWidth: 'border-width',
  borderColor: 'border-color',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  lineHeight: 'line-height',
  zIndex: 'z-index',
  shadow: 'box-shadow',
  pointerEvents: 'pointer-events',
  textAlign: 'text-align',
  textTransform: 'text-transform',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: 'flex-basis',
  minWidth: 'min-width',
  maxWidth: 'max-width',
  minHeight: 'min-height',
  maxHeight: 'max-height',
};

/**
 * Fills the shorthand CSS properties with their corresponding logical properties
 * @param value An array of CSS values for shorthand properties
 * @returns An array of CSS values filled with logical properties
 */

const fillCssValues = (value: Array<string | keyof DefaultTheme['spaces']>) => {
  const [top, right, bottom, left] = value;
  const rightValue = right ?? top;
  const bottomValue = bottom ?? top;
  const leftValue = left ?? rightValue;

  return [top, rightValue, bottomValue, leftValue];
};

function getThemeSection(key: string, theme: DefaultTheme) {
  switch (key) {
    case 'gap':
    case 'padding':
    case 'margin':
    case 'paddingTop':
    case 'paddingLeft':
    case 'paddingRight':
    case 'paddingBottom':
    case 'marginTop':
    case 'marginLeft':
    case 'marginRight':
    case 'marginBottom':
    case 'left':
    case 'right':
    case 'top':
    case 'bottom':
    case 'width':
    case 'maxWidth':
    case 'minWidth':
    case 'height':
    case 'maxHeight':
    case 'minHeight':
    case 'borderRadius':
    case 'borderWidth':
      return theme.spaces;
    case 'color':
    case 'background':
    case 'borderColor':
      return theme.colors;
    case 'fontSize':
      return theme.fontSizes;
    case 'fontWeight':
      return theme.fontWeights;
    case 'lineHeight':
      return theme.lineHeights;
    case 'letterSpacing':
      return theme.letterSpacings;
    case 'zIndex':
      return theme.zIndices;
    case 'shadow':
      return theme.shadows;
    default:
      return null;
  }
}

const handleResponsiveValues = (values: ResponsiveProps, theme: DefaultTheme) => {
  if (!values) {
    return undefined;
  }

  if (typeof values === 'object') {
    const groupedStyles = Object.entries(values).reduce(
      (acc, [key, value]) => {
        const themeSection = getThemeSection(key, theme);

        const cssProperty = Object.prototype.hasOwnProperty.call(mappedCSSProps, key) ? mappedCSSProps[key] : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // If the value is an object for ex: padding : { initial: 1, medium: 2, large: [3, 4] }
          Object.entries(value).forEach(([key, value]) => {
            // If value is an array, map to respective logical props
            if (Array.isArray(value)) {
              if (Array.isArray(cssProperty)) {
                const shorthandValue = fillCssValues(value);
                cssProperty.forEach((prop, index) => {
                  acc[key][prop] = themeSection
                    ? extractStyleFromTheme(themeSection, shorthandValue[index], shorthandValue[index])
                    : shorthandValue[index];
                });
              }
            } else {
              const transformedValue = themeSection ? extractStyleFromTheme(themeSection, value, value) : value;
              if (Array.isArray(cssProperty)) {
                cssProperty.forEach((prop) => {
                  acc[key][prop] = transformedValue;
                });
              } else {
                acc[key][cssProperty] = transformedValue;
              }
            }
          });
        } else if (value) {
          // If the value is just a number/array for eg: padding: 2 or '2rem' or ['2rem', '4rem', '8rem']
          if (Array.isArray(cssProperty)) {
            if (Array.isArray(value)) {
              // If value is an array, map to respective logical props
              const shorthandValue = fillCssValues(value);
              cssProperty.forEach((prop, index) => {
                acc.initial[prop] = themeSection
                  ? extractStyleFromTheme(themeSection, shorthandValue[index], shorthandValue[index])
                  : shorthandValue[index];
              });
            } else {
              cssProperty.forEach((prop) => {
                acc.initial[prop] = themeSection ? extractStyleFromTheme(themeSection, value, value) : value;
              });
            }
          } else if (!Array.isArray(value)) {
            acc.initial[cssProperty] = themeSection ? extractStyleFromTheme(themeSection, value, value) : value;
          }
        }

        return acc;
      },
      {
        initial: {},
        small: {},
        medium: {},
        large: {},
      },
    );

    const stringifiedStyles = Object.entries(groupedStyles).reduce((acc, [key, value]) => {
      if (value && Object.keys(value).length > 0) {
        const breakpointStyles = Object.entries(value)
          .reduce((arr, [property, value]) => {
            arr.push(`${property}: ${value};`);

            return arr;
          }, [] as string[])
          .join('\n');

        if (key === 'initial') {
          acc.push(breakpointStyles);
        } else {
          acc.push(`${theme.breakpoints[key]}{ ${breakpointStyles} }`);
        }
      }

      return acc;
    }, [] as string[]);

    return stringifiedStyles.join('\n');
  }
};

export { handleResponsiveValues };
export type {
  ResponsiveProps,
  ShorthandResponsiveProperty,
  IndividualResponsiveProperty,
  IndividualResponsivePropertyWithNumber,
  ResponsiveProperty,
  Breakpoint,
};
