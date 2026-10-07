import { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Separator> = {
  title: 'Next/Divider',
  component: Separator,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'A horizontal line fills the width, a vertical one the height of its flex parent.',
      table: { type: { summary: "'horizontal' | 'vertical'" }, defaultValue: { summary: 'horizontal' } },
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: args.orientation === 'vertical' ? 'row' : 'column',
        gap: '1.6rem',
        height: args.orientation === 'vertical' ? '4rem' : undefined,
        fontSize: '1.4rem',
      }}
    >
      <span>Before</span>
      <Separator {...args} />
      <span>After</span>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;

export const Vertical = {
  args: {
    orientation: 'vertical',
  },
  name: 'vertical',
} satisfies Story;
