# Breaking Changes Migration guide

## What is this?

This is a living document of all the breaking changes in v2 of the design system. If you've added a breaking change, you'll be expected to update this document accordingly.

## Changelog

### Remove direct imports

Users can no longer `import { Combobox } from '@strapi/design-system/Combobox'`, instead they should import _all_ things from the root of the project.

### Published types

`@strapi/design-system` now comes with typescript definitions. This means you can remove any overrides you may have. They've been tested against the CMS, if you feel there are mistakes, please open a PR to fix them.
