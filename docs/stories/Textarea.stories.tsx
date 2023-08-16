import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Textarea, Tooltip, Box } from '@strapi/design-system';
import { Information } from '@strapi/icons';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Components/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Base = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Box padding={10}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          onChange={(e) => setContent(e.target.value)}
          labelAction={
            <Tooltip description="Content of the tooltip" position="right">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden={true} />
              </button>
            </Tooltip>
          }
        >
          {content}
        </Textarea>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const Error = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Box padding={10}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={content.length < 5 ? 'Content is too short' : undefined}
          onChange={(e) => setContent(e.target.value)}
          labelAction={
            <Tooltip description="Content of the tooltip" position="right">
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
        >
          {content}
        </Textarea>
      </Box>
    );
  },

  name: 'error',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Box padding={10}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          disabled
          onChange={(e) => setContent(e.target.value)}
          labelAction={
            <Tooltip description="Content of the tooltip" position="right">
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
        >
          {content}
        </Textarea>
      </Box>
    );
  },

  name: 'disabled',
} satisfies Story;

export const Required = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Box padding={10}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          required
          onChange={(e) => setContent(e.target.value)}
          labelAction={
            <Tooltip description="Content of the tooltip" position="right">
              <button
                aria-label="Information about the email"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden={true} />
              </button>
            </Tooltip>
          }
        >
          {content}
        </Textarea>
      </Box>
    );
  },

  name: 'required',
} satisfies Story;
