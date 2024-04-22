import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { ToggleInput, Button, Field, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof ToggleInput> = {
  title: 'Design System/Inputs/ToggleInput',
  component: ToggleInput,
};

export default meta;

type Story = StoryObj<typeof ToggleInput>;

const Template: Story = {
  render: ({ checked, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <ToggleInput
        label="Enabled"
        checked={checked}
        {...props}
        onLabel="True"
        offLabel="False"
        onChange={(e) => updateArgs({ checked: !checked })}
      />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    checked: true,
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
          onChange={handleChange}
        />
        `,
      },
    },
  },
  name: 'nullish',
} satisfies Story;

export const WithField = {
  render: ({ error }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <ToggleInput label="Enabled" onLabel="True" offLabel="False" error={error ? 'Error' : undefined} />
        <FieldError />
        <FieldHint />
        <Button variant="danger-light" onClick={() => updateArgs({ error: !error })}>
          {`${error ? 'Hide' : 'Show'} the error state`}
        </Button>
      </Field>
    );
  },
  args: {
    ...Base.args,
    error: false,
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          error={error ? 'Error' : undefined}
          hint={error ? undefined : 'Description line lorem ipsum'}
        >
          <FieldLabel>Toggle input</FieldLabel>
          <ToggleInput label="Enabled" onLabel="True" offLabel="False" error={error ? 'Error' : undefined} />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
