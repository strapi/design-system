import { Meta, StoryObj } from '@storybook/react-vite';

import { Loader } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Loader> = {
  title: 'Next/Loader',
  component: Loader,
  args: {
    children: 'Loading content...',
    size: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text that screen readers announce. It is visually hidden.',
      table: { type: { summary: 'ReactNode' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '`default` is 6.3rem, `sm` is 2.4rem.',
      table: { type: { summary: "'default' | 'sm'" }, defaultValue: { summary: 'default' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
      <Loader>Loading content...</Loader>
      <Loader size="sm">Loading content...</Loader>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'sizes',
} satisfies Story;
