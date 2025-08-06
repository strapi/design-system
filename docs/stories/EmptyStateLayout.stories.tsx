import { Meta, StoryObj } from '@storybook/react';
import { EmptyStateLayout, Button, Box } from '@strapi/design-system';
import { Plus, Cross } from '@strapi/icons';

const meta: Meta<typeof EmptyStateLayout> = {
  title: 'Design System/Components/EmptyStateLayout',
  component: EmptyStateLayout,
};

export default meta;

type Story = StoryObj<typeof EmptyStateLayout>;

export const Base = {
  render: () => (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Cross />}
        content="You don't have any content yet..."
        action={
          <Button variant="secondary" startIcon={<Plus />}>
            Create your first content-type
          </Button>
        }
      />
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const WithoutAction = {
  render: () => (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout content="You don't have any content yet..." />
    </Box>
  ),

  name: 'without action',
} satisfies Story;

export const WithLargeText = {
  render: () => (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Cross />}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        action={
          <Button variant="secondary" startIcon={<Plus />}>
            Create your first content-type
          </Button>
        }
      />
    </Box>
  ),

  name: 'with large text',
} satisfies Story;
