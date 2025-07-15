import { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  args: {
    disabled: false,
    locale: 'en-GB',
    size: 'M',
  },
  argTypes: {
    initialDate: {
      control: false,
      description: 'The initial date to be selected when the date picker opens. Defaults to the current date.',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'Now' },
      },
    },
    value: {
      control: false,
      description: 'The controlled selected date.',
      table: {
        type: { summary: 'Date' },
      },
    },
    minDate: {
      control: false,
      description: 'The minimum selectable date.',
      table: {
        type: { summary: 'Date' },
      },
    },
    maxDate: {
      control: false,
      description: 'The maximum selectable date.',
      table: {
        type: { summary: 'Date' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the date picker will be disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'If true, the date picker is a required field.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'Date changed',
      description: 'Callback function that fires when a new date is selected.',
      table: {
        type: { summary: 'function', detail: '(date: Date | undefined) => void' },
      },
    },
    onClear: {
      action: 'Date cleared',
      description: 'Callback function to handle clearing the date selection.',
      table: {
        type: {
          summary: 'function',
          detail: '(e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void',
        },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'Size of the input field for the date picker.',
      table: {
        type: { summary: "'S' | 'M'" },
        defaultValue: { summary: '"M"' },
      },
    },
    calendarLabel: {
      control: false,
      description: 'Label for the calendar component within the date picker.',
      table: {
        type: { summary: 'string' },
      },
    },
    clearLabel: {
      control: false,
      description: 'Label for the clear button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Clear"' },
      },
    },
    monthSelectLabel: {
      control: false,
      description: 'Label for the month dropdown in the calendar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Month"' },
      },
    },
    yearSelectLabel: {
      control: false,
      description: 'Label for the year dropdown in the calendar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Year"' },
      },
    },
    locale: {
      control: false,
      description: 'The locale to be used for date formatting (e.g., "en-US", "fr-FR").',
      table: {
        type: { summary: 'string' },
      },
    },
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
  name: 'Base',
} satisfies Story;

export const Disabled = {
  name: 'Disabled',
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
  name: 'Small size',
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
  name: 'Min/Max date',
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
  name: 'Locale',
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

  name: 'With field',
};

export const WithoutClearIcon = {
  name: 'Without clear icon',
  args: {
    onClear: undefined,
    initialDate: new Date(),
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker onClear={undefined} initialDate={new Date()} />
        `,
      },
    },
  },
} satisfies Story;
