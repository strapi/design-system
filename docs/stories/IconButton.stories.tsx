import { useState } from 'react';

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
    const [currentAction, setCurrentAction] = useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton onClick={() => setCurrentAction('edit')} label="Edit" icon={<Pencil />} />
          <IconButton onClick={() => setCurrentAction('Create')} label="Create" icon={<Plus />} />
          <IconButton onClick={() => setCurrentAction('Delete')} label="Delete" icon={<Trash />} />
          <IconButton onClick={() => setCurrentAction('Publish')} label="Publish" icon={<Play />} />
        </Flex>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [currentAction, setCurrentAction] = useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton disabled onClick={() => setCurrentAction('edit')} label="Edit" icon={<Pencil />} />
          <IconButton disabled onClick={() => setCurrentAction('Create')} label="Create" icon={<Plus />} />
          <IconButton disabled onClick={() => setCurrentAction('Delete')} label="Delete" icon={<Trash />} />
          <IconButton disabled onClick={() => setCurrentAction('Publish')} label="Publish" icon={<Play />} />
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
        <IconButton onClick={() => console.log('edit')} aria-label="Edit" icon={<Pencil />} />
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
          <IconButton onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />
          <IconButton onClick={() => console.log('Create')} label="Create" icon={<Plus />} />
          <IconButton onClick={() => console.log('Delete')} label="Delete" icon={<Trash />} />
          <IconButton onClick={() => console.log('Publish')} label="Publish" icon={<Play />} />
        </IconButtonGroup>
      </Flex>
    </Box>
  ),

  name: 'group',
} satisfies Story;

export const Children = {
  render: () => {
    const [currentAction, setCurrentAction] = useState('None Selected');

    return (
      <Box padding={7}>
        <Box paddingBottom={3}>
          <Typography>{currentAction}</Typography>
        </Box>
        <Flex background="neutral100" gap={1} padding={2}>
          <IconButton onClick={() => setCurrentAction('Edit')} aria-label="Edit">
            <Pencil />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Create')} aria-label="Create">
            <Plus />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Delete')} aria-label="Delete">
            <Trash />
          </IconButton>
          <IconButton onClick={() => setCurrentAction('Publish')} aria-label="Publish">
            <Play />
          </IconButton>
        </Flex>
      </Box>
    );
  },

  name: 'children',
} satisfies Story;
