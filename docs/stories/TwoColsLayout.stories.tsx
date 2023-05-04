import { Meta, StoryObj } from '@storybook/react';
import { TwoColsLayout, Box, Typography } from '@strapi/design-system';

const meta: Meta<typeof TwoColsLayout> = {
  title: 'Design System/Components/TwoColsLayout',
  component: TwoColsLayout,
};

export default meta;

type Story = StoryObj<typeof TwoColsLayout>;

export const Base = {
  render: () => (
    <Box padding={8} background="neutral100">
      <TwoColsLayout
        startCol={
          <Box padding={4}>
            <Typography>Hello world</Typography>
          </Box>
        }
        endCol={
          <Box padding={4}>
            <Typography>Hello world</Typography>
          </Box>
        }
      />
    </Box>
  ),

  name: 'base',
} satisfies Story;
