---
'@strapi/design-system': patch
'@strapi/ui-primitives': patch
---

chore: bump individual `@radix-ui/*` dependencies to the versions declared by `radix-ui@1.1.0`'s dependency manifest

Each `@radix-ui/*` package used by `@strapi/design-system` and `@strapi/ui-primitives` was bumped to the version pinned in the first unified `radix-ui` release with concrete version pins (`radix-ui@1.1.0`; `1.0.0`/`1.0.1` only declared `"latest"` placeholders and were not usable as a reference). `@radix-ui/number`, `@radix-ui/primitive` and `@radix-ui/react-use-previous`, which are not direct dependencies of the unified package, were bumped to their era-matched releases (by publish date, just before `radix-ui@1.1.0`).

`@radix-ui/react-primitive` crosses a major version (1.0.3 → 2.0.1) and dropped its `ComponentPropsWithoutRef` and `PropsWithoutRef` type exports; internal usages were switched to `React.ComponentPropsWithoutRef` instead. Separately, `Menu.tsx` referenced `DropdownMenu.MenuItemProps`, a type `@radix-ui/react-dropdown-menu` does not export (at 2.0.6 and 2.1.5 alike it is a local, non-exported alias); it now uses the exported `DropdownMenuItemProps`. Both references previously resolved to `any`, which is why neither surfaced as an error before.
