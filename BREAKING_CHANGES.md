# Breaking Changes Migration guide

## What is this?

This is a living document of all the breaking changes in v2 of the design system. If you've added a breaking change, you'll be expected to update this document accordingly.

## Changelog

### Remove direct imports

Users can no longer `import { Combobox } from '@strapi/design-system/Combobox'`, instead they should import _all_ things from the root of the project.

### Published types

`@strapi/design-system` now comes with typescript definitions. This means you can remove any overrides you may have. They've been tested against the CMS, if you feel there are mistakes, please open a PR to fix them.

### Change font-size on html,body to 62.5%

The base font-size for the app is now 10px, so 1rem = 10px. This means that users should stop dividing their px values by 16 and instead divide by 10. This will make it easier to convert px to rem.

### Removed deprecated components

The following components have been replaced with their V2 counterpart:

- `Breadcrumbs`
- `Link`
- `LinkButton`
- `MainNav`
- `Pagination`
- `SimpleMenu`
- `SubNav`

The following components have been removed:

#### `Select` / `Option` / `OptGroup` / `SelectList`

These comoponents were deprecated previously. It is recommended to use the new iteration either the `SingleSelect` or `MultiSelect` components to replace them depending on your use case.

#### `Stack`

This was just a wrapped component around `Flex`. You should use `Flex` instead.

#### `ToggleCheckbox`

This is the same component as `ToggleInput` and therefore you should use that instead.

### Removed field wrapper components from inputs

We are streamlining inputs by removing unnecessary components like labels, hints, and error messages, focusing solely on the inputs themselves. This simplifies the structure and reduces DOM size, especially in cases where only aria-labels are needed. Users can still use Field components they used alongside inputs.
