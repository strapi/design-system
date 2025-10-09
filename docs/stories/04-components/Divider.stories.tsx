import { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Divider } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Base = {
  render: () => (
    <Box padding={8}>
      <Divider />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Divider />
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const WithDefaultMargin = {
  render: () => (
    <Box padding={8}>
      <Divider margin={0} />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Divider margin={0} />
        `,
      },
    },
  },
  name: 'with-default-margin',
} satisfies Story;
