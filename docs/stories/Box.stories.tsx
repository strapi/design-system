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
    <Box padding={4} margin={2} background="primary700" shadow="filterShadow" borderColor="danger600">
      <Typography textColor="neutral0">Hello world</Typography>
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const ResponsiveSpaces = {
  render: () => (
    <Box
      paddingTop={{ initial: 2, medium: 4, large: 6 }}
      marginTop={{ initial: 4, medium: 6, large: 8 }}
      padding={1}
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
      padding={{ initial: 6, medium: 4, large: 1 }}
      paddingRight={6}
      marginBottom={4}
      margin={2}
      marginLeft={{ initial: 8, medium: 4, large: 2 }}
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
