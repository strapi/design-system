---
'@strapi/icons': patch
---

An icon no longer throws without a styled-components `ThemeProvider`. With no theme, its `fill` and
`stroke` pass through as is, so the icons work in `@strapi/design-system/next`, which has no provider.
