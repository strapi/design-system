import { Meta, StoryObj } from '@storybook/react';
import { Flex, Typography, Box } from '@strapi/design-system';

const meta: Meta<typeof Flex> = {
  title: 'Design System/Technical Components/Flex',
  component: Flex,
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Base = {
  render: () => (
    <Flex>
      <Box background="primary600" padding={1} hasRadius>
        <Typography textColor="neutral0">Hello</Typography>
      </Box>
      <Box background="success600" padding={1} hasRadius>
        <Typography textColor="neutral0">World</Typography>
      </Box>
    </Flex>
  ),

  name: 'base',
} satisfies Story;
