import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Information, Eye } from '@strapi/icons';

import { Field, FieldAction, FieldError, FieldHint, FieldLabel, Input } from '@strapi/design-system/next';

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
  title: 'Next/Field',
  component: Field,
  args: {
    name: 'title',
    hint: 'The title of the entry',
    error: '',
    required: false,
  },
  argTypes: {
    name: { description: 'The `name` of the control.' },
    hint: { description: 'A ReactNode under the control. `FieldError` replaces it when there is an error.' },
    error: {
      control: 'text',
      description: 'A string renders in `FieldError`. `true` marks the control as invalid without a message.',
      table: { type: { summary: 'string | boolean' } },
    },
    required: { description: 'Adds an asterisk to the label and `aria-required` to the control.' },
    id: { description: 'The id of the control. Generated when left out.' },
  },
  render: (args) => (
    <Field {...args} style={{ maxWidth: '32rem' }}>
      <FieldLabel>Title</FieldLabel>
      <Input placeholder="My first entry" />
      <FieldError />
      <FieldHint />
    </Field>
  ),
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithActions = {
  render: () => (
    <Field name="password" style={{ maxWidth: '32rem' }}>
      <FieldLabel
        action={
          <FieldAction label="About passwords">
            <Information />
          </FieldAction>
        }
      >
        Password
      </FieldLabel>
      <Input
        type="password"
        defaultValue="strapi"
        endAction={
          <FieldAction label="Show the password">
            <Eye />
          </FieldAction>
        }
      />
    </Field>
  ),
  name: 'label and input actions',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="default">
        <FieldLabel>Default</FieldLabel>
        <Input placeholder="Placeholder" />
      </Field>
      <Field name="hint" hint="A hint under the input">
        <FieldLabel>With a hint</FieldLabel>
        <Input defaultValue="Value" />
        <FieldHint />
      </Field>
      <Field name="error" error="This value is required" hint="Hidden by the error">
        <FieldLabel>With an error</FieldLabel>
        <Input defaultValue="Value" />
        <FieldError />
        <FieldHint />
      </Field>
      <Field name="required" required>
        <FieldLabel>Required</FieldLabel>
        <Input defaultValue="Value" />
      </Field>
      <Field name="disabled">
        <FieldLabel>Disabled</FieldLabel>
        <Input defaultValue="Value" disabled />
      </Field>
      <Field name="small">
        <FieldLabel>Size S</FieldLabel>
        <Input defaultValue="Value" size="S" />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
