import * as React from 'react';

import { DefaultTheme } from 'styled-components';

import { DefaultThemeOrCSSProp } from '../types';

export interface ResponsiveValueObject {
  initial?: keyof DefaultTheme['spaces'];
  medium?: keyof DefaultTheme['spaces'];
  large?: keyof DefaultTheme['spaces'];
}

const breakpointMap = {
  medium: '@media(min-width: 720px)',
  large: '@media(min-width: 1440px)',
};

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
  | 'gap' //TODO: check if we need to add more properties apart from margin and padding
>;

const mappedLogicalProps = {
  padding: ['padding-block', 'padding-inline'],
  paddingTop: 'padding-block-start',
  paddingRight: 'padding-inline-end',
  paddingBottom: 'padding-block-end',
  paddingLeft: 'padding-inline-start',
  margin: ['margin-block', 'margin-inline'],
  marginLeft: 'margin-inline-start',
  marginRight: 'margin-inline-end',
  marginTop: 'margin-block-start',
  marginBottom: 'margin-block-end',
};

/** ResponsiveValue could be a number from spaces or ResponsiveValueObject
 * example: padding: { initial: 1, medium: 2, large: 3 };
 * example: padding: 2;
 * example: marginBottom: 2;
 */

export type ResponsiveValue<TCSSProp extends keyof ResponsiveCSSProperties = any> =
  | ResponsiveValueObject
  | DefaultThemeOrCSSProp<'spaces', TCSSProp>;

export type ResponsiveValues<TCSSProp extends keyof ResponsiveCSSProperties = any> = {
  [K in keyof ResponsiveCSSProperties]?: ResponsiveValue<TCSSProp>;
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
        const property = Object.prototype.hasOwnProperty.call(mappedLogicalProps, key) ? mappedLogicalProps[key] : key;

        // If the value is an object for eg: $padding : { initial: 1, medium: 2, large: 3}
        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([key, value]) => {
            const transformedValue = theme.spaces[value as keyof DefaultTheme['spaces']] ?? value;

            // If the property is a set of logical properties, such as $padding: ['padding-block', 'padding-inline']
            if (Array.isArray(property)) {
              property.forEach((prop) => {
                acc[key][prop] = transformedValue;
              });
            } else {
              acc[key][property] = transformedValue;
            }
          });
        } else if (value) {
          // If the value is just a number for eg: $padding: 2
          const transformedValue = theme.spaces[value as keyof DefaultTheme['spaces']] ?? value;

          if (Array.isArray(property)) {
            property.forEach((prop) => {
              acc.initial[prop] = transformedValue;
            });
          } else {
            acc.initial[property] = transformedValue;
          }
        }

        return acc;
      },
      {
        initial: {},
        medium: {},
        large: {},
      },
    );

    const stringifiedStyles = Object.entries(groupedStyles).reduce((acc, [key, value]) => {
      const breakpointStyles = Object.entries(value)
        .reduce((arr, [property, value]) => {
          arr.push(`${property}: ${value};`);

          return arr;
        }, [] as string[])
        .join('\n');

      if (key === 'initial') {
        acc.push(breakpointStyles);
      } else {
        acc.push(`${breakpointMap[key]}{ ${breakpointStyles} }`);
      }

      return acc;
    }, [] as string[]);

    return stringifiedStyles.join('\n');
  }
};

export { handleResponsiveValues };
