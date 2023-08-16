import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, Crumb, Flex } from '@strapi/design-system';
import { CollectionType } from '@strapi/icons';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Design System/Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Base = {
  render: () => (
    <Flex gap={3}>
      <CollectionType />
      <Breadcrumbs label="Category model, name field">
        <Crumb>Category</Crumb>
        <Crumb>Name</Crumb>
      </Breadcrumbs>
    </Flex>
  ),

  name: 'base',
} satisfies Story;
