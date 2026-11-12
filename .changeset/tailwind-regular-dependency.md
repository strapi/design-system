---
'@strapi/design-system': patch
---

**`next/source.css`**: declare `tailwindcss` as a dependency instead of an optional peer dependency, so a Tailwind v3 hoisted next to the design system (e.g. in a yarn workspace) no longer breaks the build with `Can't resolve 'tailwindcss/theme.css'`.
