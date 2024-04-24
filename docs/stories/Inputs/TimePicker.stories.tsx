import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TimePicker> = {
  title: 'Inputs/TimePicker',
  component: TimePicker,
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

export const Sizing = {
  ...Template,
  args: {
    ...Steps.args,
    size: 'S',
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
          size='S'
        />
        `,
      },
    },
  },

  name: 'sizing',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <TimePicker id="with_field" error={error} {...props} />
        <FieldError />
        <FieldHint />
      </Field>
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
          <FieldLabel>{label}</FieldLabel>
          <TimePicker id="with_field" error={error} />
          <FieldError />
          <FieldHint />
        </Field>
      `,
      },
    },
  },

  name: 'with field',
};
