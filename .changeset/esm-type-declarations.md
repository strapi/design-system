---
'@strapi/design-system': patch
'@strapi/icons': patch
---

fix: ship ESM type declarations (`.d.mts`) for the `import` condition

ES module importers under `moduleResolution: "node16"` / `"nodenext"` were type-checked against the CommonJS `.d.ts` files while Node loaded the `.mjs` build, so code such as a default import of `@strapi/icons` passed `tsc` and then failed at runtime. Each `.mjs` entry now has a matching `.d.mts`, and `exports` points `import` and `require` at their own `types`.
