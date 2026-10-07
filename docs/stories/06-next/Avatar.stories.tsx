import { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Avatar> = {
  title: 'Next/Avatar',
  component: Avatar,
  args: {
    src: '/stories/avatar/ted-lasso.jpeg',
    alt: 'Ted Lasso',
    fallback: 'TL',
    preview: false,
  },
  argTypes: {
    src: { description: 'With no children, the image to show.' },
    alt: { description: 'With no children, the text alternative of the image.' },
    fallback: {
      description: 'With no children, what shows while the image loads or when it fails, usually initials.',
      table: { type: { summary: 'ReactNode' } },
    },
    delay: {
      description: 'With no children, how long the fallback waits before it shows, in ms.',
      table: { defaultValue: { summary: '600' } },
    },
    preview: {
      description: 'Shows a larger copy of the image in a tooltip on hover, once the image has loaded.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: (args) => <Avatar {...args} />,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithPreview = {
  args: {
    preview: true,
  },
  name: 'with preview',
} satisfies Story;

export const Fallback = {
  args: {
    src: undefined,
    delay: 0,
  },
  name: 'fallback',
} satisfies Story;

export const Composed = {
  render: () => (
    <Avatar>
      <AvatarImage src="/stories/avatar/roy-kent.jpeg" alt="Roy Kent" />
      <AvatarFallback>RK</AvatarFallback>
    </Avatar>
  ),
  name: 'composed',
} satisfies Story;

export const Group = {
  render: () => (
    <AvatarGroup>
      <Avatar src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" preview />
      <Avatar src="/stories/avatar/roy-kent.jpeg" alt="Roy Kent" fallback="RK" preview />
      <Avatar fallback="CB" delay={0} />
    </AvatarGroup>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'group',
} satisfies Story;
