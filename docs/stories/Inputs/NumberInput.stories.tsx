import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Flex, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Flex direction="column" alignItems="stretch" gap={4}>
        <NumberInput {...props} value={value} onValueChange={(value) => updateArgs({ value: value })} />
      </Flex>
    );
  },
};

export const Base = {
  ...Template,
  args: {
    value: 3.14159265359,
    placeholder: 'Price(Eur)',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="Price(Eur)"
          name="price"
          value={3.14159265359}
        />`,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const WithInitialEmpty = {
  ...Template,
  args: {
    placeholder: 'Price(Eur)',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="Price(Eur)"
          name="price"
        />`,
      },
    },
  },
  name: 'with initial empty',
} satisfies Story;

export const Locale = {
  ...Template,

  args: {
    ...Base.args,
    locale: 'fr',
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="Price(Eur)"
          name="price"
          value={3.14159265359}
          locale="fr"
        />`,
      },
    },
  },
  name: 'locale',
} satisfies Story;

export const SizeS = {
  ...Template,
  args: {
    ...Locale.args,
    size: 'S',
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="Price(Eur)"
          name="price"
          value={3.14159265359}
          locale="fr"
          size="S"
        />`,
      },
    },
  },
  name: 'size S',
} satisfies Story;

export const Disabled = {
  ...Template,
  args: {
    ...SizeS.args,
    disabled: true,
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="Price(Eur)"
          name="price"
          value={3.14159265359}
          locale="fr"
          size="S"
          disabled
        />`,
      },
    },
  },

  name: 'disabled',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <NumberInput
          id="with_field"
          placeholder="Price(Eur)"
          onValueChange={(value) => updateArgs({ value: value })}
          value={3.14159265359}
        />
        <FieldError />
        <FieldHint />
      </Field>
    );
  },
  args: {
    ...Base.args,
    label: 'Number',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field id="with_field" error={error} hint={hint}>
          <FieldLabel>{label}</FieldLabel>
          <NumberInput
            id="with_field"
            placeholder="Price(Eur)"
            onValueChange={onChange}
            value={value}
          />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },
  name: 'with field',
};
