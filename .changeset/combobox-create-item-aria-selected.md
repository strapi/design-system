---
'@strapi/ui-primitives': patch
---

**`Combobox`**: add `aria-selected="false"` to the create item

The create item has `role="option"`. It now sets `aria-selected="false"`, because a user cannot select it.
