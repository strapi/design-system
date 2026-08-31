---
'@strapi/design-system': minor
---

Add Tailwind CSS and shadcn at `@strapi/design-system/next`, with a Button as the
first component. The old import path does not change.

Import `@strapi/design-system/next/source.css` to get the stylesheet, the tokens and
the `dark` variant. Then add an `@source` for your own files:

```css
@import '@strapi/design-system/next/source.css';
@source './src/**/*.{ts,tsx}';
```

The entry keeps automatic scanning off, because Tailwind reads a CSS value in a
styled-components template literal as a class name. Tailwind resolves the `@source`
path from the stylesheet that holds it.

`DesignSystemProvider` writes the `dark` class on the document root, so both systems
share one theme. A `useColorScheme` hook at `/next` does the same without the
provider.
