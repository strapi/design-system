import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TextInput, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <TextInput {...props} name="content" onChange={(e) => updateArgs({ value: e.target.value })} value={value} />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    value: '',
    placeholder: 'This is a content placeholder',
  },
  name: 'base',
} satisfies Story;

export const SizeS = {
  ...Template,
  args: {
    ...Base.args,
    size: 'S',
  },

  name: 'size S',
} satisfies Story;

export const Password = {
  ...Template,
  args: {
    ...SizeS.args,
    value: 'admin1234',
    type: 'password',
  },

  name: 'password',
} satisfies Story;

export const Disabled = {
  ...Template,
  args: {
    ...Password.args,
    type: 'text',
    disabled: true,
  },

  name: 'disabled',
} satisfies Story;

export const WithField = {
  args: {
    ...Base.args,
    label: 'Text',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <TextInput name="content" error={error} {...props} />
        <FieldError />
        <FieldHint />
      </Field>
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
          <FieldLabel>{label}</FieldLabel>
          <TextInput placeholder="This is a content placeholder" name="content" error={error} />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
};
