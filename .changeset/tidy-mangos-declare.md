---
'@strapi/design-system': patch
---

Declare an exports map. The root import gives the same exports as before. A wildcard entry keeps the
`dist` folder open, so a deep import into the build output still resolves.
