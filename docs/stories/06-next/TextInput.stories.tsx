import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Cross, Search } from '@strapi/icons';
import { fn } from 'storybook/test';

import { Field, FieldAction, FieldLabel, Input } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(26rem, 1fr))',
  gap: '2.4rem',
  alignItems: 'end',
} satisfies CSSProperties;

const meta = {
  title: 'Next/TextInput',
  component: Input,
  args: {
    'aria-label': 'Title',
    placeholder: 'My first entry',
    disabled: false,
    hasError: false,
    size: 'M',
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M'],
      description: 'The legacy sizes: `M` is 40px high on desktop, `S` is 32px.',
      table: { type: { summary: "'S' | 'M'" }, defaultValue: { summary: 'M' } },
    },
    hasError: { description: 'Marks the input as invalid. Inside a `Field`, its `error` does it.' },
    disabled: { description: 'Greys the box out and ignores input.' },
    startAction: { control: false, description: 'A node before the text.' },
    endAction: { control: false, description: 'A node after the text.' },
    className: { description: 'Classes for the bordered box. The `ref` points at the `<input>`.' },
  },
  render: (args) => (
    <div style={{ maxWidth: '32rem' }}>
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="m">
        <FieldLabel>Size M</FieldLabel>
        <Input placeholder="Placeholder" />
      </Field>
      <Field name="s">
        <FieldLabel>Size S</FieldLabel>
        <Input placeholder="Placeholder" size="S" />
      </Field>
      <Field name="value">
        <FieldLabel>With a value</FieldLabel>
        <Input defaultValue="Strapi" />
      </Field>
      <Field name="error" error>
        <FieldLabel>Invalid</FieldLabel>
        <Input defaultValue="Strapi" />
      </Field>
      <Field name="disabled">
        <FieldLabel>Disabled</FieldLabel>
        <Input defaultValue="Strapi" disabled />
      </Field>
      <Field name="actions">
        <FieldLabel>With actions</FieldLabel>
        <Input
          defaultValue="Strapi"
          startAction={<Search aria-hidden />}
          endAction={
            <FieldAction label="Clear">
              <Cross />
            </FieldAction>
          }
        />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
