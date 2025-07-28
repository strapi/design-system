import { Meta, StoryObj } from '@storybook/react-vite';
import { DateTimePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Inputs/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, both the DatePicker and TimePicker fields are disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'If true, the DatePicker and TimePicker fields are required.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: false,
      description: 'The controlled value of the DateTimePicker. The value is a Date object or null.',
      table: {
        type: { summary: 'Date', detail: 'Date | null' },
      },
    },
    initialDate: {
      control: false,
      description: 'The initial date to be displayed when the DateTimePicker is first rendered.',
      table: {
        type: { summary: 'Date' },
      },
    },
    step: {
      control: false,
      description: 'The time step in minutes for the TimePicker field.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    onChange: {
      action: 'changed',
      description:
        'Callback fired when the selected date and/or time changes. The `date` parameter is the new Date object or `undefined`.',
      table: {
        type: { summary: 'function', detail: '(date: Date | undefined) => void' },
      },
    },
    onClear: {
      action: 'cleared',
      description: 'Callback fired when the clear button is clicked.',
      table: {
        type: {
          summary: 'function',
          detail: '(e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void',
        },
      },
    },
    clearLabel: {
      control: false,
      description: 'Label for the clear button. Used for both date and time fields.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'clear' },
      },
    },
    dateLabel: {
      control: false,
      description: 'Label for the DatePicker field.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose date' },
      },
    },
    timeLabel: {
      control: false,
      description: 'Label for the TimePicker field.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose time' },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'The size of the input fields for both DatePicker and TimePicker.',
      table: {
        type: { summary: "'S' | 'M'" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

const Template: Story = {
  render: ({ ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <DateTimePicker
        {...props}
        onChange={(value) => updateArgs({ value })}
        onClear={() =>
          updateArgs(() => {
            undefined;
          })
        }
      />
    );
  },
};

export const Base: Story = {
  ...Template,
  args: {
    initialDate: new Date('1994-12-18T15:00:00.000Z'),
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DateTimePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          initialDate={new Date('1994-12-18T15:00:00.000Z')}
        />
        `,
      },
    },
  },
  name: 'Base',
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Base.args,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DateTimePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          initialDate={new Date('1994-12-18T15:00:00.000Z')}
          disabled
        />
        `,
      },
    },
  },
  name: 'Disabled',
};

export const Size: Story = {
  ...Template,
  args: {
    ...Base.args,
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DateTimePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          initialDate={new Date('1994-12-18T15:00:00.000Z')}
          size="S"
        />
        `,
      },
    },
  },
  name: 'Small size',
};

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <DateTimePicker {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Base.args,
    label: 'Date Time picker',
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
          <DateTimePicker id="with_field" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      `,
      },
    },
  },

  name: 'With field',
};
