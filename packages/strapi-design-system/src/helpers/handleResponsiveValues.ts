import { DefaultTheme } from 'styled-components';

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

export type ResponsiveValue = ResponsiveValueObject | keyof DefaultTheme['spaces'] | ResponsiveValueTuple;

/* eslint-disable consistent-return */
const handleResponsiveValues = (property: string, value: ResponsiveValue | undefined, theme: DefaultTheme) => {
  if (!value) {
    return undefined;
  }

  let transformedArray: ResponsiveValueTuple = Array.isArray(value) ? value : [];

  if (!Array.isArray(value) && typeof value === 'object') {
    transformedArray = [value?.desktop, value?.tablet, value?.mobile];
  }

  if (transformedArray.length > 0) {
    const spaces = transformedArray.reduce((acc, curr, index) => {
      if (curr) {
        switch (index) {
          case 0:
            return `${acc}${property}: ${theme.spaces[curr]};`;
          case 1:
            return `${acc}${theme.mediaQueries.tablet}{${property}: ${theme.spaces[curr]};}`;
          case 2:
            return `${acc}${theme.mediaQueries.mobile}{${property}: ${theme.spaces[curr]};}`;
          default:
            return acc;
        }
      }

      return acc;
    }, '');

    return spaces;
  }

  // Fallback to the passed transformedArray when necessary
  const realValue = theme.spaces[value as keyof DefaultTheme['spaces']] || value;

  return `${property}: ${realValue};`;
};

export default handleResponsiveValues;
