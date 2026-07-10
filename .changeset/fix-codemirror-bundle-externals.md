---
'@strapi/design-system': patch
---

fix(design-system): externalize @codemirror/state and @codemirror/view in JSONInput bundle

Fixes regression of #1706 where the Vite build inlined @codemirror/state while @uiw/react-codemirror uses the package from node_modules, causing production admin crashes (strapi/strapi#26951, #2032).
