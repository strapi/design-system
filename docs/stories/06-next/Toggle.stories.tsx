import { useState, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldError, FieldHint, FieldLabel, Toggle } from '@strapi/design-system/next';

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
  alignItems: 'start',
} satisfies CSSProperties;

const meta = {
  title: 'Next/Toggle',
  component: Toggle,
  args: {
    onLabel: 'True',
    offLabel: 'False',
    disabled: false,
    hasError: false,
  },
  argTypes: {
    onLabel: { description: 'The text of the option for `true`.' },
    offLabel: { description: 'The text of the option for `false`.' },
    checked: {
      control: 'select',
      options: [true, false, null],
      description: '`null` selects neither option.',
      table: { type: { summary: 'boolean | null' } },
    },
    hasError: { description: 'Marks the toggle as invalid. Inside a `Field`, its `error` does it.' },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState<boolean | null>(args.checked ?? false);

    return (
      <Field name="published" hint="Visible on the site" style={{ maxWidth: '32rem' }}>
        <FieldLabel>Published</FieldLabel>
        <Toggle {...args} checked={checked} onChange={(event) => setChecked(event.target.checked)} />
        <FieldHint />
      </Field>
    );
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="false">
        <FieldLabel>False</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked={false} />
      </Field>
      <Field name="true">
        <FieldLabel>True</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked />
      </Field>
      <Field name="null">
        <FieldLabel>Null</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked={null} />
      </Field>
      <Field name="error" error="This value is required">
        <FieldLabel>With an error</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked={null} />
        <FieldError />
      </Field>
      <Field name="disabled-false">
        <FieldLabel>Disabled, false</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked={false} disabled />
      </Field>
      <Field name="disabled-true">
        <FieldLabel>Disabled, true</FieldLabel>
        <Toggle onLabel="True" offLabel="False" defaultChecked disabled />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
