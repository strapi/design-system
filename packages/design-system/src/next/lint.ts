import type { OxlintConfig } from 'oxlint';

const componentImports = ['^@strapi/design-system/next$'];

/**
 * Oxlint preset for `@strapi/design-system/next`. You must install `@shadcn/lint`.
 * If you put the preset in `overrides`, move its `settings` to the root of the configuration, because Oxlint does not accept `settings` there.
 * The rules know the design system tokens only when the linted package has a stylesheet that imports `@strapi/design-system/next/source.css`
 */
export default {
  jsPlugins: ['@shadcn/lint'],
  rules: {
    'shadcn/no-restyle': [
      'error',
      {
        componentImports,
        allow: ['layout'],
        message:
          '"{{className}}" restyles <{{component}}>. Use one of its variants, or put the class on a parent element.',
      },
    ],
    'shadcn/no-raw-colors': [
      'error',
      {
        componentImports,
        message: '"{{className}}" is not a design system colour. Use {{suggestions|a design system colour token}}.',
      },
    ],
    // No hints, because @shadcn/lint assumes 1rem = 16px and the design system uses 1rem = 10px
    'shadcn/no-arbitrary-values': [
      'error',
      {
        componentImports,
        message:
          '"{{className}}" is an arbitrary value on {{component|this element}}. Use a design system token or scale value.',
      },
    ],
  },
  settings: {
    shadcn: {
      themeImports: ['^@strapi/design-system/'],
    },
  },
} satisfies OxlintConfig;
