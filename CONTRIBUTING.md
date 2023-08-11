# Contribute to Strapi Design System

The Strapi Design System is an open-source project administered by [the Strapi team](https://strapi.io/company). We
appreciate your interest and efforts to contribute to the Design System.

All efforts to contribute are highly appreciated, we recommend you open an issue prior to spending a lot of time making
a pull request that may not align with the project roadmap.

## Code of Conduct

This project and everyone participating in it are governed by the
[Strapi Code of Conduct](https://github.com/strapi/strapi/blob/master/CODE_OF_CONDUCT.md). By participating, you are
expected to uphold this code. Please read the
[full text](https://github.com/strapi/strapi/blob/master/CODE_OF_CONDUCT.md) so that you can read which actions may or
may not be tolerated.

## You found a bug

We are using [GitHub Issues](https://github.com/strapi/design-system/issues) to manage our public bugs. We keep a close
eye on this so before filing a new issue, try to make sure the problem does not already exist. You can also use the
[codesandbox template](https://codesandbox.io/s/strapi-design-system-r1vdp) to easily show us the bug.

---

## Before Submitting a Pull Request

The core team will review your pull request and will either merge it, request changes to it, or close it.

**Before submitting your pull request** make sure the following requirements are fulfilled:

- Fork the repository and create your branch from the current `release` branch or `main` depending on if you need code in the release branch already.
- Run `yarn setup` in the repository root.
- If you’ve fixed a bug or added code that should be tested, add the tests and then link the corresponding issue in
  either your commit or your PR.
- Ensure all test suites are passing:
  - `yarn test`
  - `yarn test:e2e`
- Make sure your code lints (`yarn lint`).

### Setup end-to-end (e2e) tests

1. Install Playwright `npx playwright@1.27.1 install --with-deps`
2. Install dependencies: `yarn install`
3. Run storybook `yarn storybook` and the e2e tests in parallel `yarn test:e2e`

## Development Workflow

Please follow the instructions below:

### 1. Fork the [repository](https://github.com/strapi/design-system)

[Go to the repository](https://github.com/strapi/design-system) and fork it to your own GitHub account.

### 2. Clone from your repository

```bash
git clone git@github.com:YOUR_USERNAME/design-system.git
```

### 3. Install the dependencies and start Storybook

Go to the root of the repository.

```bash
cd design-system
yarn setup
yarn develop
```

Storybook will be running on `localhost:6006` for you to test your changes to components or their documentation.

### 4. Start the website for documentation changes

Start the DS website to test your changes on the documentation library.

```bash
cd website
yarn
yarn dev
```

### 5. Submitting a PR

PRs should typically be aimed at a specific release branch (there should be one made, if not make one off `main` that correlates to the milestone you're aiming for).
Some circumstances will exist where this is not preferrable, e.g. updating the `workflow` files – this needs to be aimed at main to take any effect.

IF you submit a PR at `main` and it is merged, it is expected that you should update the existing release branches with `main`.

## Available commands

- `yarn analyze:bundle` Start webpack bundle analyzer in all packages.
- `yarn setup` Install dependencies and build all the packages.
- `yarn lint` Lint the codebase.
- `yarn test` Run the design system tests.
- `yarn test:ts`: Run the TypeScript tests.
- `yarn test:watch` Run an interactive test watcher.
- `yarn test:e2e` Run the end-to-end test suite.
- `yarn test:e2e:watch` Run an interactive end-to-end test watcher.
- `yarn test:snapshots` Generate snapshots.

## Linking the design system

### Strapi monorepo

To link the design system to the Strapi monorepo follow the steps outlined in the [contributor documentation](https://contributor.strapi.io/core/admin/link-strapi-design-system)

### React application

In your local copy of the design system run `yarn build` to generate the bundle.

In your application, link your local copy of the design system with [`yarn link`](https://yarnpkg.com/cli/link#gatsby-focus-wrapper):

```
yarn link -r ../<relative-path-to-strapi-design-system>
```

You can also link a local copy of a specific package. For example, if you want to link the package strapi-design-system, you can run:

```
yarn link -r ../<relative-path-to-strapi-design-system>/packages/strapi-design-system
```

You should also remove the webpack alias for `@strapi/design-system` in the Strapi monorepo at `packages/core/admin/webpack.alias.js`

Your application should now be using your local copy of the design system.

To revert back to the released version of the design system use [`yarn unlink`](https://yarnpkg.com/cli/unlink#usage):

```
yarn unlink ../<relative-path-to-strapi-design-system>
```
