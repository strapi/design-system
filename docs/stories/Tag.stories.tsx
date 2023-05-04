import { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@strapi/design-system';
import { Information } from '@strapi/icons';

const meta: Meta<typeof Tag> = {
  title: 'Design System/Components/Tag',
  component: Tag,
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Base = {
  render: () => <Tag icon={<Information aria-hidden />}>Hello world</Tag>,
  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Tag icon={<Information aria-hidden />} disabled>
      Hello world
    </Tag>
  ),
  name: 'disabled',
} satisfies Story;
