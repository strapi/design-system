import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Box, Typography } from '@strapi/design-system';

const meta: Meta<typeof NumberInput> = {
  title: 'Design System/Components/NumberInput',
  component: NumberInput,
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Base = {
  render: () => {
    const [content, setContent] = React.useState(0);

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          aria-label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
        />
        <Box as="p" padding={4} background="neutral100">
          <Typography>{`The value is ${content}`}</Typography>
        </Box>
        <button>
          <Typography>Escape</Typography>
        </button>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const SizeS = {
  render: () => {
    const [content, setContent] = React.useState();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          size="S"
        />
        <Box as="p" padding={4} background="neutral100">
          <Typography>{`The value is ${content}`}</Typography>
        </Box>
        <button>
          <Typography>Escape</Typography>
        </button>
      </Box>
    );
  },

  name: 'size S',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [content, setContent] = React.useState();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          disabled
        />
      </Box>
    );
  },

  name: 'disabled',
} satisfies Story;

//TODO: fix error prop, as FieldInput needs to update to reflect error styles
export const Error = {
  render: () => {
    const [content, setContent] = React.useState();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          onValueChange={(value) => setContent(value)}
          value={content}
          error="Wrong value"
        />
      </Box>
    );
  },

  name: 'error',
} satisfies Story;

export const WithInitialEmpty = {
  render: () => {
    const [content, setContent] = React.useState('');

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
        />
        <Box as="p" padding={4} background="neutral100">
          <Typography>{`The value is ${content}`}</Typography>
        </Box>
        <button>
          <Typography>Escape</Typography>
        </button>
      </Box>
    );
  },

  name: 'with initial empty',
} satisfies Story;

export const Locale = {
  render: () => {
    const [content, setContent] = React.useState();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          name="content"
          locale="de"
          onValueChange={(value) => setContent(value)}
          value={content}
        />
        <Box as="p" padding={4} background="neutral100">
          <Typography>{`The value is ${content}`}</Typography>
        </Box>
      </Box>
    );
  },

  name: 'locale',
} satisfies Story;
