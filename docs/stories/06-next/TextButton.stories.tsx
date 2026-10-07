import { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Plus } from '@strapi/icons';
import { fn } from 'storybook/test';

import { TextButton } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof TextButton> = {
  title: 'Next/TextButton',
  component: TextButton,
  args: {
    children: 'Add an entry',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
  argTypes: {
    disabled: {
      description: 'If true, the TextButton ignores clicks and turns grey.',
    },
    loading: {
      description: 'If true, a spinning loader replaces the start icon and the TextButton is disabled.',
    },
    startIcon: { control: false, table: { type: { summary: 'ReactNode' } } },
    endIcon: { control: false, table: { type: { summary: 'ReactNode' } } },
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>
      <TextButton>Add an entry</TextButton>
      <TextButton startIcon={<Plus />}>Add an entry</TextButton>
      <TextButton endIcon={<ArrowRight />}>See more</TextButton>
      <TextButton startIcon={<Plus />} disabled>
        Disabled
      </TextButton>
      <TextButton startIcon={<Plus />} loading>
        Loading
      </TextButton>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
