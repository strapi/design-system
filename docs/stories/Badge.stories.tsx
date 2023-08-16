import { Meta, StoryObj } from '@storybook/react';
import { Badge, Flex } from '@strapi/design-system';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="center" gap={2}>
      <Flex gap={1}>
        <Badge>Badge</Badge>
      </Flex>
    </Flex>
  ),

  name: 'base',
} satisfies Story;

export const Active = {
  render: () => (
    <Flex direction="column" alignItems="center" gap={2}>
      <Flex gap={1}>
        <Badge size="S" active>
          Small Badge
        </Badge>
        <Badge size="M" active>
          Medium Badge
        </Badge>
      </Flex>
    </Flex>
  ),

  name: 'active',
} satisfies Story;

export const Size = {
  render: () => (
    <Flex direction="column" alignItems="center" gap={2}>
      <Flex gap={1}>
        <Badge size="S">Small Badge</Badge>
        <Badge size="M">Medium Badge</Badge>
      </Flex>
    </Flex>
  ),

  name: 'size',
} satisfies Story;
