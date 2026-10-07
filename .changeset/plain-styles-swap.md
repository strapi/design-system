---
'@strapi/design-system': minor
---

Add a shadcn style to `@strapi/design-system/next`. With the `theme-shadcn` class on the root element (next to
`dark` for the dark mode), the next components take the default shadcn theme: neutral greys, a near-black
primary, the shadcn radius, shadows and focus ring. It only redefines CSS variables, so the components keep
their structure, and the legacy components keep the Strapi look.

`Checkbox` now has a fixed 4px radius, as before in the Strapi style.
