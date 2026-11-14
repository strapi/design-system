---
'@strapi/design-system': patch
'@strapi/icons': patch
'@strapi/ui-primitives': patch
---

**Types**: the declaration files now resolve under TypeScript `moduleResolution: node16`/`nodenext`. These packages are `"type": "module"`, so their `.d.ts` files are ESM, and the extensionless paths TypeScript emitted (`./themes`, `styled-components/dist/types`) failed to resolve there: every named export went missing and the `styled-components` `DefaultTheme` augmentation was lost. The build now writes explicit paths (`./themes/index.js`); `bundler` resolution is unaffected.
