import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Flex, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

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
  },
  args: {
    defaultValue: 3.2,
    disabled: false,
    placeholder: 'Price(Eur)',
    size: 'M',
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
  name: 'base',
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
  name: 'locale',
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

  name: 'disabled',
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
  name: 'small size',
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
  name: 'with field',
};
