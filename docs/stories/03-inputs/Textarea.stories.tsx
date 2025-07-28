import { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
  argTypes: {
    value: {
      control: false,
      description: 'The value of the textarea, used for controlled components.',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: false,
      description:
        'The ID of an element that provides additional description for the textarea (used for accessibility).',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Manually sets the textarea into an error state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'Marks the textarea as required for form validation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text displayed inside the textarea.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return <Textarea {...props} name="content" onChange={(e) => updateArgs({ value: e.target.value })} value={value} />;
  },
};

export const Base: Story = {
  ...Template,
  args: {
    value: '',
    placeholder: 'This is a content placeholder',
  },
  name: 'Base',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Textarea
          placeholder="This is a content placeholder"
          name="content"
          value={value}
          onChange={handleChange}
        />`,
      },
    },
  },
};

export const Disabled: Story = {
  ...Template,

  args: {
    ...Base.args,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Textarea
          placeholder="This is a content placeholder"
          name="content"
          value={value}
          onChange={handleChange}
          disabled
        />`,
      },
    },
  },
  name: 'Disabled',
};

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" name="textarea" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <Textarea {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Base.args,
    label: 'Textarea',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field.Root id="with_field" error={error} hint={hint}>
          <Field.Label>{label}</Field.Label>
          <Textarea id="with_field" name="textarea" error={error} value={value} {...props}>
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },
  name: 'With Field',
};
