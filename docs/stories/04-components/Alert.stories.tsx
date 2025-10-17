import { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Box, Flex, Link } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Base = {
  render: () => (
    <Box
      style={{
        width: 700,
      }}
    >
      <Alert closeLabel="Close alert" title="Title">
        This is the default alert.
      </Alert>
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Alert closeLabel="Close alert" title="Title">
          This is the default alert.
        </Alert>
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const Variants = {
  render: () => (
    <Box
      style={{
        width: 700,
      }}
    >
      <Flex direction="column" alignItems="center" gap={1}>
        <Alert closeLabel="Close" title="Title">
          This is the default variant.
        </Alert>
        <Alert closeLabel="Close" title="Title" variant="success">
          This is the success variant.
        </Alert>
        <Alert closeLabel="Close" title="Title" variant="danger">
          This is the danger variant.
        </Alert>
        <Alert closeLabel="Close" title="Title" variant="warning">
          This is the warning variant.
        </Alert>
      </Flex>
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Flex direction="column" alignItems="center" gap={1}>
          <Alert closeLabel="Close" title="Title">
            This is the default variant.
          </Alert>
          <Alert closeLabel="Close" title="Title" variant="success">
            This is the success variant.
          </Alert>
          <Alert closeLabel="Close" title="Title" variant="danger">
            This is the danger variant.
          </Alert>
          <Alert closeLabel="Close" title="Title" variant="warning">
            This is the warning variant.
          </Alert>
        </Flex>
        `,
      },
    },
  },
  name: 'variants',
} satisfies Story;

export const WithAction = {
  render: () => (
    <Box
      style={{
        width: 700,
      }}
    >
      <Alert closeLabel="Close" title="This is the title of the alert" action={<Link href="/somewhere">See more</Link>}>
        Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit
        amet consrectumis adipisingus.
      </Alert>
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Alert closeLabel="Close" title="This is the title of the alert" action={<Link href="/somewhere">See more</Link>}>
          Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit
          amet consrectumis adipisingus.
        </Alert>
        `,
      },
    },
  },
  name: 'with action',
} satisfies Story;
