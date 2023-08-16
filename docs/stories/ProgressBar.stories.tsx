import { Meta, StoryObj } from '@storybook/react';
import { Box, ProgressBar } from '@strapi/design-system';

const meta: Meta<typeof ProgressBar> = {
  title: 'Design System/Components/ProgressBar',
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const M = {
  render: () => (
    <Box background="neutral150" padding={2}>
      <ProgressBar value={33}>33/100 plugins loaded</ProgressBar>
    </Box>
  ),

  name: 'M',
} satisfies Story;

export const S = {
  render: () => (
    <Box background="neutral150" padding={2}>
      <ProgressBar value={90} size="S">
        90/100 plugins loaded
      </ProgressBar>
    </Box>
  ),

  name: 'S',
} satisfies Story;
