import { Meta, StoryObj } from '@storybook/react';
import { Loader } from '@strapi/design-system';

const meta: Meta<typeof Loader> = {
  title: 'Design System/Components/Loader',
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Base = {
  render: () => <Loader>Loading content...</Loader>,
  name: 'base',
} satisfies Story;

export const Small = {
  render: () => <Loader small>Loading content...</Loader>,
  name: 'small',
} satisfies Story;
