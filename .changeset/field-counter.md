---
'@strapi/design-system': minor
---

**`Field`**: add a `counter` prop to `Field.Root`, rendered at the end of the hint row, or of the error row when the error replaces the hint, and added to the input's `aria-describedby`. Inputs built on `useField` now share one helper for `aria-describedby`, which no longer points at an error that has no message.
