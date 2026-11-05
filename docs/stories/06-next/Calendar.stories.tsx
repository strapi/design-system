import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '@strapi/design-system/next';
import { fn } from 'storybook/test';

const meta: Meta<typeof Calendar> = {
  title: 'Next/Calendar',
  component: Calendar,
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    value: { control: 'date', description: 'The selected day. Only the date part is used.' },
    minDate: { control: 'date', description: 'Days before this are disabled.' },
    maxDate: { control: 'date', description: 'Days after this are disabled.' },
    locale: { description: 'BCP-47 locale for the weekday order and labels. Defaults to the browser locale.' },
  },
  render: (args) => <Calendar {...args} />,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Base = {
  name: 'base',
  render: function Render(args) {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return <Calendar {...args} value={value} onValueChange={setValue} />;
  },
} satisfies Story;

export const WithRange = {
  name: 'with min and max',
  render: function Render(args) {
    const [value, setValue] = useState<Date | undefined>(undefined);
    const min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 20);
    return <Calendar {...args} minDate={min} maxDate={max} value={value} onValueChange={setValue} />;
  },
} satisfies Story;
