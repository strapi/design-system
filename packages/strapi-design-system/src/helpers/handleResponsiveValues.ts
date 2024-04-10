import * as React from 'react';

import { DefaultTheme } from 'styled-components';

import { DefaultThemeOrCSSProp } from '../types';

interface ResponsiveValueObject {
  desktop?: keyof DefaultTheme['spaces'];
  tablet?: keyof DefaultTheme['spaces'];
  mobile?: keyof DefaultTheme['spaces'];
}

type ResponsiveValueTuple = [
  desktop?: keyof DefaultTheme['spaces'],
  tablet?: keyof DefaultTheme['spaces'],
  mobile?: keyof DefaultTheme['spaces'],
];

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
>;

export type ResponsiveValue<TCSSProp extends keyof ResponsiveCSSProperties = any> =
  | ResponsiveValueObject
  | DefaultThemeOrCSSProp<'spaces', TCSSProp>
  | ResponsiveValueTuple;

/* eslint-disable consistent-return */
const handleResponsiveValues = <TCSSProp extends keyof ResponsiveCSSProperties>(
  property: string,
  value: ResponsiveValue<TCSSProp> | undefined,
  theme: DefaultTheme,
) => {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object') {
    const transformedArray: ResponsiveValueTuple = Array.isArray(value)
      ? value
      : [value?.desktop, value?.tablet, value?.mobile];

    const spaces = transformedArray.reduce((acc, curr, index) => {
      if (curr) {
        let formattedCurr = '';

        if (Array.isArray(curr)) {
          const [start, end] = curr;
          const startValue = theme.spaces[start as keyof DefaultTheme['spaces']] ?? start;
          const endValue = theme.spaces[end as keyof DefaultTheme['spaces']] ?? end;
          formattedCurr = `${startValue} ${endValue}`;
        }

        const value = Array.isArray(curr) ? formattedCurr : theme.spaces[curr];

        switch (index) {
          case 0:
            return `${acc}${property}: ${value};`;
          case 1:
            return `${acc}${theme.mediaQueries.tablet} { ${property}: ${value}; }`;
          case 2:
            return `${acc}${theme.mediaQueries.mobile} { ${property}: ${value}; }`;
          default:
            return acc;
        }
      }

      return acc;
    }, '');

    return spaces;
  }

  // Fallback to the passed transformedArray when necessary
  const realValue = theme.spaces[value as keyof DefaultTheme['spaces']] ?? value;

  return `${property}: ${realValue};`;
};

export default handleResponsiveValues;
