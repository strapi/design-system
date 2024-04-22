import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Textarea, Button, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Inputs/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Textarea
        {...props}
        placeholder="This is a content placeholder"
        name="content"
        onChange={(e) => updateArgs({ value: e.target.value })}
      >
        {value}
      </Textarea>
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

export const Disabled = {
  ...Template,

  args: {
    ...Base.args,
    disabled: true,
  },
  name: 'disabled',
} satisfies Story;

export const WithField = {
  render: ({ value, error }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>Textarea</FieldLabel>
        <Textarea placeholder="This is a content placeholder" name="content" error={error ? 'Error' : undefined}>
          {value}
        </Textarea>
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
          <FieldLabel>Textarea</FieldLabel>
          <Textarea error={error ? 'Error' : undefined} placeholder="This is a content placeholder" name="content">
            {value}
          </Textarea>
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
