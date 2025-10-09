import { Meta, StoryObj } from '@storybook/react-vite';
import { Status, Typography, Flex } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
};

export default meta;

type Story = StoryObj<typeof Status>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Status variant="success">
        <Typography>
          Hello world<Typography fontWeight="bold">thing happens</Typography>
        </Typography>
      </Status>
      <Status variant="secondary">
        <Typography>
          Hello world<Typography fontWeight="bold">thing happens</Typography>
        </Typography>
      </Status>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
            <Status variant="success">
              <Typography>
                Hello world<Typography fontWeight="bold">thing happens</Typography>
              </Typography>
            </Status>
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const SizeS = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Status variant="success" size="S">
        <Typography fontWeight="bold" textColor="success700">
          Published
        </Typography>
      </Status>
      <Status variant="secondary" size="S">
        <Typography fontWeight="bold" textColor="secondary700">
          Draft
        </Typography>
      </Status>
      <Status variant="alternative" size="S">
        <Typography fontWeight="bold" textColor="alternative700">
          Updated
        </Typography>
      </Status>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Status variant="success" size="S">
          <Typography fontWeight="bold" textColor="success700">
            Published
          </Typography>
        </Status>
        `,
      },
    },
  },
  name: 'size S',
} satisfies Story;

export const SizeXS = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Status variant="success" size="XS">
        <Typography fontWeight="bold" textColor="success700">
          Published
        </Typography>
      </Status>
      <Status variant="secondary" size="XS">
        <Typography fontWeight="bold" textColor="secondary700">
          Draft
        </Typography>
      </Status>
      <Status variant="alternative" size="XS">
        <Typography fontWeight="bold" textColor="alternative700">
          Updated
        </Typography>
      </Status>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Status variant="success" size="XS">
          <Typography fontWeight="bold" textColor="success700">
            Published
          </Typography>
        </Status>
        `,
      },
    },
  },
  name: 'size XS',
} satisfies Story;
