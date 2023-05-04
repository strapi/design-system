import { Meta, StoryObj } from '@storybook/react';
import { Stack, Box } from '@strapi/design-system';

const meta: Meta<typeof Stack> = {
  title: 'Design System/Technical Components/Stack',
  component: Stack,
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Base = {
  render: () => (
    <Stack spacing={4} background="secondary200" padding={3}>
      <Box color="neutral800" background="primary100" padding={4}>
        First
      </Box>
      <Box color="neutral800" background="primary100" padding={4}>
        Second
      </Box>
      <Box color="neutral800" background="primary100" padding={4}>
        Third
      </Box>
    </Stack>
  ),

  name: 'base',
} satisfies Story;

export const Horizontal = {
  render: () => (
    <Stack spacing={4} horizontal background="secondary200" padding={3}>
      <Box color="neutral800" background="primary100" padding={4}>
        First
      </Box>
      <Box color="neutral800" background="primary100" padding={4}>
        Second
      </Box>
      <Box color="neutral800" background="primary100" padding={4}>
        Third
      </Box>
    </Stack>
  ),

  name: 'horizontal',
} satisfies Story;
