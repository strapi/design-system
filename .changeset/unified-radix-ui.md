---
"@strapi/design-system": patch
"@strapi/ui-primitives": patch
---

chore: migrate from `@radix-ui/*` to the unified `radix-ui` package

Pinned at `1.6.7` (latest stable). Also removes a cast in `handleResponsiveValues` that
worked around `@radix-ui/react-primitive`'s global `CSSProperties` augmentation — that
augmentation was removed upstream in `react-primitive@2.1.7`, bundled since `radix-ui@1.6.1`.
