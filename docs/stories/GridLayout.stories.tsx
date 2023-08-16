import { Meta, StoryObj } from '@storybook/react';
import { GridLayout, Box, Typography } from '@strapi/design-system';

const meta: Meta<typeof GridLayout> = {
  title: 'Design System/Components/GridLayout',
  component: GridLayout,
};

export default meta;

type Story = StoryObj<typeof GridLayout>;

export const Base = {
  render: () => (
    <Box padding={8} background="neutral100">
      <GridLayout>
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <Box padding={4} hasRadius background="neutral0" key={`box-${idx}`} shadow="tableShadow">
              <Typography>hello world</Typography>
            </Box>
          ))}
      </GridLayout>
    </Box>
  ),

  name: 'base',
} satisfies Story;
