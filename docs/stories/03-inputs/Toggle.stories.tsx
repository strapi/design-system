import { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof Toggle> = {
  title: 'Inputs/Toggle',
  component: Toggle,
  argTypes: {
    onLabel: {
      control: 'text',
      description: 'The label displayed when the toggle is in the "on" state.',
      table: {
        type: { summary: 'string' },
      },
      required: true,
    },
    offLabel: {
      control: 'text',
      description: 'The label displayed when the toggle is in the "off" state.',
      table: {
        type: { summary: 'string' },
      },
      required: true,
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the toggle.',
      table: {
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the toggle when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Manually sets the toggle into an error state.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: false,
      description: 'Marks the toggle as required for form validation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function triggered when the toggle state changes.',
      table: {
        type: { summary: 'function', detail: '(event: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

const Template: Story = {
  render: ({ checked, ...props }) => {
    const [, updateArgs] = useArgs();

    return <Toggle {...props} checked={checked} onChange={() => updateArgs({ checked: !checked })} />;
  },
};

export const Base: Story = {
  ...Template,
  args: {
    checked: true,
    offLabel: 'False',
    onLabel: 'True',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <ToggleInput
          onLabel="True"
          offLabel="False"
          checked={checked}
          onChange={handleChange}
        />
        `,
      },
    },
  },
  name: 'Base',
};

export const WithField = {
  render: ({ hint, error, label, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <Toggle
          onLabel="True"
          offLabel="False"
          onChange={(e) => updateArgs({ checked: e.currentTarget.checked })}
          {...props}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Base.args,
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
          <Field.Label>Toggle input</Field.Label>
          <ToggleInput id="with_field" label="Enabled" onLabel="True" offLabel="False" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },

  name: 'With Field',
};
