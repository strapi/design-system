---
'@strapi/design-system': major
---

chore!: remove size from inputs

`size` was used to give our inputs a fixed size, this would not have worked with different writing directions or be very responsive. Instead, we use logical padding values.
