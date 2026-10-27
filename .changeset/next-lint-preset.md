---
'@strapi/design-system': minor
---

**`/next`**: add the Tailwind lint preset at `@strapi/design-system/next/lint`

The new `@strapi/design-system/next/lint` export is an Oxlint config object. It turns on the `@shadcn/lint` rules `no-restyle`, `no-raw-colors` and `no-arbitrary-values` for components from `@strapi/design-system/next`. Install `@shadcn/lint` in your project, then spread the preset into your Oxlint config. `@shadcn/lint` is an optional peer dependency.
