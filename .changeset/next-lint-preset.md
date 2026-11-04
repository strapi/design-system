---
'@strapi/design-system': minor
---

**`/next`**: add the Tailwind lint preset at `@strapi/design-system/next/lint`

The new `@strapi/design-system/next/lint` export is an Oxlint config object. It turns on the `@shadcn/lint` rules `no-restyle`, `no-raw-colors` and `no-arbitrary-values`. `no-restyle` checks only components from `@strapi/design-system/next`. `no-raw-colors` and `no-arbitrary-values` check every element. `@shadcn/lint` is an optional peer dependency, so install it in your project.

Add the preset with `extends` in `oxlint.config.ts`, and also set its `settings`, because `extends` does not merge `settings`. Do not spread the preset: your own `rules` or `settings` replace the preset ones, and Oxlint runs none of its rules and shows no error.

```ts
import { defineConfig } from 'oxlint';
import strapiLint from '@strapi/design-system/next/lint';

export default defineConfig({
  extends: [strapiLint],
  settings: strapiLint.settings,
});
```

To check your own components with `no-restyle` too, add their import paths to `componentImports`:

```ts
settings: {
  shadcn: {
    ...strapiLint.settings.shadcn,
    componentImports: [...strapiLint.settings.shadcn.componentImports, '^@acme/ui(/|$)'],
  },
},
```
