# @strapi/design-system

## 2.0.0-beta.0

### Major Changes

- [#1685](https://github.com/strapi/design-system/pull/1685) [`833b58f`](https://github.com/strapi/design-system/commit/833b58fc8cd29ab279890e6eb50dea686ddf8289) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!(design-system): remove deprecated components. Most components have a V2 counterpart and those that do not e.g. Select have been split into separate components to handle Single & MultiSelect. Stack was just an alias of Flex so that should be used instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`9e68153`](https://github.com/strapi/design-system/commit/9e6815369f0b467ae37cf807ce19781319134cfe) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: remove direct imports. Users should import everything from the root of the project instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`00e131b`](https://github.com/strapi/design-system/commit/00e131b09eb0dbe760ac4fa45bda432f25856b8a) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - refactor!(design-system): set base font-size to 62.5% to be 10px, users should stop dividing their px values by 16 and instead divide by 10. This will make it easier to convert px to rem.

### Patch Changes

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.0
  - @strapi/icons@2.0.0-beta.0
