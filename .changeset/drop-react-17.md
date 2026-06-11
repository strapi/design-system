---
"@strapi/design-system": patch
"@strapi/icons": patch
"@strapi/ui-primitives": patch
---

Drop React 17 from the supported peer dependency range.

The `react` and `react-dom` peer dependencies are now `^18.0.0` (previously `^17.0.0 || ^18.0.0`), matching the React 18 APIs already in use. The `useId` hook's React 17 client-only fallback has also been removed.
