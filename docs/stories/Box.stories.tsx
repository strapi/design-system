import { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@strapi/design-system';

const meta: Meta<typeof Box> = {
  title: 'Design System/Technical Components/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Base = {
  render: () => (
    <Box padding={4} background="primary700" shadow="filterShadow" borderColor="danger600">
      <Typography textColor="neutral0">Hello world</Typography>
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const ResponsiveSpaces = {
  render: () => (
    <Box
      padding={[11, 6, 1]}
      background="primary700"
      shadow="filterShadow"
      hiddenXS
      borderColor="danger600"
      borderStyle="dotted"
      borderWidth="2px"
    >
      <Typography textColor="neutral0">Hello world</Typography>
    </Box>
  ),

  name: 'responsive spaces',
} satisfies Story;

export const LogicalProperties = {
  render: () => (
    <Box
      paddingTop={4}
      padding={[6, 4, 1]}
      paddingRight={2}
      marginBottom={4}
      margin={2}
      marginLeft={[8, 4, 2]}
      background="primary700"
      shadow="filterShadow"
      hiddenXS
      borderColor="danger600"
      borderStyle="dotted"
      borderWidth="2px"
    >
      <Typography textColor="neutral0">Hello world</Typography>
    </Box>
  ),

  name: 'logical properties',
} satisfies Story;
