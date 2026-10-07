import { useState, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Field, FieldError, FieldHint, FieldLabel, NumberInput } from '@strapi/design-system/next';

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
  title: 'Next/NumberInput',
  component: NumberInput,
  args: {
    step: 1,
    disabled: false,
    locale: 'en-GB',
    onValueChange: fn(),
  },
  argTypes: {
    step: { description: 'The amount that the arrow buttons and the arrow keys add or remove.' },
    locale: { description: 'The locale that parses and formats the number. Defaults to `navigator.language`.' },
    value: { description: 'The number. The text follows it when the parent changes it.' },
    onValueChange: { description: 'Called with the number, or `undefined` for an empty or partial text.' },
  },
  render: function Render(args) {
    const [value, setValue] = useState<number | undefined>(1200);

    return (
      <Field name="price" hint="In euros" style={{ maxWidth: '32rem' }}>
        <FieldLabel>Price</FieldLabel>
        <NumberInput
          {...args}
          value={value}
          onValueChange={(next) => {
            setValue(next);
            args.onValueChange?.(next);
          }}
        />
        <FieldHint />
      </Field>
    );
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={GRID_STYLE}>
      <Field name="empty">
        <FieldLabel>Empty</FieldLabel>
        <NumberInput locale="en-GB" placeholder="0" />
      </Field>
      <Field name="decimal">
        <FieldLabel>Decimal step</FieldLabel>
        <NumberInput locale="en-GB" value={0.5} step={0.1} />
      </Field>
      <Field name="error" error="Must be positive">
        <FieldLabel>With an error</FieldLabel>
        <NumberInput locale="en-GB" value={-3} />
        <FieldError />
      </Field>
      <Field name="disabled">
        <FieldLabel>Disabled</FieldLabel>
        <NumberInput locale="en-GB" value={42} disabled />
      </Field>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
