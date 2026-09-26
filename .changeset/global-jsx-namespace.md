---
'@strapi/design-system': patch
---

Replace the global `JSX` namespace with `React.JSX` in public type positions

`@types/react@19` removes the global `JSX` namespace; it only exists as `React.JSX`. Bare `JSX.Element` and `JSX.IntrinsicElements` references were leaking into the published `.d.ts` files through the exported types of `Box`, `Grid`, `Typography`, `TextButton`, `SearchForm` and the internal `PropsOf` helper, which broke consumers that had already upgraded to the v19 types.

These now use `React.JSX.*`. This is a type-only change with no runtime or API impact.
