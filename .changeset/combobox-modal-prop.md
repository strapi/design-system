---
'@strapi/ui-primitives': minor
---

**`Combobox`**: add `modal` prop to `Root`

The `Combobox.Root` component now accepts a `modal` prop (default `true`).

When `modal={false}`, the three modal-mode behaviours are disabled:
- `aria-hidden` is not applied to elements outside the trigger and content
- Page scroll is not locked while the listbox is open
- Focus is not trapped inside the trigger

This is useful when the combobox is placed inside a dialog or other container that already manages focus trapping and aria-hiding, or when pointer events outside the open listbox must remain active.

The default (`modal={true}`) is unchanged, so existing usage is unaffected.
