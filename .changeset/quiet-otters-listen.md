---
'@strapi/design-system': minor
---

Add Tailwind CSS and shadcn at `@strapi/design-system/next`, with a Button as the
first component. Import the stylesheet from `@strapi/design-system/next/styles.css`.
The old import path does not change.

`DesignSystemProvider` writes the `dark` class on the document root, so both systems
share one theme. A `useColorScheme` hook at `/next` does the same without the
provider.
