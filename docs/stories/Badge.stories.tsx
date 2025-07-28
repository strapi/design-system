import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Flex } from '@strapi/design-system';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
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
} satisfies Story;

export const Active = {
  args: {
    active: true,
  },

  name: 'active',
} satisfies Story;

export const SizeSmall = {
  args: {
    size: 'S',
  },

  name: 'small size',
} satisfies Story;
