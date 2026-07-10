---
'@strapi/design-system': patch
---

fix(design-system): externalize singleton deps in published bundle

Declare @codemirror/state, @codemirror/view, and @tanstack/react-virtual as
dependencies so the Vite build externalizes them instead of inlining copies
into dist. Fixes production admin crashes (strapi/strapi#26951, #2032).
