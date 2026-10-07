---
'@strapi/design-system': minor
---

Add the colours, shadows and breakpoints of the old theme to `@strapi/design-system/next`, so a
surface migrated to Tailwind looks the same as before.

- Every colour token is a Tailwind colour with a light and a dark value: `neutral100` becomes
  `bg-neutral-100`, `primary600` becomes `text-primary-600`, `buttonPrimary600` becomes
  `bg-button-primary-600`, and so on for `alternative`, `danger`, `secondary`, `success` and
  `warning`.
- The stock Tailwind `neutral` family is replaced, so `bg-neutral-50` no longer compiles.
- The shadows are `shadow-filter`, `shadow-popup`, `shadow-table`, `shadow-focus` (the glow) and
  `shadow-focus-inset` (the 2px inner border).
- The breakpoints are the `small:` (520px), `medium:` (768px) and `large:` (1080px) variants.
  The stock `sm:`, `md:` and `lg:` variants do not change.
