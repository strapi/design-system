---
'@strapi/design-system': patch
'@strapi/icons': patch
'@strapi/ui-primitives': patch
---

fix: make the packages resolvable under `moduleResolution: "node16"` / `"nodenext"`

The packages declared `"type": "module"` while shipping CommonJS in `.js` files, so TypeScript treated every `.d.ts` as ESM and could not resolve any named export, and `require()` of the CJS build failed in Node. They now declare `"type": "commonjs"`, which matches their `.js` (CJS) and `.mjs` (ESM) output. `@strapi/icons` also gets a `typesVersions` fallback so `@strapi/icons/symbols` and `@strapi/icons/regular` resolve under `moduleResolution: "node10"`.
