# The `/next` tree

Experimental Strapi Design System using Tailwind CSS and shadcn.

## Important rules to keep in mind

### Every shadcn component gets a `React.forwardRef` wrapper

The shadcn registry output assumes React 19, where `ref` is a plain prop. On React 18 a function component does not receive `ref` in its props, so a component without the wrapper loses its ref. Add the wrapper to each component that the CLI generates. Remove the wrappers if the package moves to React 19.

### Every shadcn icon comes from `@strapi/icons`

A package in the `dependencies` of `@strapi/design-system` installs into every Strapi app, also when the `/next` feature flag is off ([strapi/strapi#27550](https://github.com/strapi/strapi/issues/27550)). An icon library adds more than 30 MB. `@strapi/icons` is already a dependency and holds the same Phosphor glyphs, so `/next` components take their icons from it.

`components.json` sets `iconLibrary` to `phosphor`, so `npx shadcn add` writes `import { XxxIcon } from '@phosphor-icons/react'`. That package is not installed, so the typecheck fails until you change the import. After each `npx shadcn add`, change the import module to `@strapi/icons/regular`. The icon names stay the same.

`@strapi/icons/regular` holds the Phosphor regular weight, the weight that shadcn uses. If a shadcn component needs an icon that `@strapi/icons/regular` does not have, add the Phosphor glyph to it. The icons overview in Storybook says how. Do not add an icon package to get it.

Each `@strapi/icons` icon calls `useTheme()` from styled-components. So a test that renders a `/next` component with an icon wraps it in `DesignSystemProvider`.

### Old DS components inside a `/next` overlay

Old DS components that open a layer in a portal (e.g., a Select, a Popover, or an IconButton with its tooltip) do not work inside a `/next` overlay (e.g., a Drawer). Use `/next` components there. Old DS components without a layer (e.g., a TextInput) work.
