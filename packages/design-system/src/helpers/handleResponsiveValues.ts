import * as React from 'react';

import { DefaultTheme } from 'styled-components';

import { DefaultThemeOrCSSProp } from '../types';

import { extractStyleFromTheme } from './theme';

type ResponsiveCSSProperties = Pick<
  React.CSSProperties,
  | 'margin'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginBottom'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'padding'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'border'
  | 'borderRadius'
  | 'borderWidth'
  | 'borderColor'
  | 'borderStyle'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'gap'
  | 'color'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'zIndex'
  | 'background'
  | 'boxShadow'
  | 'display'
  | 'pointerEvents'
  | 'cursor'
  | 'flexWrap'
  | 'position'
  | 'overflow'
  | 'transition'
  | 'transform'
  | 'animation'
  | 'textAlign'
  | 'textTransform'
  | 'flex'
  | 'flexBasis'
  | 'flexGrow'
  | 'flexShrink'
>;

type Breakpoint = 'initial' | 'small' | 'medium' | 'large';

type ResponsiveProperty<T> =
  | {
      [key in Breakpoint]?: T;
    }
  | T;

// shorthand Responsive property ex: padding, marging, etc
type ShorthandResponsiveProperty = ResponsiveProperty<
  string | keyof DefaultTheme['spaces'] | Array<string | keyof DefaultTheme['spaces']>
>;
// Individual Responsive property ex: padding-top, margin-left, etc
type IndividualResponsiveProperty = ResponsiveProperty<string | keyof DefaultTheme['spaces']>;

/**  If T extends 'color' | 'fontSize' | 'zIndex' etc
 * then the value can be a string or a key of the theme but map to the theme value for that key
 * for example: if its 'color' then keyof DefaultTheme['colors'] will be the value
 * if its 'fontSize' then keyof DefaultTheme['fontSizes'] will be the value
 * if its 'zIndex' then keyof DefaultTheme['zIndices'] will be the value */

type CSSPropToThemeKeyMap = {
  background: 'colors';
  borderColor: 'colors';
  color: 'colors';
  fontSize: 'fontSizes';
  fontWeight: 'fontWeights';
  lineHeight: 'lineHeights';
  letterSpacing: 'letterSpacings';
  zIndex: 'zIndices';
  boxShadow: 'shadows';
};

type OtherIndividualResponsiveProperty<T extends keyof CSSPropToThemeKeyMap> =
  | ResponsiveProperty<keyof DefaultTheme[T]>
  | ResponsiveProperty<DefaultThemeOrCSSProp<CSSPropToThemeKeyMap[T], T>>;

type ResponsiveValue<TCSSProp extends keyof ResponsiveCSSProperties = any> = TCSSProp extends 'padding' | 'margin'
  ? ShorthandResponsiveProperty
  : TCSSProp extends
        | 'color'
        | 'background'
        | 'borderColor'
        | 'fontSize'
        | 'fontWeight'
        | 'lineHeight'
        | 'zIndex'
        | 'boxShadow'
    ? OtherIndividualResponsiveProperty<TCSSProp>
    : IndividualResponsiveProperty;

type ResponsiveValues<TCSSProp extends keyof ResponsiveCSSProperties = any> = {
  [K in keyof ResponsiveCSSProperties]?: ResponsiveValue<TCSSProp>;
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
  boxShadow: 'box-shadow',
  pointerEvents: 'pointer-events',
  textAlign: 'text-align',
  textTransform: 'text-transform',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
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
    case 'boxShadow':
      return theme.shadows;
    default:
      return null;
  }
}

const handleResponsiveValues = <TCSSProp extends keyof ResponsiveCSSProperties = any>(
  values: ResponsiveValues<TCSSProp> | undefined,
  theme: DefaultTheme,
) => {
  if (!values) {
    return undefined;
  }

  if (typeof values === 'object') {
    const groupedStyles = Object.entries(values).reduce(
      (acc, [key, value]) => {
        const themeSection = getThemeSection(key, theme);

        const cssProperty = Object.prototype.hasOwnProperty.call(mappedCSSProps, key) ? mappedCSSProps[key] : key;

        // if (cssProperty === 'bottom') debugger;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // If the value is an object for ex: padding : { initial: 1, medium: 2, large: [3, 4] }
          Object.entries(value).forEach(([key, value]) => {
            // If value is an array, map to respective logical props
            if (Array.isArray(value) && Array.isArray(cssProperty)) {
              const shorthandValue = fillCssValues(value);
              cssProperty.forEach((prop, index) => {
                acc[key][prop] = themeSection
                  ? extractStyleFromTheme(themeSection, shorthandValue[index], shorthandValue[index])
                  : shorthandValue[index];
              });
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
          } else {
            // @ts-expect-error fix: value should not be an array here
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
export type { ResponsiveValues, ResponsiveValue, ResponsiveProperty, Breakpoint };
