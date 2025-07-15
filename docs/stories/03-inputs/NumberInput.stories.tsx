import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput, Flex, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
        <NumberInput placeholder="Price(Eur)" />`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
    onValueChange: {
      control: false,
      description: 'Callback function triggered when the value of the input changes.',
      type: { name: 'function', required: true },
      table: {
        type: { summary: 'function', detail: '(value: number | undefined) => void' },
      },
      defaultValue: { summary: '() => void;' },
    },
    locale: {
      control: false,
      description: 'Locale used for number formatting and parsing.',
      table: {
        type: { summary: 'string', detail: 'eg. en-EN, fr-FR' },
      },
      defaultValue: { summary: 'en-EN' },
    },
    value: {
      control: false,
      description: 'The controlled value of the input.',
      table: {
        type: { summary: 'number' },
      },
    },
    step: {
      control: 'number',
      description: 'The step size for incrementing or decrementing the value.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input when set to true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    defaultValue: 3.2,
    disabled: false,
    placeholder: 'Price(Eur)',
    size: 'M',
    onValueChange: () => {
      return;
    },
  },
  render: (props) => {
    return (
      <Flex direction="column" alignItems="stretch" gap={4}>
        <NumberInput {...props} />
      </Flex>
    );
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Base = {
  name: 'Base',
} satisfies Story;

export const Locale = {
  args: {
    locale: 'fr',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput {...props} locale="fr" />`,
      },
    },
  },
  name: 'Locale',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput {...props} disabled />`,
      },
    },
  },

  name: 'Disabled',
} satisfies Story;

export const Size = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput {...props} size="S" />`,
      },
    },
  },
  name: 'Small size',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <NumberInput
          id="with_field"
          placeholder="Price(Eur)"
          onValueChange={(value) => updateArgs({ value: value })}
          value={3.14159265359}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    label: 'Number',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field.Root id="with_field" error={error} hint={hint}>
          <Field.Label>{label}</Field.Label>
          <NumberInput
            id="with_field"
            placeholder="Price(Eur)"
            onValueChange={onChange}
            value={value}
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
