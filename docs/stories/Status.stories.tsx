import { Meta, StoryObj } from '@storybook/react';
import { Status, Typography, Flex } from '@strapi/design-system';

const meta: Meta<typeof Status> = {
  title: 'Design System/Components/Status',
  component: Status,
};

export default meta;

type Story = StoryObj<typeof Status>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Status variant="success" showBullet={false}>
        <Typography>
          Hello world<Typography fontWeight="bold">thing happens</Typography>
        </Typography>
      </Status>
      <Status variant="secondary" showBullet={false}>
        <Typography>
          Hello world<Typography fontWeight="bold">thing happens</Typography>
        </Typography>
      </Status>
    </Flex>
  ),

  name: 'base',
} satisfies Story;

export const SizeS = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Status variant="success" size="S" showBullet={false}>
        <Typography fontWeight="bold" textColor="success700">
          Published
        </Typography>
      </Status>
      <Status variant="secondary" size="S" showBullet={false}>
        <Typography fontWeight="bold" textColor="secondary700">
          Draft
        </Typography>
      </Status>
      <Status variant="alternative" size="S" showBullet={false}>
        <Typography fontWeight="bold" textColor="alternative700">
          Updated
        </Typography>
      </Status>
    </Flex>
  ),

  name: 'size S',
} satisfies Story;
