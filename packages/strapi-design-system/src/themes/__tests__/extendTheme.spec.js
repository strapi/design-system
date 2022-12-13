import { extendTheme } from '../extendTheme';
import { lightTheme } from '../lightTheme';

Object.freeze(lightTheme);

describe('extendTheme', () => {
  it('throws an error when passing an invalid value for the first argument', () => {
    let error;

    try {
      extendTheme(null, null);
    } catch (e) {
      error = e.message;
    }

    expect(error).toMatchInlineSnapshot(`
      "
      The first argument should be an object and corresponds to the theme you want to extend.

      The following is an example:


      import { lightTheme, extendTheme } from '@strapi/design-system';

      const myCustomTheme = extendTheme(lightTheme, {
          colors: /* put the overrides for the colors key */,
      shadows: /* put the overrides for the shadows key */,
      sizes: /* put the overrides for the sizes key */,
      zIndices: /* put the overrides for the zIndices key */,
      spaces: /* put the overrides for the spaces key */,
      borderRadius: /* put the overrides for the borderRadius key */,
      mediaQueries: /* put the overrides for the mediaQueries key */,
      fontSizes: /* put the overrides for the fontSizes key */,
      lineHeights: /* put the overrides for the lineHeights key */,
      fontWeights: /* put the overrides for the fontWeights key */,
      })
      "
    `);
  });

  it('throws an error when passing an invalid value for the second argument', () => {
    let error;

    try {
      extendTheme(lightTheme, null);
    } catch (e) {
      error = e.message;
    }

    expect(error).toMatchInlineSnapshot(`
      "
      The second argument should be an object and corresponds to the keys of the theme you want to override.

      The following is an example:


      import { lightTheme, extendTheme } from '@strapi/design-system';

      const myCustomTheme = extendTheme(lightTheme, {
          colors: /* put the overrides for the colors key */,
      shadows: /* put the overrides for the shadows key */,
      sizes: /* put the overrides for the sizes key */,
      zIndices: /* put the overrides for the zIndices key */,
      spaces: /* put the overrides for the spaces key */,
      borderRadius: /* put the overrides for the borderRadius key */,
      mediaQueries: /* put the overrides for the mediaQueries key */,
      fontSizes: /* put the overrides for the fontSizes key */,
      lineHeights: /* put the overrides for the lineHeights key */,
      fontWeights: /* put the overrides for the fontWeights key */,
      })
      "
    `);
  });

  it('overrides the given color', () => {
    const myTheme = extendTheme(lightTheme, {
      colors: {
        primary100: 'red',
      },
    });

    const expectedColors = { ...lightTheme.colors, primary100: 'red' };

    expect(myTheme).toEqual({
      ...lightTheme,
      colors: expectedColors,
    });
    expect(lightTheme.colors.primary100).toMatchInlineSnapshot(`"#f0f0ff"`);
  });

  it('overrides a spacing value color', () => {
    const myTheme = extendTheme(lightTheme, {
      spaces: [1, 2, 3],
    });

    const expectedSpaces = [1, 2, 3];
    expect(myTheme).toEqual({
      ...lightTheme,
      spaces: expectedSpaces,
    });

    expect(lightTheme.spaces).toMatchInlineSnapshot(`
      [
        "0px",
        "4px",
        "8px",
        "12px",
        "16px",
        "20px",
        "24px",
        "32px",
        "40px",
        "48px",
        "56px",
        "64px",
      ]
    `);
  });
});
