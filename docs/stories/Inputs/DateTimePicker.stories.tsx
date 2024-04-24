import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, Field, FieldHint, FieldError, FieldLabel } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Inputs/DateTimePicker',
  component: DateTimePicker,
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

const Template: Story = {
  render: ({ ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <DateTimePicker
        {...props}
        onChange={(value) => updateArgs({ value })}
        onClear={() =>
          updateArgs(() => {
            value: undefined;
          })
        }
      />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    initialDate: new Date('1994-12-18T15:00:00.000Z'),
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DateTimePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          initialDate={new Date('1994-12-18T15:00:00.000Z')}
        />
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const Disabled = {
  ...Template,
  args: {
    ...Base.args,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DateTimePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          initialDate={new Date('1994-12-18T15:00:00.000Z')}
          disabled
        />
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <DateTimePicker id="with_field" error={error} {...props} />
        <FieldError />
        <FieldHint />
      </Field>
    );
  },
  args: {
    ...Base.args,
    label: 'Date Time picker',
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
          <DateTimePicker id="with_field" error={error} />
          <FieldError />
          <FieldHint />
        </Field>
      `,
      },
    },
  },

  name: 'with field',
};
