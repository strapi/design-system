import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DateTimePicker, type DateTimePickerProps } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

type DateTimePickerArgs = Pick<
  DateTimePickerProps,
  'clearLabel' | 'dateLabel' | 'disabled' | 'locale' | 'required' | 'size' | 'step' | 'timeLabel'
> & { invalid?: boolean; withClear?: boolean };

const meta: Meta<DateTimePickerArgs> = {
  title: 'Next/DateTimePicker',
  args: {
    clearLabel: 'clear',
    dateLabel: 'Choose date',
    disabled: false,
    invalid: false,
    locale: 'en-GB',
    required: false,
    size: 'M',
    step: 15,
    timeLabel: 'Choose time',
    withClear: true,
  },
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-GB', 'en-US', 'fr-FR', 'de-DE'],
    },
    size: {
      control: 'select',
      options: ['S', 'M'],
      table: { defaultValue: { summary: 'M' } },
    },
    step: {
      control: 'select',
      options: [5, 15, 30, 60],
      table: { defaultValue: { summary: '15' } },
    },
    invalid: {
      description: 'Sets `aria-invalid` on both inputs, which turns their borders red.',
    },
    withClear: {
      description: 'Passes `onClear`, which shows the clear buttons.',
    },
  },
  render: ({ invalid, withClear, ...args }) => (
    <div style={{ maxWidth: '48rem', minHeight: '44rem' }}>
      <DateTimePicker
        aria-invalid={invalid}
        defaultValue={new Date('2024-03-15T10:30:00')}
        onClear={withClear ? fn() : undefined}
        onValueChange={fn()}
        {...args}
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<DateTimePickerArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', maxWidth: '48rem' }}>
      <DateTimePicker locale="en-GB" />
      <DateTimePicker locale="en-GB" defaultValue={new Date('2024-03-15T10:30:00')} onClear={() => {}} />
      <DateTimePicker locale="en-GB" size="S" defaultValue={new Date('2024-03-15T10:30:00')} />
      <DateTimePicker locale="en-GB" disabled defaultValue={new Date('2024-03-15T10:30:00')} />
      <DateTimePicker locale="en-GB" aria-invalid />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;

const ControlledDateTimePicker = () => {
  const [value, setValue] = React.useState<Date | null>(new Date('2024-03-15T10:30:00'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '1.4rem' }}>
      <span id="publish-label">Publish at</span>
      <DateTimePicker
        aria-labelledby="publish-label"
        locale="en-GB"
        value={value}
        onValueChange={(date) => setValue(date ?? null)}
        onClear={() => setValue(null)}
      />
      <span>Value: {value ? value.toISOString() : 'none'}</span>
    </div>
  );
};

export const Controlled = {
  render: () => (
    <div style={{ maxWidth: '48rem', minHeight: '44rem' }}>
      <ControlledDateTimePicker />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'controlled',
} satisfies Story;
