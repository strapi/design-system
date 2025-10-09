import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Flex } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    textColor: 'neutral600',
    backgroundColor: 'neutral150',
  },
  render: (args) => (
    <Flex direction="column" alignItems="center" gap={2}>
      <Flex gap={1}>
        <Badge {...args}>Badge</Badge>
      </Flex>
    </Flex>
  ),
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Base = {
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Badge>Badge</Badge>
        `,
      },
    },
  },
} satisfies Story;

export const Active = {
  args: {
    active: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Badge active>Badge</Badge>
        `,
      },
    },
  },
  name: 'active',
} satisfies Story;

export const SizeSmall = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Badge size="S">Badge</Badge>
        `,
      },
    },
  },
  name: 'small size',
} satisfies Story;
