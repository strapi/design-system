---
'@strapi/design-system': minor
---

**`Field`**: add a `counter` prop to `Field.Root`, rendered at the end of the hint row, or of the error row when the error replaces the hint, and added to the input's `aria-describedby`. Inputs built on `useField` now share one helper for `aria-describedby`, which no longer points at an error that has no message.

With a `counter`, `aria-describedby` lists several ids (`…-hint …-counter` or `…-error …-counter`). Code that finds an input from its error or hint with an exact match, `[aria-describedby="x-error"]`, must match one id instead: `[aria-describedby~="x-error"]`.
