import { Meta, StoryObj } from '@storybook/react';
import { Typography, Box } from '@strapi/design-system';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Technical Components/Typography',
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Variants = {
  render: () => (
    <Box paddingTop={2} paddingLeft={4}>
      <Typography variant="alpha">Alpha - header 1</Typography>
    </Box>
  ),

  name: 'variants',
} satisfies Story;

export const Ellipsis = {
  render: () => (
    <Box maxWidth="150px" borderStyle="solid" borderWidth="1px" borderColor="neutral200">
      <Typography ellipsis>Loong text, that will be cut off</Typography>
    </Box>
  ),

  name: 'ellipsis',
} satisfies Story;
