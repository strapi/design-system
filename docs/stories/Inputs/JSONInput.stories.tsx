import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Button, Field, FieldLabel, FieldHint, FieldError, JSONInput } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof JSONInput> = {
  title: 'Design System/Inputs/JSONInput',
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

export const Basic = {
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
  render: ({ error, disabled }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>JSON</FieldLabel>
        <JSONInput
          value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
          aria-label="JSON"
          minHeight="235px"
          error={error ? 'Error' : undefined}
          disabled={disabled}
        />
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
          <FieldLabel>JSON</FieldLabel>
          <JSONInput
            value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
            aria-label="JSON"
            minHeight="235px"
            error={error ? 'Error' : undefined}
            disabled={disabled}
          />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
