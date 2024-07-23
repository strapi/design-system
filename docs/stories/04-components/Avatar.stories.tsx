import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Avatar.Item> = {
  title: 'Components/Avatar',
  component: Avatar.Item,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar.Item>;

export const Base = {
  render: () => <Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" />,
  parameters: {
    docs: {
      source: {
        code: outdent`<Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" />`,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const WithPreview = {
  render: () => <Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" preview />,
  parameters: {
    docs: {
      source: {
        code: outdent`<Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" preview />`,
      },
    },
  },
  name: 'with preview',
} satisfies Story;

export const Fallback = {
  render: () => <Avatar.Item fallback="TL" delayMs={0} />,
  parameters: {
    docs: {
      source: {
        code: outdent`<Avatar.Item fallback="TL" delayMs={0} />`,
      },
    },
  },
  name: 'fallback',
} satisfies Story;

export const Group = {
  render: () => (
    <Avatar.Group>
      <Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" preview />
      <Avatar.Item src="/stories/avatar/roy-kent.jpeg" alt="Roy Kent" fallback="RK" preview />
      <Avatar.Item fallback="CB" preview />
    </Avatar.Group>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Avatar.Group>
          <Avatar.Item src="/stories/avatar/ted-lasso.jpeg" alt="Ted Lasso" fallback="TL" preview />
          <Avatar.Item src="/stories/avatar/roy-kent.jpeg" alt="Roy Kent" fallback="RK" preview />
          <Avatar.Item fallback="CB" preview />
        </Avatar.Group>
        `,
      },
    },
  },
  name: 'group',
} satisfies Story;
