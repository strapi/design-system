---
'@strapi/design-system': patch
---

**Internal**: fix Oxlint warnings

This change renames shadowed variables. It removes `any` where the published types stay compatible. It also removes dead `eslint-disable` comments. `extractStyleFromTheme` now types its fallback parameter as `unknown`. Callers can still pass any value. No component changes its behaviour.
