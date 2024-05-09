# @strapi/design-system

## 2.0.0-beta.3

### Major Changes

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - enhancement!: removed field wrapper components from inputs to streamline and inputs stories are moved under `stories/inputs` folder.

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: remove CreatableCombobox

  Users should instead use `<Combobox createable />`.

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore!: default color for Typography is currentColor

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - enhancement!: ToggleInput renamed to just Toggle

- [#1710](https://github.com/strapi/design-system/pull/1710) [`adbe237`](https://github.com/strapi/design-system/commit/adbe237f6735c1efada97e96b8afb99cb7fb6427) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: CardAction is now a react component

- [#1713](https://github.com/strapi/design-system/pull/1713) [`1613d94`](https://github.com/strapi/design-system/commit/1613d94e6ad9ee06ba0da6e290181a8cf708b8b0) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat!: refactor Field api

- [#1703](https://github.com/strapi/design-system/pull/1703) [`54ebfad`](https://github.com/strapi/design-system/commit/54ebfadc4c59d1f2c7b6923493916a7dc91025a3) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: removed CMS specific components.The following components have been removed from DS and moved to CMS where it belongs.

  - `Layout`
  - `HeaderLayout`
  - `TwoColsLayout`
  - `GridLayout`
  - `ActionLayout`
  - `ContentLayout`

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: Box/Flex/Grid & Typography are now all react components, they are no longer styled-components.

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: update to use styled-components@6

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: disallow use of as and instead use tag prop instead

### Minor Changes

- [#1697](https://github.com/strapi/design-system/pull/1697) [`6f59131`](https://github.com/strapi/design-system/commit/6f59131b54035299a27d6e068cce1df0d566f58c) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat: typography now extends Box

### Patch Changes

- [#1709](https://github.com/strapi/design-system/pull/1709) [`2f198e9`](https://github.com/strapi/design-system/commit/2f198e9007b6dc166398441f33f9b05e975f0e0e) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix(design-system): codemirror packages that aren't in package.json are declared as external

- [#1699](https://github.com/strapi/design-system/pull/1699) [`9fdfdde`](https://github.com/strapi/design-system/commit/9fdfdde1fac070ca4c5db200a2aa4643e1782ae8) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: main nav icon size was set to 1rem it should be 1.6rem

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.3

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