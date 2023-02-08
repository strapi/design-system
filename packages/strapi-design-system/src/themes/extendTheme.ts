import { DefaultTheme } from 'styled-components';
import { cloneDeep, assignWith, merge } from 'lodash';

import { isObject } from '../helpers/objects';

import { lightTheme } from './lightTheme';

const generateError = (customMessage: string) => `
${customMessage}

The following is an example:


import { lightTheme, extendTheme } from '@strapi/design-system';

const myCustomTheme = extendTheme(lightTheme, {
    ${Object.keys(lightTheme)
      .map((key) => `${key}: /* put the overrides for the ${key} key */,`)
      .join('\n')}
})
`;

export const extendTheme = (theme: DefaultTheme | null, overrides: object | null) => {
  if (!isObject(theme)) {
    const error = generateError(
      'The first argument should be an object and corresponds to the theme you want to extend.',
    );

    throw new Error(error);
  }

  if (!isObject(overrides)) {
    const error = generateError(
      'The second argument should be an object and corresponds to the keys of the theme you want to override.',
    );

    throw new Error(error);
  }

  function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return srcValue;
    }

    if (isObject(objValue) && isObject(srcValue)) {
      return merge(objValue, srcValue);
    }

    return undefined;
  }

  const masterTheme = cloneDeep(theme ?? {});
  const masterOverrides = cloneDeep(overrides ?? {});

  assignWith(masterTheme, masterOverrides, customizer);

  return masterTheme;
};
