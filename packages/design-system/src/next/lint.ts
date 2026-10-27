import type { OxlintConfig } from 'oxlint';

const componentImports = ['^@strapi/design-system/next$'];

/**
 * Oxlint preset for code that uses `@strapi/design-system/next`. Install `@shadcn/lint` in your project.
 *
 * Spread `settings` into the top-level `settings`, because Oxlint `overrides` cannot hold `settings`.
 *
 * `settings` works only when each linted package has a stylesheet that imports `@strapi/design-system/next/source.css`, or a `components.json` that points to one. Without either, the rules still report palette colours, arbitrary values and restyles, but they do not know the design system tokens.
 *
 * The `no-arbitrary-values` message has no hints, because `@shadcn/lint` assumes 1rem = 16px and the design system uses 1rem = 10px
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
