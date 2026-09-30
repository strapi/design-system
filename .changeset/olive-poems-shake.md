---
'@strapi/design-system': patch
---

fix: declare `@radix-ui/react-context` as a dependency

`dist/components/Select/SelectParts.d.ts` references `import('@radix-ui/react-context').Scope` in the public type of `SingleSelect`/`MultiSelect`, but the package declared `@radix-ui/react-context` nowhere. It resolved only by accident, through the copy `@strapi/ui-primitives` hoists under npm/yarn. Consumers on a strict layout (pnpm's global virtual store, `node-linker=isolated`) got `TS2307: Cannot find module '@radix-ui/react-context'` from inside the published declarations.
