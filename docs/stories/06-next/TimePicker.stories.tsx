import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { TimePicker, type TimePickerProps } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

type TimePickerArgs = Pick<TimePickerProps, 'clearLabel' | 'disabled' | 'locale' | 'required' | 'size' | 'step'> & {
  invalid?: boolean;
  withClear?: boolean;
};

const meta: Meta<TimePickerArgs> = {
  title: 'Next/TimePicker',
  args: {
    clearLabel: 'Clear',
    disabled: false,
    invalid: false,
    locale: 'en-GB',
    required: false,
    size: 'M',
    step: 15,
    withClear: true,
  },
  argTypes: {
    step: {
      control: 'select',
      options: [1, 5, 10, 15, 30, 60],
      description: 'The minutes between two options. A step of 1 renders 1440 options, virtualized.',
      table: { defaultValue: { summary: '15' } },
    },
    locale: {
      control: 'select',
      options: ['en-GB', 'en-US', 'fr-FR', 'fi-FI'],
      description: 'The separator of the hours and the minutes.',
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
      description: 'Passes `onClear`, which shows a clear button while there is a time.',
    },
  },
  render: ({ invalid, withClear, ...args }) => (
    <div style={{ maxWidth: '24rem', minHeight: '40rem' }}>
      <TimePicker
        aria-label="Time"
        aria-invalid={invalid}
        defaultValue="10:30"
        onClear={withClear ? fn() : undefined}
        onValueChange={fn()}
        {...args}
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<TimePickerArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 20rem)', gap: '1.6rem' }}>
      <TimePicker aria-label="Empty" locale="en-GB" />
      <TimePicker aria-label="With a time" locale="en-GB" defaultValue="10:30" onClear={() => {}} />
      <TimePicker aria-label="Small" locale="en-GB" size="S" defaultValue="10:30" />
      <TimePicker aria-label="Disabled" locale="en-GB" disabled defaultValue="10:30" />
      <TimePicker aria-label="Invalid" locale="en-GB" aria-invalid />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;

const ControlledTimePicker = () => {
  const [value, setValue] = React.useState<string | undefined>('09:00');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '1.4rem' }}>
      <TimePicker
        aria-label="Time"
        locale="en-GB"
        value={value}
        onValueChange={setValue}
        onClear={() => setValue(undefined)}
      />
      <span>Value: {value ?? 'none'}</span>
    </div>
  );
};

export const Controlled = {
  render: () => (
    <div style={{ maxWidth: '24rem', minHeight: '40rem' }}>
      <ControlledTimePicker />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'controlled',
} satisfies Story;
