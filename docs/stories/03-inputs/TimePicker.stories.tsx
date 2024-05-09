import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TimePicker> = {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <TimePicker
        {...props}
        aria-label="Lunchtime"
        value={value}
        onChange={(value) => updateArgs({ value })}
        onClear={() => updateArgs({ value: '' })}
      />
    );
  },
};

export const Base = {
  ...Template,
  parameters: {
    docs: {
      source: {
        code: outdent`
        <TimePicker
          label="Lunchtime"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const Steps = {
  ...Template,
  args: {
    ...Base.args,
    value: '12:00',
    step: 60,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <TimePicker
          label="Lunchtime"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          step={60}
        />
        `,
      },
    },
  },

  name: 'steps',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <TimePicker {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Steps.args,
    label: 'Time picker',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          error={error}
          hint={hint}
        >
          <Field.Label>{label}</Field.Label>
          <TimePicker id="with_field" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      `,
      },
    },
  },

  name: 'with field',
};
