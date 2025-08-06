import { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@strapi/design-system';
import { Information, Cross } from '@strapi/icons';

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

export const Filter = {
  render: () => (
    <Tag label="remove filter" icon={<Cross aria-hidden />} onClick={() => console.log('filter removed')}>
      date is null
    </Tag>
  ),
  name: 'filter',
} satisfies Story;
