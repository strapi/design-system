import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Calendar } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Calendar> = {
  title: 'Next/Calendar',
  parameters: { controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const SingleExample = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2021, 8, 8));

  return <Calendar locale="en-GB" mode="single" selected={date} onSelect={setDate} defaultMonth={date} />;
};

export const Base = {
  render: () => <SingleExample />,
  parameters: { chromatic: SNAPSHOT_LIGHT_AND_DARK },
  name: 'base',
} satisfies Story;

const RangeExample = () => {
  const [range, setRange] = React.useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: new Date(2021, 8, 6),
    to: new Date(2021, 8, 15),
  });

  return <Calendar locale="en-GB" mode="range" selected={range} onSelect={setRange} defaultMonth={range?.from} />;
};

export const Range = {
  render: () => <RangeExample />,
  parameters: { chromatic: SNAPSHOT_LIGHT_AND_DARK },
  name: 'range',
} satisfies Story;
