<p align="center">
  <a href="https://strapi.io">
    <img src="./assets/logo.svg" width="318px" alt="Strapi logo" />
  </a>
</p>
<p align="center">
<a style='margin-right:10px' href="https://design-system.strapi.io/">Documentation</a>|<a style='margin-left:10px' href="https://design-system-git-main-strapijs.vercel.app/">Try components</a></p>
<br />

<p align="center">
  <a href="https://www.npmjs.org/package/@strapi/design-system">
    <img src="https://img.shields.io/npm/v/@strapi/design-system/latest.svg" alt="NPM Version" />
  </a>
    <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@strapi/design-system"/>
  <a href="https://github.com/strapi/design-system/actions/workflows/playwright-ci.yml">
    <img src="https://github.com/strapi/design-system/actions/workflows/playwright-ci.yml/badge.svg" alt="Playwright tests" />
  </a>
  <a href="https://discord.strapi.io">
    <img src="https://img.shields.io/discord/811989166782021633?label=Discord" alt="Strapi on Discord" />
  </a>
</p>

# Welcome! 👋👋👋

Strapi Design System provides guidelines and tools to help anyone make Strapi's contributions more cohesive and to build
plugins more efficiently.

## Installation

Install Strapi Design System and its peer dependencies:

```sh
$ yarn add react react-dom @strapi/design-system @strapi/icons styled-components react-router-dom

# or

$ npm i react react-dom @strapi/design-system @strapi/icons styled-components react-router-dom
```

## Usage

Wrap your application with the `ThemeProvider` and pass the default `lightTheme` provided by `@strapi/design-system`.

```jsx
import { ThemeProvider, lightTheme } from '@strapi/design-system';

function App({ children }) {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
}

export default App;
```

## Testing a specific branch

Make sure to have the project already cloned (see previous point). Then, run the following commands:

```sh
# Inside the folder
$ git checkout BRANCH_NAME # BRANCH_NAME concerns the modifications to tests
$ yarn setup # reinstall dependencies & prepare lerna packages
```

If you encounter problems doing so, run the following command and retry the previous one:

```sh
$ git reset --hard
```

## Connecting to Strapi

If you want to analyze the admin bundle and the impact each library has on the over all application you can link this repo to your copy of [@strapi/strapi](https://github.com/strapi/strapi).

First, run `yarn build` in `strapi-design-system/packages/strapi-design-system` to generate the bundle.

In your copy of Strapi you can link the design system using either a [relative path](#relative-path) or [yarn link](#yarn-link).

### Relative path

Replace the version number in both `strapi/packages/core/admin/package.json` and `strapi/packages/core/helper-plugin/package.json` with the relative path to your copy of the design system:

```
"@strapi/design-system": "link:../../../../strapi-design-system/packages/strapi-design-system"
```

### Yarn link

Alternatively, you can use [`yarn link`](https://classic.yarnpkg.com/lang/en/docs/cli/link/) by first running `yarn link` in `strapi-design-system/packages/design-system` and then `yarn link @strapi/design-system` in both `strapi/packages/core/admin` and `strapi/packages/core/helper-plugin`. With this approach, no changes need to be made to the `package.json`

Once the link is setup, run the following command from the root of `@strapi/strapi`

```
yarn lerna clean && yarn setup
```
