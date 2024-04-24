import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Toggle, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Toggle> = {
  title: 'Inputs/Toggle',
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

const Template: Story = {
  render: ({ checked, ...props }) => {
    const [, updateArgs] = useArgs();

    return <Toggle {...props} checked={checked} onChange={() => updateArgs({ checked: !checked })} />;
  },
};

export const Base = {
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
  name: 'base',
} satisfies Story;

export const SizeS = {
  ...Template,
  args: {
    ...Base.args,
    size: 'S',
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
          size='S'
        />
        `,
      },
    },
  },
  name: 'size S',
} satisfies Story;

export const WithField = {
  render: ({ hint, error, label, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <Toggle
          id="with_field"
          onLabel="True"
          offLabel="False"
          error={error}
          onChange={(e) => updateArgs({ checked: e.currentTarget.checked })}
          {...props}
        />
        <FieldError />
        <FieldHint />
      </Field>
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
          <FieldLabel>Toggle input</FieldLabel>
          <ToggleInput id="with_field" label="Enabled" onLabel="True" offLabel="False" error={error} />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
};
