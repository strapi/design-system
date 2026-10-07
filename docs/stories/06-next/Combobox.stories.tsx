import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from '@strapi/icons';
import { fn } from 'storybook/test';

import { Combobox, ComboboxOption, type ComboboxProps } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const FOODS = [
  { value: 'bagel', label: 'Bagel' },
  { value: 'carbonara', label: 'Carbonara' },
  { value: 'hamburger', label: 'Hamburger' },
  { value: 'lasagna', label: 'Lasagna' },
  { value: 'pizza', label: 'Pizza' },
  { value: 'ramen', label: 'Ramen' },
  { value: 'tartuffo', label: 'Tartuffo' },
];

type ComboboxArgs = Pick<
  ComboboxProps,
  'autocomplete' | 'clearLabel' | 'creatable' | 'disabled' | 'loading' | 'placeholder' | 'required' | 'size'
> & { invalid?: boolean; withClear?: boolean };

const meta: Meta<ComboboxArgs> = {
  title: 'Next/Combobox',
  args: {
    autocomplete: 'both',
    clearLabel: 'Clear',
    creatable: false,
    disabled: false,
    invalid: false,
    loading: false,
    placeholder: 'Select or enter a value',
    required: false,
    size: 'M',
    withClear: true,
  },
  argTypes: {
    autocomplete: {
      control: 'select',
      options: ['none', 'list', 'both'],
      description: 'How typing filters the options. `both` also completes the text inline.',
      table: { defaultValue: { summary: "'both', or 'list' when creatable" } },
    },
    creatable: {
      control: 'select',
      options: [false, true, 'visible'],
      description: 'Adds a "create" option for a text that matches no option. `visible` always shows it.',
    },
    size: {
      control: 'select',
      options: ['S', 'M'],
      table: { defaultValue: { summary: 'M' } },
    },
    invalid: {
      description: 'Sets `aria-invalid` on the input, which turns the border red.',
    },
    withClear: {
      description: 'Passes `onClear`, which shows a clear button while there is a text.',
    },
  },
  render: ({ invalid, withClear, ...args }) => (
    <div style={{ maxWidth: '32rem', minHeight: '28rem' }}>
      <Combobox
        aria-label="Food"
        aria-invalid={invalid}
        onClear={withClear ? fn() : undefined}
        onCreateOption={fn()}
        {...args}
      >
        {FOODS.map((food) => (
          <ComboboxOption key={food.value} value={food.value}>
            {food.label}
          </ComboboxOption>
        ))}
      </Combobox>
    </div>
  ),
};

export default meta;

type Story = StoryObj<ComboboxArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 28rem)', gap: '1.6rem' }}>
      <Combobox aria-label="Empty">
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
      <Combobox aria-label="With a value" defaultValue="bagel" onClear={() => {}}>
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
      <Combobox aria-label="Small" size="S" defaultValue="bagel">
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
      <Combobox aria-label="Loading" loading>
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
      <Combobox aria-label="Disabled" disabled defaultValue="bagel">
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
      <Combobox aria-label="Invalid" aria-invalid>
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;

export const Open = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '32rem' }}>
      <Combobox aria-label="Food" defaultOpen defaultValue="hamburger">
        {FOODS.map((food) => (
          <ComboboxOption key={food.value} value={food.value}>
            {food.label}
          </ComboboxOption>
        ))}
      </Combobox>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;

const CreatableCombobox = () => {
  const [options, setOptions] = React.useState(FOODS);
  const [value, setValue] = React.useState<string>();

  return (
    <Combobox
      aria-label="Food"
      creatable
      creatableStartIcon={<Plus />}
      value={value}
      onValueChange={setValue}
      onCreateOption={(text) => {
        if (text) {
          setOptions((prev) => [...prev, { value: text.toLowerCase(), label: text }]);
          setValue(text.toLowerCase());
        }
      }}
    >
      {options.map((food) => (
        <ComboboxOption key={food.value} value={food.value}>
          {food.label}
        </ComboboxOption>
      ))}
    </Combobox>
  );
};

export const Creatable = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '32rem' }}>
      <CreatableCombobox />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'creatable',
} satisfies Story;

export const CreatableVisible = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '32rem' }}>
      <Combobox
        aria-label="Food"
        creatable="visible"
        createMessage={() => 'Create a new food'}
        creatableStartIcon={<Plus />}
        onCreateOption={fn()}
        defaultOpen
      >
        {FOODS.map((food) => (
          <ComboboxOption key={food.value} value={food.value}>
            {food.label}
          </ComboboxOption>
        ))}
      </Combobox>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'creatable, always visible',
} satisfies Story;

const AsyncCombobox = () => {
  const [items, setItems] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 15 }, (_, index) => `Entry ${prev.length + index + 1}`)]);
      setLoading(false);
    }, 600);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <Combobox aria-label="Entry" loading={loading} hasMoreItems={items.length < 60} onLoadMore={load}>
      {items.map((item) => (
        <ComboboxOption key={item} value={item}>
          {item}
        </ComboboxOption>
      ))}
    </Combobox>
  );
};

export const LoadMore = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '40rem' }}>
      <AsyncCombobox />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'async loading and load more',
} satisfies Story;

const MANY = Array.from({ length: 1000 }, (_, index) => `Option ${index + 1}`);

export const Virtualized = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '40rem' }}>
      <Combobox aria-label="Option">
        {MANY.map((option) => (
          <ComboboxOption key={option} value={option}>
            {option}
          </ComboboxOption>
        ))}
      </Combobox>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'a thousand options',
} satisfies Story;
