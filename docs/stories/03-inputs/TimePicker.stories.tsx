import { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TimePicker> = {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
  },
  args: {
    disabled: false,
    size: 'M',
  },
  render: (props) => {
    return <TimePicker {...props} />;
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'disabled',
} satisfies Story;

export const Size = {
  args: {
    size: 'S',
  },
  name: 'small size',
} satisfies Story;

export const Steps = {
  args: {
    step: 60,
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
