# Strapi Design System

[![Version](https://img.shields.io/npm/v/@strapi/design-system?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/design-system)
[![Downloads](https://img.shields.io/npm/dt/@strapi/design-system.svg?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/design-system)
[![Discord Shield](https://img.shields.io/discord/811989166782021633?style=flat&colorA=4945ff&colorB=4945ff&label=discord&logo=discord&logoColor=f0f0ff)](https://discord.gg/strapi)

<b>A UI component library for creating amazing Strapi extensions.</b>

## Installation

```sh
$ yarn add react react-dom @strapi/design-system @strapi/icons styled-components react-router-dom

# or

$ npm i react react-dom @strapi/design-system @strapi/icons styled-components react-router-dom
```

## Getting Started

Wrap your application with the `DesignSystemProvider`. You can additionally pass a theme and/or locale, although you don't have to as we have default values for both.

```jsx
import { DesignSystemProvider, lightTheme } from '@strapi/design-system';

function MyApp({ children }) {
  return (
    <DesignSystemProvider locale="en-GB" theme={lightTheme}>
      {children}
    </DesignSystemProvider>
  );
}

export default App;
```

Then, checkout the complete [Storybook documentation](https://design-system-git-main-strapijs.vercel.app/) to find the components you want to use and how to use them.

## Contributing

Please follow our [CONTRIBUTING](https://github.com/strapi/design-system/blob/main/CONTRIBUTING.md) guidelines.

## License

Licensed under the MIT License, Copyright © 2015-present [Strapi Solutions SAS](https://strapi.io).

See [LICENSE](https://github.com/strapi/design-system/blob/main/LICENSE) for more information.
