---
'@strapi/design-system': minor
---

**`Alert`**: the close button is only rendered when `onClose` is passed, so an `Alert` without `onClose` cannot be dismissed. Before, the close button was always rendered and did nothing without `onClose`. `closeLabel` is now optional and defaults to `'Close'`.
