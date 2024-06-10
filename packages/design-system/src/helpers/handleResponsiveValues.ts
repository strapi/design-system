import * as React from 'react';

import { DefaultTheme } from 'styled-components';

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
  | 'gap'
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

type ResponsiveValue<TCSSProp extends keyof ResponsiveCSSProperties = any> = TCSSProp extends 'padding' | 'margin'
  ? ShorthandResponsiveProperty
  : IndividualResponsiveProperty;

type ResponsiveValues<TCSSProp extends keyof ResponsiveCSSProperties = any> = {
  [K in keyof ResponsiveCSSProperties]?: ResponsiveValue<TCSSProp>;
};

const mappedLogicalProps = {
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
};

const fillCssValues = (value: Array<string | keyof DefaultTheme['spaces']>) => {
  const [top, right, bottom, left] = value;
  const rightValue = right ?? top;
  const bottomValue = bottom ?? top;
  const leftValue = left ?? rightValue;

  return [top, rightValue, bottomValue, leftValue];
};

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
        const logicalProperty = Object.prototype.hasOwnProperty.call(mappedLogicalProps, key)
          ? mappedLogicalProps[key]
          : key;

        // If the value is an object for ex: padding : { initial: 1, medium: 2, large: [3, 4] }
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          Object.entries(value).forEach(([key, value]) => {
            // If value is an array, map to respective logical props
            if (Array.isArray(value) && Array.isArray(logicalProperty)) {
              const shorthandValue = fillCssValues(value);
              logicalProperty.forEach((prop, index) => {
                acc[key][prop] =
                  theme.spaces[shorthandValue[index] as keyof DefaultTheme['spaces']] ?? shorthandValue[index];
              });
            } else {
              const transformedValue = theme.spaces[value as keyof DefaultTheme['spaces']] ?? value;
              if (Array.isArray(logicalProperty)) {
                logicalProperty.forEach((prop) => {
                  acc[key][prop] = transformedValue;
                });
              } else {
                acc[key][logicalProperty] = transformedValue;
              }
            }
          });
        } else if (value) {
          // If the value is just a number/array for eg: padding: 2 or '2rem' or ['2rem', '4rem', '8rem']
          const transformedValue = theme.spaces[value as keyof DefaultTheme['spaces']] ?? value;

          if (Array.isArray(logicalProperty)) {
            if (Array.isArray(value)) {
              // If value is an array, map to respective logical props
              const shorthandValue = fillCssValues(value);
              logicalProperty.forEach((prop, index) => {
                acc.initial[prop] =
                  theme.spaces[shorthandValue[index] as keyof DefaultTheme['spaces']] ?? shorthandValue[index];
              });
            } else {
              logicalProperty.forEach((prop) => {
                acc.initial[prop] = theme.spaces[transformedValue as keyof DefaultTheme['spaces']] ?? transformedValue;
              });
            }
          } else {
            acc.initial[logicalProperty] =
              theme.spaces[transformedValue as keyof DefaultTheme['spaces']] ?? transformedValue;
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
