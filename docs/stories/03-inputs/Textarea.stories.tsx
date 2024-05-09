import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Textarea, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
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
  name: 'with field',
};
