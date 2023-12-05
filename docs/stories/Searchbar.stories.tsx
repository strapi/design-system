import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Searchbar, SearchForm } from '@strapi/design-system';

const meta: Meta<typeof Searchbar> = {
  title: 'Design System/Components/Searchbar',
  component: Searchbar,
};

export default meta;

type Story = StoryObj<typeof Searchbar>;

export const Base = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <SearchForm>
        <Searchbar
          name="searchbar"
          onClear={() => setValue('')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearLabel="Clearing the plugin search"
          placeholder="e.g: strapi-plugin-abcd"
        >
          Searching for a plugin
        </Searchbar>
      </SearchForm>
    );
  },

  name: 'base',
} satisfies Story;

export const SizeS = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <SearchForm>
        <Searchbar
          name="searchbar"
          onClear={() => setValue('')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearLabel="Clearing the plugin search"
          placeholder="e.g: strapi-plugin-abcd"
          size="S"
        >
          Searching for a plugin
        </Searchbar>
      </SearchForm>
    );
  },

  name: 'size S',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <Searchbar
        name="searchbar"
        onClear={() => setValue('')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearLabel="Clearing the plugin search"
        placeholder="e.g: strapi-plugin-abcd"
        disabled
      >
        Searching for a plugin
      </Searchbar>
    );
  },

  name: 'disabled',
} satisfies Story;
