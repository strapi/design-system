import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Switch } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const COLUMN_STYLE = { display: 'flex', flexDirection: 'column', gap: '1.6rem' } satisfies CSSProperties;

const meta = {
  title: 'Next/Switch',
  component: Switch,
  args: {
    'aria-label': 'Enable the webhook',
    visibleLabels: true,
    onLabel: 'Enabled',
    offLabel: 'Disabled',
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    visibleLabels: { description: 'Shows `onLabel` or `offLabel` next to the switch.' },
    onLabel: { description: 'The text shown when the switch is on.' },
    offLabel: { description: 'The text shown when the switch is off.' },
    checked: { control: 'boolean', description: 'The state, controlled.' },
    defaultChecked: { description: 'The state at first, uncontrolled.' },
    disabled: { description: 'Greys the switch out and ignores clicks.' },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={COLUMN_STYLE}>
      <Switch aria-label="Off" visibleLabels />
      <Switch aria-label="On" visibleLabels defaultChecked />
      <Switch aria-label="Disabled off" visibleLabels disabled />
      <Switch aria-label="Disabled on" visibleLabels disabled defaultChecked />
      <Switch aria-label="Without labels" />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
