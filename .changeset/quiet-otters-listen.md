---
'@strapi/design-system': minor
---

Add Tailwind CSS and shadcn at a new import path. A Button arrives at `@strapi/design-system/next`, and
the package builds one stylesheet for it at `@strapi/design-system/next/styles.css`. Import that
stylesheet yourself, because no JavaScript import brings it. The old import path does not change, and
both systems work on the same page.
