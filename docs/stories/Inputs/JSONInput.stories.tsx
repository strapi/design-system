import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Field, JSONInput } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof JSONInput> = {
  title: 'Inputs/JSONInput',
  component: ({ ...props }) => {
    const editorRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <JSONInput
        {...props}
        value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
        aria-label="JSON"
        minHeight="235px"
        ref={editorRef}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof JSONInput>;

export const Base = {
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: `
<JSONInput 
  aria-label="JSON" 
  minHeight="235px" 
  ref={editorRef} 
  value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
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
  value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
/> 
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label }) => {
    const editorRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <JSONInput
          value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
          aria-label="JSON"
          minHeight="235px"
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
        <Field.Root id="with_field" error={error} hint={hint}>
          <Field.Label>{label}</Field.Label>
          <JSONInput
            value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
            aria-label="JSON"
            minHeight="235px"
            error={error}
            ref={editorRef}
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },
  name: 'with field',
};
