import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextButton, TextButtonProps } from '@strapi/design-system';
import { ArrowLeft, ArrowRight } from '@strapi/icons';
import { outdent } from 'outdent';

interface TextButtonArgs extends TextButtonProps {}

const meta: Meta<TextButtonArgs> = {
  title: 'Components/TextButton',
  args: {
    children: 'Next page',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
  render: (args) => <TextButton {...args} />,
  parameters: {
    docs: {
      source: {
        code: outdent`
          <TextButton>Next page</TextButton>
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  name: 'disabled',
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <TextButton disabled>Next page</TextButton>
        `,
      },
    },
  },
} satisfies Story;

export const Loading = {
  name: 'loading',
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <TextButton loading>Next page</TextButton>
        `,
      },
    },
  },
} satisfies Story;

export const StartIcon = {
  args: {
    startIcon: <ArrowLeft />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <TextButton startIcon={<ArrowLeft />}>Next page</TextButton>
        `,
      },
    },
  },
  name: 'with start icon',
} satisfies Story;

export const EndIcon = {
  args: {
    endIcon: <ArrowRight />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <TextButton endIcon={<ArrowRight />}>Next page</TextButton>
        `,
      },
    },
  },
  name: 'with end icon',
} satisfies Story;
