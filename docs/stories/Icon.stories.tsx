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
      <Icon width={`${25 / 16}rem`} height={`${25 / 16}rem`} color="secondary500" as={Pencil} />
      <Icon width={`${15 / 16}rem`} height={`${15 / 16}rem`} color="alternative500" as={Play} />
      <Icon width={`${30 / 16}rem`} height={`${30 / 16}rem`} color="danger500" as={Trash} />
      <Icon as={Plus} />
    </Flex>
  ),

  name: 'base',
} satisfies Story;
