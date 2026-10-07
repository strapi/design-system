import { Meta, StoryObj } from '@storybook/react-vite';
import { Information } from '@strapi/icons';
import { fn } from 'storybook/test';

import { Tag } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Tag> = {
  title: 'Next/Tag',
  component: Tag,
  args: {
    children: 'date is null',
    label: 'Remove filter',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    icon: {
      control: false,
      description: 'The icon of the button.',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: '<Cross />' } },
    },
    label: { description: 'The accessible name of the button.' },
    disabled: { description: 'Disables the button and greys the Tag out.' },
  },
  render: (args) => <Tag {...args} />,
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
      <Tag label="Remove filter" onClick={fn()}>
        date is null
      </Tag>
      <Tag icon={<Information />} label="More about this filter">
        Hello world
      </Tag>
      <Tag label="Remove filter" disabled>
        Hello world
      </Tag>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
