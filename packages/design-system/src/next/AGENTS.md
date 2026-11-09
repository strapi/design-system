# Agent checklist for `src/next/`

Follow this checklist when you run `npx shadcn add` or edit files under `src/next/`. The [README](./README.md) has the details.

- Run `npx shadcn add` from `packages/design-system`, where `components.json` is.
- Change the icon import as [Every shadcn icon comes from `@strapi/icons`](./README.md#every-shadcn-icon-comes-from-strapiicons) says.
- Add the `React.forwardRef` wrapper as [Every shadcn component gets a `React.forwardRef` wrapper](./README.md#every-shadcn-component-gets-a-reactforwardref-wrapper) says.
- Wrap a test that renders an icon in `DesignSystemProvider`.
- Never add `lucide-react`, `@phosphor-icons/react` or any other icon package to `package.json`.
