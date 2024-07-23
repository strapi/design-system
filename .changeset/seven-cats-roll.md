---
'@strapi/design-system': major
---

chore!: change z-indexes on theme from array to dictionary

`z-indices` on the theme object were an array of length 4. We've since changed this to a dictionary to help engineers understand how to correctly apply these values. See the `Elevation` documentation for more information.
