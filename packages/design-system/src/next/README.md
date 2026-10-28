# The `/next` tree

Experimental Strapi Design System using Tailwind CSS and shadcn.

## Important rules to keep in mind

### Every shadcn component gets a `React.forwardRef` wrapper

The shadcn registry output assumes React 19, where `ref` is a plain prop. On React 18 a function component does not receive `ref` in its props, so a component without the wrapper loses its ref. Add the wrapper to each component that the CLI generates. Remove the wrappers if the package moves to React 19.

### Every shadcn icon comes from `@strapi/icons`

A package in the `dependencies` of `@strapi/design-system` installs into every Strapi app, also when the `/next` feature flag is off ([strapi/strapi#27550](https://github.com/strapi/strapi/issues/27550)). An icon library adds more than 30 MB. `@strapi/icons` is already a dependency and holds the same Phosphor glyphs, so `/next` components take their icons from it.

`components.json` sets `iconLibrary` to `phosphor`, so `npx shadcn add` writes `import { XxxIcon } from '@phosphor-icons/react'`. That package is not installed, so the typecheck fails until you change the import. After each `npx shadcn add`, do these steps:

1. Change the import module to `@strapi/icons`, or to `@strapi/icons/bold` when the table says so.
2. Rename each icon with the table below.

| shadcn (Phosphor)     | Strapi icon        | Note                                                         |
| --------------------- | ------------------ | ------------------------------------------------------------ |
| `ArrowDownIcon`       | `ArrowDown`        |                                                              |
| `CaretDownIcon`       | `ChevronDown`      | Strapi `CaretDown` is the filled triangle, a different shape |
| `CaretUpIcon`         | `ChevronUp`        | Strapi `CaretUp` is the filled triangle, a different shape   |
| `CaretLeftIcon`       | `ChevronLeft`      |                                                              |
| `CaretRightIcon`      | `ChevronRight`     |                                                              |
| `CheckIcon`           | `Check`            |                                                              |
| `CheckCircleIcon`     | `CheckCircleEmpty` | `CheckCircle` is the filled glyph                            |
| `MinusIcon`           | `Minus`            |                                                              |
| `XIcon`               | `Cross`            |                                                              |
| `XCircleIcon`         | `XCircle`          | From `@strapi/icons/bold`                                    |
| `InfoIcon`            | `Info`             | From `@strapi/icons/bold`                                    |
| `WarningIcon`         | `Warning`          | From `@strapi/icons/bold`                                    |
| `MagnifyingGlassIcon` | `Search`           |                                                              |
| `DotsThreeIcon`       | `More`             |                                                              |
| `SpinnerIcon`         | `Loader`           |                                                              |
| `SidebarIcon`         | `Sidebar`          | From `@strapi/icons/bold`                                    |

The Strapi glyphs use the Phosphor bold or fill weight, and shadcn uses the regular weight. So a `/next` component shows the Strapi weight.

If a shadcn component needs an icon that is not in the table, add the Phosphor glyph to `@strapi/icons/bold` and `@strapi/icons/fill`, then add a row to the table. The icons overview in Storybook says how. Do not add an icon package to get it.

Each `@strapi/icons` icon calls `useTheme()` from styled-components. So a test that renders a `/next` component with an icon wraps it in `DesignSystemProvider`.

### Old DS components inside a `/next` overlay

Old DS components that open a layer in a portal (e.g., a Select, a Popover, or an IconButton with its tooltip) do not work inside a `/next` overlay (e.g., a Drawer). Use `/next` components there. Old DS components without a layer (e.g., a TextInput) work.
