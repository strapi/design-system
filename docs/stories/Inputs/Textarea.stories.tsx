import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Textarea, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Textarea {...props} name="content" onChange={(e) => updateArgs({ value: e.target.value })}>
        {value}
      </Textarea>
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
} satisfies Story;

export const Disabled = {
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
  name: 'disabled',
} satisfies Story;

export const WithField = {
  render: ({ value, error, hint, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <Textarea id="with_field" name="textarea" error={error} {...props}>
          {value}
        </Textarea>
        <FieldError />
        <FieldHint />
      </Field>
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
        <Field id="with_field" error={error} hint={hint}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea id="with_field" name="textarea" error={error} {...props}>
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
};
