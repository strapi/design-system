---
'@strapi/design-system': patch
---

The package now has an `exports` map. These import paths resolve:

- The root path `@strapi/design-system`.
- `@strapi/design-system/next` and its CSS files.
- `@strapi/design-system/package.json`.
- Type imports from files and folders under `@strapi/design-system/dist/`, for example `import type { StrapiTheme } from '@strapi/design-system/dist/themes'`.

Runtime imports under `dist/` need the file extension, for example `@strapi/design-system/dist/index.js`. Other paths do not resolve. For example, bare `@strapi/design-system/dist` does not resolve. If you import from it, import from `@strapi/design-system` instead.
