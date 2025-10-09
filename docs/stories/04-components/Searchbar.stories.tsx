import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Searchbar, SearchForm } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Searchbar> = {
  title: 'Components/Searchbar',
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
  parameters: {
    docs: {
      source: {
        code: outdent`
          const [value, setValue] = React.useState('');

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
        `,
      },
    },
  },
  name: 'base',
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
  parameters: {
    docs: {
      source: {
        code: outdent`
          const [value, setValue] = React.useState('');

          <SearchForm>
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
          </SearchForm>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;
