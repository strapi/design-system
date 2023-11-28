import { Meta, StoryObj } from '@storybook/react';
import { Icon, Flex } from '@strapi/design-system';
import { Pencil, Play, Trash, Plus } from '@strapi/icons';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Technical Components/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Base = {
  render: () => (
    <Flex gap={3}>
      <Icon width={`2.5rem`} height={`2.5rem`} color="secondary500" as={Pencil} />
      <Icon width={`1.5rem`} height={`1.5rem`} color="alternative500" as={Play} />
      <Icon width={`3rem`} height={`3rem`} color="danger500" as={Trash} />
      <Icon as={Plus} />
    </Flex>
  ),

  name: 'base',
} satisfies Story;
