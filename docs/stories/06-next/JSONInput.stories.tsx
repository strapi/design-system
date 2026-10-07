import { useState, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Field, FieldError, FieldHint, FieldLabel, JSONInput } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const JSON_VALUE = JSON.stringify({ title: 'Hello', tags: ['strapi', 'cms'], published: true }, null, 2);

const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(32rem, 1fr))',
  gap: '2.4rem',
  alignItems: 'start',
} satisfies CSSProperties;

const meta = {
  title: 'Next/JSONInput',
  component: JSONInput,
  args: {
    value: JSON_VALUE,
    disabled: false,
    hasError: false,
    onChange: fn(),
  },
  argTypes: {
    value: { control: 'text', description: 'The text of the editor.' },
    onChange: { description: 'Called with the text of the editor on every change.' },
    disabled: { description: 'Makes the editor read-only.' },
    hasError: { description: 'Marks the editor as invalid. Inside a `Field`, its `error` does it.' },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);

    return (
      <Field name="metadata" hint="A JSON object" style={{ maxWidth: '48rem' }}>
        <FieldLabel>Metadata</FieldLabel>
        <JSONInput
          {...args}
          value={value}
          onChange={(next) => {
            setValue(next);
            args.onChange?.(next);
          }}
        />
        <FieldHint />
      </Field>
    );
  },
} satisfies Meta<typeof JSONInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="invalid" error="The JSON does not parse">
        <FieldLabel>Invalid JSON</FieldLabel>
        <JSONInput value={'{\n  "title": "Hello",\n  oops\n}'} />
        <FieldError />
      </Field>
      <Field name="disabled">
        <FieldLabel>Disabled</FieldLabel>
        <JSONInput value={JSON_VALUE} disabled />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
