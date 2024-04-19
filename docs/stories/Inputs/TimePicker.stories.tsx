import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Button, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TimePicker> = {
  title: 'Design System/Inputs/TimePicker',
  component: TimePicker,
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <TimePicker
        label="Lunchtime"
        value={value}
        onChange={(value) => updateArgs({ value })}
        onClear={() => updateArgs({ value: '' })}
        {...props}
      />
    );
  },
};

export const Base = {
  ...Template,
  parameters: {
    docs: {
      source: {
        code: outdent`
        <TimePicker
          label="Lunchtime"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const Steps = {
  ...Template,
  args: {
    ...Base.args,
    step: 60,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <TimePicker
          label="Lunchtime"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          step={60}
        />
        `,
      },
    },
  },

  name: 'steps',
} satisfies Story;

export const Sizing = {
  ...Template,
  args: {
    ...Base.args,
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <TimePicker
          label="Lunchtime"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          size='S'
        />
        `,
      },
    },
  },

  name: 'sizing',
} satisfies Story;

export const WithField = {
  render: ({ error, disabled }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        disabled={disabled}
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>Time picker</FieldLabel>
        <TimePicker label="Lunchtime" error={error ? 'Error' : undefined} />
        <FieldError />
        <FieldHint />
        <Button variant="danger-light" onClick={() => updateArgs({ error: !error })}>
          {`${error ? 'Hide' : 'Show'} the error state`}
        </Button>
      </Field>
    );
  },
  args: {
    ...Steps.args,
    error: false,
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          disabled={disabled}
          error={error ? 'Error' : undefined}
          hint={error ? undefined : 'Description line lorem ipsum'}
        >
          <FieldLabel>Time picker</FieldLabel>
          <TimePicker label="Lunchtime" error={error ? 'Error' : undefined} />
          <FieldError />
          <FieldHint />
        </Field>
      `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
