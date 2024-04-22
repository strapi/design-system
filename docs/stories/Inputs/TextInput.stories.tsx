import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TextInput, Field, FieldLabel, FieldHint, FieldError, Button } from '@strapi/design-system';
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
      <TextInput
        {...props}
        placeholder="This is a content placeholder"
        name="content"
        onChange={(e) => updateArgs({ value: e.target.value })}
        value={value}
      />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    value: '',
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
  render: ({ error }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>Text</FieldLabel>
        <TextInput placeholder="This is a content placeholder" name="content" error={error ? 'Error' : undefined} />
        <FieldError />
        <FieldHint />
        <Button variant="danger-light" onClick={() => updateArgs({ error: !error })}>
          {`${error ? 'Hide' : 'Show'} the error state`}
        </Button>
      </Field>
    );
  },
  args: {
    ...Disabled.args,
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
          <FieldLabel>Text</FieldLabel>
          <TextInput placeholder="This is a content placeholder" name="content" error={error ? 'Error' : undefined} />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
