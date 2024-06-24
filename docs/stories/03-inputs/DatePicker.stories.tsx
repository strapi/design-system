import { Meta, StoryObj } from '@storybook/react';
import { DatePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
  },
  args: {
    disabled: false,
    locale: 'en-GB',
    size: 'M',
  },
  render: ({ ...props }) => {
    return <DatePicker {...props} />;
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Base = {
  args: {
    initialDate: new Date(),
  },
  name: 'base',
} satisfies Story;

export const Disabled = {
  name: 'disabled',
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker disabled />
        `,
      },
    },
  },
} satisfies Story;

export const Size = {
  name: 'small size',
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker size="S" />
        `,
      },
    },
  },
} satisfies Story;

export const MinMaxDate = {
  args: {
    minDate: new Date('2022-01-01'),
    maxDate: new Date('2022-12-31'),
  },
  name: 'min/max date',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          {...props}
          minDate={new Date('2022-01-01')}
          maxDate={new Date('2022-12-31')}
        />
        `,
      },
    },
  },
} satisfies Story;

export const Locale = {
  args: {
    locale: 'de-DE',
  },
  name: 'locale',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          {...props}
          locale="de-DE"
        />
        `,
      },
    },
  },
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <DatePicker {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Base.args,
    label: 'Date',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          error={error}
          hint={hint}
        >
          <Field.Label>{label}</Field.Label>
          <DatePicker id="with_field" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      `,
      },
    },
  },

  name: 'with field',
};
