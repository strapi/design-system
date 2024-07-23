import { Meta, StoryObj } from '@storybook/react';
import { TextInput, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
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
    placeholder: 'This is a content placeholder',
    size: 'M',
    type: 'text',
  },
  render: (props) => {
    return <TextInput {...props} />;
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Password = {
  args: {
    defaultValue: 'admin1234',
    type: 'password',
  },
  name: 'password',
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

export const WithField = {
  args: {
    label: 'Text',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <TextInput name="content" {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
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
          <TextInput placeholder="This is a content placeholder" name="content" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },

  name: 'with field',
};
