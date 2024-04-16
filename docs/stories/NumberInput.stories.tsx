import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Box, Tooltip, Typography } from '@strapi/design-system';
import { Information } from '@strapi/icons';

const meta: Meta<typeof NumberInput> = {
  title: 'Design System/Components/NumberInput',
  component: NumberInput,
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Base = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>(3.14159265359);

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          labelAction={
            <Tooltip description="Content of the tooltip">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden />
              </button>
            </Tooltip>
          }
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

export const WithoutLabel = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>(0);

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
          labelAction={
            <Tooltip description="Content of the tooltip">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden />
              </button>
            </Tooltip>
          }
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

  name: 'withoutLabel',
} satisfies Story;

export const SizeS = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          size="S"
          labelAction={
            <Tooltip description="Content of the tooltip">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden />
              </button>
            </Tooltip>
          }
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

export const Required = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          required
        />
      </Box>
    );
  },

  name: 'required',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
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

export const Error = {
  render: () => {
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
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
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onValueChange={(value) => setContent(value)}
          value={content}
          labelAction={
            <Tooltip description="Content of the tooltip">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden />
              </button>
            </Tooltip>
          }
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
    const [content, setContent] = React.useState<number | undefined>();

    return (
      <Box padding={10}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
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
