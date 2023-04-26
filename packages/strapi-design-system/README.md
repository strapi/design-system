<p align="center">
  <a href="https://strapi.io">
    <img src="./assets/logo.svg" width="318px" alt="Strapi logo" />
  </a>
</p>
<p align="center">
<a style='margin-right:10px' href="https://design-system.strapi.io/">Documentation</a>|<a style='margin-left:10px' href="https://design-system-git-main-strapijs.vercel.app/">Try components</a></p>
<br />

[![Version](https://img.shields.io/npm/v/@strapi/design-system?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/design-system)
[![Downloads](https://img.shields.io/npm/dt/@strapi/design-system.svg?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/design-system)
[![Discord Shield](https://img.shields.io/discord/811989166782021633?style=flat&colorA=4945ff&colorB=4945ff&label=discord&logo=discord&logoColor=f0f0ff)](https://discord.gg/strapi)

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

## Getting Started

Wrap your application with the `ThemeProvider` and pass the default `lightTheme` or `darkTheme` provided by `@strapi/design-system`.

```jsx
import { ThemeProvider, lightTheme } from '@strapi/design-system';

function MyApp({ children }) {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
}

export default App;
```

Then, checkout the complete [Storybook documentation](https://design-system-git-main-strapijs.vercel.app/) to find the components you want to use and how to use them.

## Contributing

Please follow our [CONTRIBUTING](https://github.com/strapi/design-system/blob/main/CONTRIBUTING.md) guidelines.

## License

Licensed under the MIT License, Copyright © 2015-present [Strapi Solutions SAS](https://strapi.io).

See [LICENSE](https://github.com/strapi/design-system/blob/main/LICENSE) for more information.
