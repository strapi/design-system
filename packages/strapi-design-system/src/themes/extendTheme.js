import { lightTheme } from './lightTheme';

const generateError = (customMessage) => `
${customMessage}

The following is an example:


import { lightTheme, extendTheme } from '@strapi/design-system';

const myCustomTheme = extendTheme(lightTheme, {
    ${Object.keys(lightTheme)
      .map((key) => `${key}: /* put the overrides for the ${key} key */,`)
      .join('\n')}
})
`;

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const mergeDeep = (target, overrides) => {
  const output = { ...target };

  if (isObject(target) && isObject(overrides)) {
    Object.keys(overrides).forEach((key) => {
      if (isObject(overrides[key])) {
        // eslint-disable-next-line no-prototype-builtins
        if (target.hasOwnProperty(key)) {
          output[key] = mergeDeep(target[key], overrides[key]);
        } else {
          output[key] = overrides[key];
        }
      } else {
        output[key] = overrides[key];
      }
    });
  }

  return output;
};

export const extendTheme = (theme, overrides) => {
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

  return mergeDeep(theme, overrides);
};
