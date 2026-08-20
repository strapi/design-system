---
'@strapi/design-system': minor
---

Let one theme control both the old system and the new system. `DesignSystemProvider` now writes the
`dark` class on the root element of the document, so the components at `@strapi/design-system/next`
follow the theme. An application that passes `darkTheme` needs no change. A new `useColorScheme` hook at
`@strapi/design-system/next` writes the same class, so an application that uses only the `/next`
components can set the color scheme without the provider.
