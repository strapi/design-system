import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { ToggleInput, Field, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof ToggleInput> = {
  title: 'Inputs/ToggleInput',
  component: ToggleInput,
};

export default meta;

type Story = StoryObj<typeof ToggleInput>;

const Template: Story = {
  render: ({ checked, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <ToggleInput
        {...props}
        checked={checked}
        onLabel="True"
        offLabel="False"
        onChange={() => updateArgs({ checked: !checked })}
        onClear={() => updateArgs({ checked: null })}
      />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    checked: true,
    label: 'Enabled',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <ToggleInput
          label="Enabled"
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
          label="Enabled"
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

export const Nullish = {
  ...Template,
  args: {
    ...Base.args,
    checked: null,
    clearLabel: 'clear',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <ToggleInput
          label="Enabled"
          onLabel="True"
          offLabel="False"
          checked={null}
          clearLabel="clear"
          onClear={handleClear}
          onChange={handleChange}
        />
        `,
      },
    },
  },
  name: 'nullish',
} satisfies Story;

export const WithField = {
  render: ({ hint, error, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <ToggleInput id="with_field" onLabel="True" offLabel="False" error={error} label={label} {...props} />
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
