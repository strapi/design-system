import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { DateTimePicker } from '@strapi/design-system/next';
import { fn } from 'storybook/test';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Next/DateTimePicker',
  component: DateTimePicker,
  args: {
    disabled: false,
    placeholder: 'Pick a date and time',
    clearLabel: 'Clear',
    onValueChange: fn(),
  },
  argTypes: {
    value: { control: 'date', description: 'The selected date and time.' },
    disabled: { description: 'If true, the trigger is dimmed and the popover cannot open.' },
    minDate: { control: 'date', description: 'Days before this are disabled in the calendar.' },
    maxDate: { control: 'date', description: 'Days after this are disabled in the calendar.' },
    placeholder: { description: 'Shown in the trigger when no value is selected.' },
    locale: { description: 'BCP-47 locale for the label, calendar and weekday order. Defaults to the browser locale.' },
    children: { control: false, description: 'Rendered under the time field, e.g. a timezone selector.' },
  },
  render: (args) => <DateTimePicker {...args} />,
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

export const Base = {
  name: 'base',
  render: function Render(args) {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <div style={{ maxWidth: '32rem' }}>
        <DateTimePicker {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
} satisfies Story;

export const WithMinDate = {
  name: 'with min date',
  render: function Render(args) {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <div style={{ maxWidth: '32rem' }}>
        <DateTimePicker {...args} minDate={new Date()} value={value} onValueChange={setValue} />
      </div>
    );
  },
} satisfies Story;

export const Disabled = {
  name: 'disabled',
  args: { disabled: true },
} satisfies Story;
