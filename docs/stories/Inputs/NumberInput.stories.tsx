import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Flex, Button, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof NumberInput> = {
  title: 'Design System/Inputs/NumberInput',
  component: NumberInput,
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

const Template: Story = {
  render: ({ value, ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <Flex direction="column" alignItems="stretch" gap={4}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          onValueChange={(value) => updateArgs({ value: value })}
          value={value}
          {...props}
        />
      </Flex>
    );
  },
};

export const Base = {
  ...Template,
  args: {
    value: 3.14159265359,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          value="3.14159265359"
        />`,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const WithInitialEmpty = {
  ...Template,
  args: {
    value: '',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          value=""
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
          placeholder="This is a content placeholder"
          name="content"
          value="3.14159265359"
          locale: "fr"
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
          placeholder="This is a content placeholder"
          name="content"
          value="3.14159265359"
          locale: "fr"
          size: "S"
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
          placeholder="This is a content placeholder"
          name="content"
          value="3.14159265359"
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
  render: ({ error, disabled }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        disabled={disabled}
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>Number</FieldLabel>
        <NumberInput
          placeholder="This is a content placeholder"
          value=""
          name="content"
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
          disabled={disabled}
          error={error ? 'Error' : undefined}
          hint={error ? undefined : 'Description line lorem ipsum'}
        >
          <FieldLabel>Number</FieldLabel>
          <NumberInput
            placeholder="This is a content placeholder"
            value=""
            name="content"
            error={error ? 'Error' : undefined} />
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies Story;
