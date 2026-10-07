import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Earth } from '@strapi/icons';
import { fn } from 'storybook/test';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupItem,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango', 'Orange', 'Pear', 'Strawberry'];

interface SelectArgs extends Pick<SelectTriggerProps, 'size' | 'loading' | 'clearLabel'> {
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
  required?: boolean;
  withClear?: boolean;
}

const meta: Meta<SelectArgs> = {
  title: 'Next/Select',
  args: {
    clearLabel: 'Clear',
    disabled: false,
    invalid: false,
    loading: false,
    placeholder: 'Pick a fruit',
    required: false,
    size: 'M',
    withClear: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M'],
      description: 'The height of the trigger. It is taller on small screens, like the legacy select.',
      table: { defaultValue: { summary: 'M' } },
    },
    loading: {
      description: 'Shows a loader in place of the caret. The select stays usable.',
    },
    disabled: {
      description: 'If true, the select ignores clicks and looks greyed out.',
    },
    invalid: {
      description: 'Sets `aria-invalid` on the trigger, which turns its border red.',
    },
    withClear: {
      description: 'Passes `onClear` to the trigger, which shows a clear button while there is a value.',
    },
    clearLabel: {
      description: 'The accessible name of the clear button.',
      table: { defaultValue: { summary: 'Clear' } },
    },
  },
  render: ({ disabled, invalid, placeholder, required, withClear, ...args }) => (
    <div style={{ maxWidth: '32rem', minHeight: '24rem' }}>
      <Select<string> disabled={disabled} required={required} defaultValue="Banana">
        <SelectTrigger aria-label="Fruit" aria-invalid={invalid} onClear={withClear ? fn() : undefined} {...args}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export default meta;

type Story = StoryObj<SelectArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 28rem)', gap: '1.6rem' }}>
      <Select<string>>
        <SelectTrigger aria-label="Empty">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent />
      </Select>
      <Select<string> defaultValue="apple">
        <SelectTrigger aria-label="With a value" onClear={() => {}}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
      <Select<string> defaultValue="apple">
        <SelectTrigger aria-label="Small" size="S" startIcon={<Earth />}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
      <Select<string>>
        <SelectTrigger aria-label="Loading" loading>
          <SelectValue placeholder="Loading" />
        </SelectTrigger>
        <SelectContent />
      </Select>
      <Select<string> disabled defaultValue="apple">
        <SelectTrigger aria-label="Disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
      <Select<string>>
        <SelectTrigger aria-label="Invalid" aria-invalid>
          <SelectValue placeholder="Invalid" />
        </SelectTrigger>
        <SelectContent />
      </Select>
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
    <div style={{ maxWidth: '32rem', minHeight: '24rem' }}>
      <Select<string> defaultOpen defaultValue="Banana">
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;

export const Multiple = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', maxWidth: '32rem', minHeight: '28rem' }}>
      <Select<string, true> multiple defaultValue={['Apple', 'Cherry']}>
        <SelectTrigger aria-label="Fruits" onClear={() => {}}>
          <SelectValue placeholder="Pick fruits" />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select<string, true> multiple defaultValue={['Apple', 'Cherry']}>
        <SelectTrigger aria-label="Fruits as tags">
          <SelectValue placeholder="Pick fruits" withTags />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'multiple',
} satisfies Story;

const NESTED = [
  { label: 'Red fruits', values: ['Cherry', 'Strawberry'] },
  { label: 'Yellow fruits', values: ['Banana', 'Mango'] },
];

export const NestedGroups = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '32rem' }}>
      <Select<string, true> multiple defaultOpen defaultValue={['Cherry']}>
        <SelectTrigger aria-label="Fruits">
          <SelectValue placeholder="Pick fruits" />
        </SelectTrigger>
        <SelectContent>
          {NESTED.map((group) => (
            <SelectGroup key={group.label}>
              <SelectGroupItem values={group.values}>{group.label}</SelectGroupItem>
              {group.values.map((fruit) => (
                <SelectItem key={fruit} value={fruit} inset>
                  {fruit}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
          <SelectItem value="Apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'nested groups',
} satisfies Story;

export const Groups = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '24rem' }}>
      <Select<string>>
        <SelectTrigger aria-label="Food">
          <SelectValue placeholder="Pick a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="pear">Pear</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="leek">Leek</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'groups',
} satisfies Story;

const AsyncSelect = () => {
  const [items, setItems] = React.useState(() => Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`));
  const [loading, setLoading] = React.useState(false);

  const handleReachEnd = () => {
    if (loading || items.length >= 50) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, index) => `Item ${prev.length + index + 1}`)]);
      setLoading(false);
    }, 600);
  };

  return (
    <Select<string>>
      <SelectTrigger aria-label="Item" loading={loading}>
        <SelectValue placeholder="Scroll the list to load more" />
      </SelectTrigger>
      <SelectContent onReachEnd={handleReachEnd}>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const LoadMore = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '24rem' }}>
      <AsyncSelect />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'load more',
} satisfies Story;
