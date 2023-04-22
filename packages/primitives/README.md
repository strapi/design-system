# Strapi Primitives

[![Version](https://img.shields.io/npm/v/@strapi/ui-primitives?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/ui-primitives)
[![Downloads](https://img.shields.io/npm/dt/@strapi/ui-primitives.svg?style=flat&colorA=4945ff&colorB=4945ff)](https://www.npmjs.com/package/@strapi/ui-primitives)
[![Discord Shield](https://img.shields.io/discord/811989166782021633?style=flat&colorA=4945ff&colorB=4945ff&label=discord&logo=discord&logoColor=f0f0ff)](https://discord.gg/strapi)

<b>A UI component library for building accessibile design systems & web apps.</b>

While typically we use [radix-ui primitives](https://github.com/radix-ui/primitives) in our design-system, there are some missing components. To solve this issue, we work with Radix's internal packages & APIs to develop base layer primitives in a composable manor until they are (hopefully) released through Radix and we can deprecate them here.

## Installation

```shell
yarn add @strapi/ui-primitives

# or

npm i @strapi/ui-primitives
```

## Component Documentation

This directory shows a basic usage of the component, however for more details click on the storybook badge.

<ul>
    <li><a href="#combobox">Combobox</a></li>
    <li><a href="#select">Select</a></li>
</ul>

### Combobox

[![](https://img.shields.io/badge/-storybook-%234945ff)](https://design-system-git-main-strapijs.vercel.app/?path=/story/design-system-primitives-combobox--basic-usage)

#### Basic Usage

```jsx
import { Combobox } from '@strapi/ui-primitives';

() => {
  return (
    <Combobox.Root>
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="1">
              <Combobox.ItemText>Option 1</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.NoValueFound>No value found</Combobox.NoValueFound>
            <Combobox.CreateItem>Create a new value</Combobox.CreateItem>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
```

### Select

[![](https://img.shields.io/badge/-storybook-%234945ff)](https://design-system-git-main-strapijs.vercel.app/?path=/story/design-system-primitives-select--basic-usage)

#### Basic Usage

```jsx
import { Select } from '@strapi/ui-primitives';

() => {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Pick me" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">
              <Select.ItemText>Option 1</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
```

## Contributing

Please follow our [CONTRIBUTING](https://github.com/strapi/design-system/blob/main/CONTRIBUTING.md) guidelines.

## License

Licensed under the MIT License, Copyright © 2022-present [Strapi Solutions SAS](https://strapi.io).

See [LICENSE](https://github.com/strapi/design-system/blob/main/LICENSE) for more information.
