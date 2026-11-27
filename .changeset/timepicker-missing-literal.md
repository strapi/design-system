---
'@strapi/design-system': patch
---

fix: stop `TimePicker` crashing when the time formatter omits a literal separator

Rendering a time field threw when `formatToParts` returned hour and minute parts without a `literal` separator. `TimePicker` now falls back to `:` in that case, so the field still renders. A separator literal that is present is still used for the placeholder, the input pattern, and value parsing.
