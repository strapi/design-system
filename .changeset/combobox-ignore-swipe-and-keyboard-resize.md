---
'@strapi/ui-primitives': patch
---

**`Combobox`**: ignore swipes on items and keep the list open when the on-screen keyboard resizes the viewport

- `Combobox.Item` and `Combobox.CreateItem` no longer select when the pointer moved more than 10px between `pointerdown` and `pointerup`, so a scroll attempt on the pinned create item doesn't trigger it.
- The list no longer closes on a height-only `resize` while the input is focused (soft keyboard).
