import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Button, Box, Flex } from '@strapi/design-system';
import { Feather, Information, Plus } from '@strapi/icons';

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Base = {
  render: () => <Button variant="default">Default</Button>,
  name: 'base',
} satisfies Story;

export const Sizes = {
  render: () => (
    <Flex gap={1}>
      <Button size="S">Small</Button>
      <Button size="M">Medium</Button>
      <Button size="L">Large</Button>
    </Flex>
  ),

  name: 'sizes',
} satisfies Story;

export const Variants = {
  render: () => (
    <Flex gap={2}>
      {(
        ['default', 'secondary', 'tertiary', 'success', 'danger', 'success-light', 'danger-light', 'ghost'] as const
      ).map((variant) => (
        <Button onClick={(e) => console.log(e)} variant={variant} key={variant}>
          {variant}
        </Button>
      ))}
    </Flex>
  ),

  name: 'variants',
} satisfies Story;

export const Icons = {
  render: () => (
    <Flex gap={2}>
      <Button startIcon={<Information />}>Information</Button>
      <Button variant="secondary" endIcon={<Feather />}>
        Write content
      </Button>
      <Button startIcon={<Information />} loading>
        With a loader
      </Button>
      <Button startIcon={<Plus />}>Woops</Button>
    </Flex>
  ),

  name: 'icons',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Box paddingRight={1}>
      <Button disabled onClick={() => console.log('information')} startIcon={<Information />}>
        Information
      </Button>
    </Box>
  ),

  name: 'disabled',
} satisfies Story;

export const FullWidth = {
  render: () => (
    <Box paddingRight={1}>
      <Button
        fullWidth
        onClick={() => console.log('information')}
        startIcon={<Information />}
        endIcon={<Information />}
      >
        Information
      </Button>
    </Box>
  ),

  name: 'fullWidth',
} satisfies Story;
