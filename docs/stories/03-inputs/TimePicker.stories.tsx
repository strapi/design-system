import { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof TimePicker> = {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  argTypes: {
    step: {
      control: false,
      description: 'The time interval between options in minutes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '15' },
      },
    },
    value: {
      control: false,
      description: 'The selected time value in "HH:mm" format.',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: false,
      description: 'The default time value in "HH:mm" format.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function triggered when the time value changes.',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Callback function triggered when the input field loses focus.',
      table: {
        type: { summary: 'function', detail: '(event: React.FocusEvent<HTMLInputElement>) => void' },
      },
    },
    isPrintableCharacter: {
      control: false,
      description: 'A custom function to check if a character is not alphabetical, used to filter input.',
      table: {
        type: { summary: 'function', detail: '(str: string) => boolean' },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    disabled: false,
    size: 'M',
  },
  render: (props) => {
    return <TimePicker {...props} />;
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Base = {
  name: 'Base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'Disabled',
} satisfies Story;

export const Size = {
  args: {
    size: 'S',
  },
  name: 'Small size',
} satisfies Story;

export const Steps = {
  args: {
    step: 60,
  },
  name: 'Steps',
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <TimePicker {...props} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    ...Steps.args,
    label: 'Time picker',
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
          <TimePicker id="with_field" error={error} />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      `,
      },
    },
  },

  name: 'With Field',
};
