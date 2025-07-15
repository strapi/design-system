import { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the input field when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    endAction: {
      control: false,
      description: 'A node (e.g., icon or button) displayed at the end of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Manually sets the input into an error state.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'Sets the size of the input field. Small ("S") or Medium ("M").',
      table: {
        type: { summary: "'S' | 'M'" },
        defaultValue: { summary: 'M' },
      },
    },
    startAction: {
      control: false,
      description: 'A node (e.g., icon or button) displayed at the start of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'datetime-local',
        'month',
        'week',
        'time',
        'color',
        'checkbox',
        'radio',
        'file',
        'range',
        'hidden',
      ],
      description:
        'Standard HTML input attribute, specifies the type of input, such as "text", "password", "email", etc.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
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
  name: 'Base',
} satisfies Story;

export const Password = {
  args: {
    defaultValue: 'admin1234',
    type: 'password',
  },
  name: 'Password',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'Disabled',
} satisfies Story;

export const Size = {
  args: {
    size: 'S',
  },
  name: 'Small Size',
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

  name: 'With Field',
};
