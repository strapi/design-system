import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Field, JSONInput } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof JSONInput> = {
  title: 'Inputs/JSONInput',
  render: ({ ...props }) => {
    const editorRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <JSONInput
        {...props}
        value={JSON.stringify(
          [
            { a: 3, b: 4 },
            { a: 5, b: 6 },
          ],
          null,
          3,
        )}
        aria-label="JSON"
        ref={editorRef}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the input field is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function invoked when the JSON input value changes',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    value: {
      control: false,
      description: 'The value of the JSON input field.',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: '',
        },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'If true, the input field is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'Marks the field as required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: false,
      description: 'ID of the input field, useful for linking the field to form elements or for accessibility.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof JSONInput>;

export const Base = {
  name: 'Base',
  parameters: {
    docs: {
      source: {
        code: `
<JSONInput 
  aria-label="JSON"
  value={JSON.stringify(
    [
      { a: 3, b: 4 },
      { a: 5, b: 6 },
    ],
    null,
    3,
  )}
/> 
        `,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<JSONInput 
  disabled
  value={JSON.stringify(
    [
      { a: 3, b: 4 },
      { a: 5, b: 6 },
    ],
    null,
    3,
  )}
/> 
        `,
      },
    },
  },
  name: 'Disabled',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label }) => {
    const editorRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <JSONInput
          value={JSON.stringify(
            [
              { a: 3, b: 4 },
              { a: 5, b: 6 },
            ],
            null,
            3,
          )}
          aria-label="JSON"
          ref={editorRef}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    label: 'JSON',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field.Root id="with_field" error="Error" hint="Description line lorem ipsum">
          <Field.Label>JSON</Field.Label>
          <JSONInput
            value={JSON.stringify(
              [
                { a: 3, b: 4 },
                { a: 5, b: 6 },
              ],
              null,
              3,
            )}
            aria-label="JSON"
            error="Error"
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },
  name: 'With field',
};
