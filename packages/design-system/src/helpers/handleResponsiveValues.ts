import { DefaultTheme } from 'styled-components';

import { extractStyleFromTheme } from './theme';

import type { TransientBoxProps } from '../primitives/Box/Box';
import type { TransientFlexProps } from '../primitives/Flex/Flex';
import type { TransientTypographyProps } from '../primitives/Typography/Typography';
import type { DefaultThemeOrCSSProp } from '../types';

type Breakpoint = 'initial' | 'small' | 'medium' | 'large';

/**
 * A property is either a responsive object, or a single
 * value that is applied as the initial value.
 */
type ResponsiveProperty<T> =
  | {
      [key in Breakpoint]?: T;
    }
  | T;

/**
 * Currently, only margin or padding accept an array of values.
 */
type ResponsiveThemeProperty<T extends keyof DefaultTheme, K extends keyof React.CSSProperties> = K extends
  | 'padding'
  | 'margin'
  ? ResponsiveProperty<DefaultThemeOrCSSProp<T, K> | Array<DefaultThemeOrCSSProp<T, K>>>
  : ResponsiveProperty<DefaultThemeOrCSSProp<T, K>>;

/**
 * This should ONLY ever be CSS property names, never shorthands or aliases.
 */
type ResponsiveProps = Omit<TransientBoxProps, 'basis' | 'grow' | 'shrink' | 'shadow'> &
  Omit<TransientFlexProps, 'direction' | 'wrap'> &
  Omit<TransientTypographyProps, 'ellipsis' | 'variant'> & {
    boxShadow?: TransientBoxProps['shadow'];
    flexBasis?: TransientBoxProps['basis'];
    flexDirection?: TransientFlexProps['direction'];
    flexGrow?: TransientBoxProps['grow'];
    flexShrink?: TransientBoxProps['shrink'];
    flexWrap?: TransientFlexProps['wrap'];
  };

const mappedCSSProps: Partial<Record<keyof ResponsiveProps, string | string[]>> = {
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
  textDecoration: 'text-decoration',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
  minWidth: 'min-width',
  maxWidth: 'max-width',
  minHeight: 'min-height',
  maxHeight: 'max-height',
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
};

/**
 * Fills the shorthand CSS properties with their corresponding logical properties
 * @param value An array of CSS values for shorthand properties
 * @returns An array of CSS values filled with logical properties
 */

const fillCssValues = (value: DefaultThemeOrCSSProp<'spaces', 'margin' | 'padding'>[]) => {
  const [top, right, bottom, left] = value;
  const rightValue = right ?? top;
  const bottomValue = bottom ?? top;
  const leftValue = left ?? rightValue;

  return [top, rightValue, bottomValue, leftValue] as const;
};

function getThemeSection(key: keyof ResponsiveProps, theme: DefaultTheme) {
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
    case 'zIndex':
      return theme.zIndices;
    case 'boxShadow':
      return theme.shadows;
    default:
      return null;
  }
}

const handleResponsiveValues = (values: ResponsiveProps, theme: DefaultTheme) => {
  const stylesByBreakpoint = Object.entries(values).reduce(
    (acc, curr) => {
      const [key, value] = curr as [key: keyof ResponsiveProps, value: ResponsiveProps[keyof ResponsiveProps]];
      const themeSection = getThemeSection(key, theme);

      const cssProperty = Object.prototype.hasOwnProperty.call(mappedCSSProps, key) ? mappedCSSProps[key] : key;

      if (cssProperty && value) {
        // If the value is an responsive object e.g padding : { initial: 1, medium: 2, large: [3, 4] }
        if (typeof value === 'object' && !Array.isArray(value)) {
          Object.entries(value).forEach(([breakpointName, breakpointValue]) => {
            acc[breakpointName] = {
              ...acc[breakpointName],
              ...convertCssPropertiesToCssValues(cssProperty, breakpointValue, themeSection),
            };
          });
        } else {
          /**
           * If we don't pass a responsive object, we just set the value to respective prop.
           */
          acc.initial = {
            ...acc.initial,
            ...convertCssPropertiesToCssValues(cssProperty, value, themeSection),
          };
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

  /**
   * Stringify our styles.
   */
  return Object.entries(stylesByBreakpoint)
    .reduce<string[]>((acc, [key, value]) => {
      if (value && Object.keys(value).length > 0) {
        const breakpointStyles = Object.entries(value)
          .reduce<string[]>((arr, [property, value]) => {
            arr.push(`${property}: ${value};`);

            return arr;
          }, [])
          .join('\n');

        if (key === 'initial') {
          acc.push(breakpointStyles);
        } else {
          acc.push(`${theme.breakpoints[key]}{ ${breakpointStyles} }`);
        }
      }

      return acc;
    }, [])
    .join('\n');
};

/**
 * This function takes either a single CSS property or an array of CSS
 * properties & applies the provided value during the process, the value
 * is extracted from the provided themeSection if possible. If not, we assume
 * the user has provided a CSS value directly and fallback to that.
 */
const convertCssPropertiesToCssValues = (
  property: string | string[],
  value: DefaultThemeOrCSSProp<any, any> | Array<DefaultThemeOrCSSProp<any, any>>,
  themeSection: DefaultTheme[keyof DefaultTheme],
) => {
  if (Array.isArray(property) && Array.isArray(value)) {
    /**
     * If the value is an array & the cssProperty is an array, map the values to respective logical props.
     * This is normally the case for padding, margin, etc. where we extract each value and turn it into a single logical prop.
     *
     * @example cssProperty = ['padding-block-start', 'padding-inline-end', 'padding-block-end', 'padding-inline-start'] and breakpointValue = [3, 4]
     *
     * so this code would become
     * ```css
     * padding-block-start: 3;
     * padding-block-end: 3;
     * padding-inline-start: 4;
     * padding-inline-end: 4;
     * ```
     */
    const shorthandValues = fillCssValues(value);

    return property.reduce((acc, prop, index) => {
      acc[prop] = extractStyleFromTheme(themeSection, shorthandValues[index], shorthandValues[index]);

      return acc;
    }, {});
  } else if (Array.isArray(property) && !Array.isArray(value)) {
    /**
     * If the value is not an array & the cssProperty is an array, map the value to respective logical props (they'd all be the same).
     *
     * @example cssProperty = ['padding-block-start', 'padding-inline-end', 'padding-block-end', 'padding-inline-start'] and breakpointValue = 1
     *
     * so this code would become
     * ```css
     *  padding-inline-start: 1;
     *  padding-inline-end: 1;
     *  padding-block-start: 1;
     *  padding-block-end: 1;
     * ```
     */
    return property.reduce((acc, prop) => {
      acc[prop] = extractStyleFromTheme(themeSection, value, value);

      return acc;
    }, {});
  } else if (!Array.isArray(property) && !Array.isArray(value)) {
    return {
      [property]: extractStyleFromTheme(themeSection, value, value),
    };
  } else {
    console.warn(
      "You've passed an array of values to a property that does not support it. Please check the property and value you're passing.",
    );

    return {};
  }
};

export { handleResponsiveValues };
export type { ResponsiveProps, ResponsiveThemeProperty, ResponsiveProperty, Breakpoint };
