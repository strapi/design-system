import { Meta, StoryObj } from '@storybook/react';
import { Field } from '@strapi/design-system';
import { outdent } from 'outdent';

interface Props extends Field.Props, Pick<Field.InputProps, 'type' | 'placeholder'> {
  label: string;
}

const meta: Meta<Props> = {
  title: 'Components/Field',
  render: ({ label, placeholder, type, ...props }) => {
    return (
      <Field.Root {...props}>
        <Field.Label>{label}</Field.Label>
        <Field.Input type={type} placeholder={placeholder} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    error: false,
    hint: null,
    label: 'First Name',
    name: 'firstname',
    placeholder: 'Ted Lasso',
    required: false,
    type: 'text',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field.Root name="firstname">
          <Field.Label>First Name</Field.Label>
          <Field.Input />
        </Field.Root>
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<Props>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Input = {
  name: 'input',
  args: {
    ...meta.args,
    type: 'password',
    label: 'New password',
    placeholder: 'Enter a new password',
  },
} satisfies Story;

export const Error = {
  name: 'error',
  args: {
    ...meta.args,
    error: 'This field is required',
  },
} satisfies Story;

export const Hint = {
  name: 'hint',
  args: {
    ...meta.args,
    hint: 'Your full legal name with any middle names',
  },
} satisfies Story;
