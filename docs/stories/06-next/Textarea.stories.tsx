import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Field, FieldError, FieldHint, FieldLabel, Textarea } from '@strapi/design-system/next';

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
  title: 'Next/Textarea',
  component: Textarea,
  args: {
    placeholder: 'A short description',
    disabled: false,
    hasError: false,
    resizable: true,
    onChange: fn(),
  },
  argTypes: {
    resizable: { description: 'Lets the user resize the textarea vertically.' },
    hasError: { description: 'Marks the textarea as invalid. Inside a `Field`, its `error` does it.' },
    disabled: { description: 'Greys the textarea out.' },
  },
  render: (args) => (
    <Field name="description" hint="Shown in the list view" style={{ maxWidth: '40rem' }}>
      <FieldLabel>Description</FieldLabel>
      <Textarea {...args} />
      <FieldHint />
    </Field>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="default">
        <FieldLabel>Default</FieldLabel>
        <Textarea placeholder="Placeholder" />
      </Field>
      <Field name="error" error="Too long">
        <FieldLabel>With an error</FieldLabel>
        <Textarea defaultValue="Lorem ipsum dolor sit amet" />
        <FieldError />
      </Field>
      <Field name="disabled">
        <FieldLabel>Disabled</FieldLabel>
        <Textarea defaultValue="Lorem ipsum dolor sit amet" disabled />
      </Field>
      <Field name="fixed">
        <FieldLabel>Not resizable</FieldLabel>
        <Textarea defaultValue="Lorem ipsum dolor sit amet" resizable={false} />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
