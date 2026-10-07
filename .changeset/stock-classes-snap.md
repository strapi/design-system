---
'@strapi/design-system': patch
---

The `/next` components now use the default Tailwind scales (spacing, font sizes, line heights, radii, easings, durations) in place of values copied from the legacy theme, such as `py-[0.7rem]`. Paddings, sizes and font sizes move to the closest stock step, so some components change by a pixel or two. Typography variants use the stock sizes and their stock line heights, and IconButton uses fixed square sizes.
