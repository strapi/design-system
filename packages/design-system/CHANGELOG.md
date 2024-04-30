# @strapi/design-system

## 2.0.0-beta.2

### Patch Changes

- [`f785c2c`](https://github.com/strapi/design-system/commit/f785c2ca80b05c5df405aac1ebd767b2c59d4c53) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: set dev dependencies correctly to avoid styled-components being bundled

- Updated dependencies [[`f785c2c`](https://github.com/strapi/design-system/commit/f785c2ca80b05c5df405aac1ebd767b2c59d4c53)]:
  - @strapi/ui-primitives@2.0.0-beta.2

## 2.0.0-beta.1

### Major Changes

- [#1696](https://github.com/strapi/design-system/pull/1696) [`1622c2b`](https://github.com/strapi/design-system/commit/1622c2be3fd2379cbbc15e6a408ccb6bedc6ea61) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: remove the Icon component

  Users should instead apply `fill` and `stroke` directly to the icon component as theme colors are now possible.

### Minor Changes

- [#1693](https://github.com/strapi/design-system/pull/1693) [`732330a`](https://github.com/strapi/design-system/commit/732330af34a9e60f21fd2565b01650f915e87ab8) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - feat: add logic spacing properties

### Patch Changes

- [`cb0147b`](https://github.com/strapi/design-system/commit/cb0147bc319d8bff9f5b76fdc046856d2c91c5f1) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: use px for media queries as font-size won't affect media queries

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#1685](https://github.com/strapi/design-system/pull/1685) [`833b58f`](https://github.com/strapi/design-system/commit/833b58fc8cd29ab279890e6eb50dea686ddf8289) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!(design-system): remove deprecated components. Most components have a V2 counterpart and those that do not e.g. Select have been split into separate components to handle Single & MultiSelect. Stack was just an alias of Flex so that should be used instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`9e68153`](https://github.com/strapi/design-system/commit/9e6815369f0b467ae37cf807ce19781319134cfe) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: remove direct imports. Users should import everything from the root of the project instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`00e131b`](https://github.com/strapi/design-system/commit/00e131b09eb0dbe760ac4fa45bda432f25856b8a) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - refactor!(design-system): set base font-size to 62.5% to be 10px, users should stop dividing their px values by 16 and instead divide by 10. This will make it easier to convert px to rem.

### Patch Changes

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.0
  - @strapi/icons@2.0.0-beta.0
