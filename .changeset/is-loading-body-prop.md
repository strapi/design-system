---
"@strapi/design-system": minor
---

Add `isLoading` prop to `Modal.Body` and `Dialog.Body`

When `isLoading` is set to `true` on `Modal.Body` or `Dialog.Body`, the body
content is replaced with a centered `Loader` component. The body enforces a
minimum height of `8rem` to prevent layout shift when the loading state
resolves and content is rendered.

This provides a consistent loading state across modals in the Strapi
monorepo, replacing varying per-dialog loading patterns.
