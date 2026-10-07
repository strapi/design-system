import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SearchForm, Searchbar } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta = {
  title: 'Next/Searchbar',
  component: Searchbar,
  args: {
    name: 'search',
    children: 'Search entries',
    clearLabel: 'Clear the search',
    placeholder: 'Search',
    value: '',
    onClear: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'The label of the input. It stays visually hidden.' },
    clearLabel: { description: 'The accessible name of the clear button.' },
    onClear: { description: 'Called by the clear button and by the Escape key, when the input has a value.' },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? '');

    return (
      <SearchForm style={{ maxWidth: '32rem' }} onSubmit={(event) => event.preventDefault()}>
        <Searchbar
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onClear={(event) => {
            setValue('');
            args.onClear(event);
          }}
        />
      </SearchForm>
    );
  },
} satisfies Meta<typeof Searchbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithValue = {
  args: {
    value: 'Strapi',
  },
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'with a value',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'disabled',
} satisfies Story;
