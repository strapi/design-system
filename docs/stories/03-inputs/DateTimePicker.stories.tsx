import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Inputs/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
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
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <DateTimePicker {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
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
          <Field.Label>{label}</Field.Label>
          <DateTimePicker id="with_field" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      `,
      },
    },
  },

  name: 'with field',
};
