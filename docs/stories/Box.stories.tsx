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

export const ResponsiveStyles = {
  render: () => (
    <Box
      paddingTop={{ initial: '4rem', medium: '14px', large: 6 }}
      padding={['2rem', '4rem', '8rem']}
      marginTop={{ initial: 1, medium: '1rem', large: '22px' }}
      margin={{ initial: 2, medium: [2, '4px'], large: [6, '4px', 8] }}
      background={{ initial: 'primary600', medium: 'secondary600', large: 'neutral600' }}
      fontSize={{ initial: 2, medium: 3, large: 5 }}
      borderColor={{ initial: 'danger600', medium: 'success600', large: 'warning600' }}
      borderStyle="dotted"
      borderWidth={{ initial: '2px', medium: '4px', large: '8px' }}
      shadow="filterShadow"
      hiddenXS
    >
      <Typography textColor="neutral0" style={{ fontSize: 'inherit' }}>
        Hello world
      </Typography>
    </Box>
  ),

  name: 'responsive styles',
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
