---
'@strapi/design-system': patch
'@strapi/ui-primitives': patch
'@strapi/icons': patch
---

fix: declare `@types/react` as an optional peer dependency

The published type declarations import React types (`import * as React from 'react'`), but `@types/react` was not declared as a dependency of any kind. Consumers whose package manager does not place `@types/react` on the ambient resolution path of these packages (for example pnpm's global virtual store) silently resolved `react` to the untyped runtime entry, degrading `React.*` to `any` and distorting `Pick`/`Omit`-derived prop types — optional props became required.
