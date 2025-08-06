import { Meta, StoryObj } from '@storybook/react';
import { Box, Divider } from '@strapi/design-system';

const meta: Meta<typeof Divider> = {
  title: 'Design System/Components/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Base = {
  render: () => (
    <Box padding={8}>
      <Divider />
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const WithDefaultMargin = {
  render: () => (
    <Box padding={8}>
      <Divider margin={0} />
    </Box>
  ),

  name: 'with-default-margin',
} satisfies Story;
