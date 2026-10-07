import { useState, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Checkbox } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const COLUMN_STYLE = { display: 'flex', flexDirection: 'column', gap: '1.6rem' } satisfies CSSProperties;

const meta = {
  title: 'Next/Checkbox',
  component: Checkbox,
  args: {
    children: 'Accept the terms',
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'A label next to the box. Without it, give an `aria-label`.' },
    checked: {
      control: 'select',
      options: [undefined, true, false, 'indeterminate'],
      description: "`'indeterminate'` shows a dash.",
      table: { type: { summary: "boolean | 'indeterminate'" } },
    },
    disabled: { description: 'Greys the box out and ignores clicks.' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={COLUMN_STYLE}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox checked="indeterminate">Indeterminate</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled checked>
        Disabled and checked
      </Checkbox>
      <Checkbox aria-label="Without a label" />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;

const ITEMS = ['Articles', 'Authors', 'Categories'];

export const SelectAll = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['Articles']);
    const allSelected = selected.length === ITEMS.length;

    return (
      <div style={COLUMN_STYLE}>
        <Checkbox
          checked={selected.length > 0 && !allSelected ? 'indeterminate' : allSelected}
          onCheckedChange={(checked) => setSelected(checked ? ITEMS : [])}
        >
          Select all
        </Checkbox>
        {ITEMS.map((item) => (
          <Checkbox
            key={item}
            checked={selected.includes(item)}
            onCheckedChange={(checked) =>
              setSelected((current) => (checked ? [...current, item] : current.filter((value) => value !== item)))
            }
          >
            {item}
          </Checkbox>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
  name: 'select all',
} satisfies Story;
