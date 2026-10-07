import { Meta, StoryObj } from '@storybook/react-vite';

import { Progress, ProgressLabel, ProgressValue } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Progress> = {
  title: 'Next/ProgressBar',
  component: Progress,
  args: {
    value: 40,
    size: 'default',
    'aria-label': 'Upload',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'The completion, between `min` and `max`. `null` renders an indeterminate bar.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '`default` is 10.2rem by 0.8rem, `sm` is 7.8rem by 0.4rem.',
      table: { type: { summary: "'default' | 'sm'" }, defaultValue: { summary: 'default' } },
    },
  },
  render: (args) => (
    // The track is light on purpose (`neutral600`), it sits on dark surfaces such as an upload card
    <div style={{ display: 'inline-flex', padding: '1.6rem', background: 'var(--neutral-800)', borderRadius: '4px' }}>
      <Progress {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Base = {
  name: 'base',
} satisfies Story;

export const SizesAndLabel = {
  render: () => (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '1.6rem',
        padding: '1.6rem',
        background: 'var(--neutral-800)',
        borderRadius: '4px',
      }}
    >
      <Progress value={70} aria-label="Default size" />
      <Progress value={70} size="sm" aria-label="Small size" />
      <Progress value={25}>
        <ProgressLabel style={{ color: 'var(--neutral-0)' }}>Uploading</ProgressLabel>
        <ProgressValue style={{ color: 'var(--neutral-0)' }} />
      </Progress>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'sizes and label',
} satisfies Story;
