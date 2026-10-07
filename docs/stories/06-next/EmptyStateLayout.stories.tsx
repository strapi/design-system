import { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';

import { Button, Empty, EmptyContent, EmptyMedia, EmptyTitle } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Empty> = {
  title: 'Next/EmptyStateLayout',
  component: Empty,
  render: (args) => (
    <Empty {...args}>
      <EmptyMedia>
        <EmptyDocuments width="16rem" />
      </EmptyMedia>
      <EmptyTitle>You don't have any content yet...</EmptyTitle>
      <EmptyContent>
        <Button>
          <Plus data-icon="inline-start" />
          Create your first content-type
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;

export const WithoutIconAndAction = {
  render: () => (
    <Empty>
      <EmptyTitle>No results</EmptyTitle>
    </Empty>
  ),
  name: 'without icon and action',
} satisfies Story;
