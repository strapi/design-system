import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DatePicker, type DatePickerProps } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

type DatePickerArgs = Pick<
  DatePickerProps,
  'calendarLabel' | 'clearLabel' | 'disabled' | 'locale' | 'monthSelectLabel' | 'required' | 'size' | 'yearSelectLabel'
> & { invalid?: boolean; withClear?: boolean };

const meta: Meta<DatePickerArgs> = {
  title: 'Next/DatePicker',
  args: {
    calendarLabel: 'Choose date',
    clearLabel: 'Clear',
    disabled: false,
    invalid: false,
    locale: 'en-GB',
    monthSelectLabel: 'Month',
    required: false,
    size: 'M',
    withClear: true,
    yearSelectLabel: 'Year',
  },
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-GB', 'en-US', 'fr-FR', 'de-DE', 'ja-JP'],
      description: 'The format of the date, the names of the months and days, and the first day of the week.',
    },
    size: {
      control: 'select',
      options: ['S', 'M'],
      table: { defaultValue: { summary: 'M' } },
    },
    invalid: {
      description: 'Sets `aria-invalid` on the input, which turns the border red.',
    },
    withClear: {
      description: 'Passes `onClear`, which shows a clear button while there is a date.',
    },
  },
  render: ({ invalid, withClear, ...args }) => (
    <div style={{ maxWidth: '32rem', minHeight: '44rem' }}>
      <DatePicker
        aria-label="Date"
        aria-invalid={invalid}
        defaultValue={new Date('2024-03-15')}
        onClear={withClear ? fn() : undefined}
        onValueChange={fn()}
        {...args}
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<DatePickerArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 28rem)', gap: '1.6rem' }}>
      <DatePicker aria-label="Empty" locale="en-GB" />
      <DatePicker aria-label="With a date" locale="en-GB" defaultValue={new Date('2024-03-15')} onClear={() => {}} />
      <DatePicker aria-label="Small" locale="en-GB" size="S" defaultValue={new Date('2024-03-15')} />
      <DatePicker aria-label="Disabled" locale="en-GB" disabled defaultValue={new Date('2024-03-15')} />
      <DatePicker aria-label="Invalid" locale="en-GB" aria-invalid />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;

export const MinAndMaxDates = {
  args: {
    withClear: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '32rem', minHeight: '44rem' }}>
      <DatePicker
        aria-label="Date"
        locale={args.locale}
        minDate={new Date('2024-03-05')}
        maxDate={new Date('2024-03-25')}
        defaultValue={new Date('2024-03-15')}
      />
    </div>
  ),
  name: 'min and max dates',
} satisfies Story;

const ControlledDatePicker = () => {
  const [value, setValue] = React.useState<Date | undefined>(new Date('2024-03-15'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '1.4rem' }}>
      <DatePicker
        aria-label="Date"
        locale="en-GB"
        value={value ?? null}
        onValueChange={setValue}
        onClear={() => setValue(undefined)}
      />
      <span>Value: {value ? value.toISOString() : 'none'}</span>
    </div>
  );
};

export const Controlled = {
  render: () => (
    <div style={{ maxWidth: '32rem', minHeight: '44rem' }}>
      <ControlledDatePicker />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'controlled',
} satisfies Story;
