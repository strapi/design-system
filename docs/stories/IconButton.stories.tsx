import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { IconButton, IconButtonGroup, Box, Flex, Typography } from '@strapi/design-system';
import { Pencil, Play, Trash, Plus } from '@strapi/icons';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Components/IconButton',
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Base = {
  render: () => {
    const [currentAction, setCurrentAction] = React.useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton onClick={() => setCurrentAction('edit')} label="Edit">
            <Pencil />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Create')} label="Create">
            <Plus />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Delete')} label="Delete">
            <Trash />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Publish')} label="Publish">
            <Play />
          </IconButton>
        </Flex>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [currentAction, setCurrentAction] = React.useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton disabled onClick={() => setCurrentAction('edit')} label="Edit">
            <Pencil />
          </IconButton>
          <IconButton disabled onClick={() => setCurrentAction('Create')} label="Create">
            <Plus />
          </IconButton>
          <IconButton disabled onClick={() => setCurrentAction('Delete')} label="Delete">
            <Trash />
          </IconButton>
          <IconButton disabled onClick={() => setCurrentAction('Publish')} label="Publish">
            <Play />
          </IconButton>
        </Flex>
      </Box>
    );
  },

  name: 'disabled',
} satisfies Story;

export const WithoutTooltip = {
  render: () => (
    <Box padding={7}>
      <Flex background="neutral100" gap={1} padding={2}>
        <IconButton onClick={() => console.log('edit')} withTooltip={false} label="Edit">
          <Pencil />
        </IconButton>
      </Flex>
    </Box>
  ),

  name: 'without tooltip',
} satisfies Story;

export const Group = {
  render: () => (
    <Box padding={7}>
      <Flex background="neutral100" gap={1} padding={2}>
        <IconButtonGroup>
          <IconButton onClick={() => console.log('edit')} label="Edit">
            <Pencil />
          </IconButton>
          <IconButton onClick={() => console.log('Create')} label="Create">
            <Plus />
          </IconButton>
          <IconButton onClick={() => console.log('Delete')} label="Delete">
            <Trash />
          </IconButton>
          <IconButton onClick={() => console.log('Publish')} label="Publish">
            <Play />
          </IconButton>
        </IconButtonGroup>
      </Flex>
    </Box>
  ),

  name: 'group',
} satisfies Story;

export const Sizes = {
  render: () => (
    <Flex gap={1}>
      <IconButton label="Small" size="S">
        <Pencil />
      </IconButton>
      <IconButton label="Medium" size="M">
        <Pencil />
      </IconButton>
      <IconButton label="Large" size="L">
        <Pencil />
      </IconButton>
    </Flex>
  ),

  name: 'sizes',
} satisfies Story;

export const Variants = {
  render: () => (
    <Flex gap={2}>
      {(['tertiary', 'secondary'] as const).map((variant) => (
        <IconButton variant={variant} key={variant} label={variant}>
          <Pencil />
        </IconButton>
      ))}
    </Flex>
  ),

  name: 'variants',
} satisfies Story;

export const Children = {
  render: () => {
    const [currentAction, setCurrentAction] = React.useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton onClick={() => setCurrentAction('Edit')} withTooltip={false} label="Edit">
            <Pencil />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Create')} withTooltip={false} label="Create">
            <Plus />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Delete')} withTooltip={false} label="Delete">
            <Trash />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Publish')} withTooltip={false} label="Publish">
            <Play />
          </IconButton>
        </Flex>
      </Box>
    );
  },

  name: 'children',
} satisfies Story;
