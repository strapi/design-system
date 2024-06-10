import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Flex, IconButton, IconButtonGroup, IconButtonProps } from '@strapi/design-system';
import * as Icons from '@strapi/icons';
import { outdent } from 'outdent';

interface IconButtonArgs extends IconButtonProps {
  children: keyof typeof Icons;
}

const BUTTON_VARIANTS = [
  'default',
  'secondary',
  'tertiary',
  'success',
  'success-light',
  'danger',
  'danger-light',
  'ghost',
] as const;

const meta: Meta<IconButtonArgs> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: 'More',
    disabled: false,
    label: 'More actions',
    onClick: fn(),
    size: 'M',
    variant: 'tertiary',
  },
  argTypes: {
    children: {
      control: 'select',
      options: Object.keys(Icons),
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
          <IconButton label="More actions">
            <More />
          </IconButton>
        `,
      },
    },
  },
  render: ({ children, ...args }) => {
    // eslint-disable-next-line import/namespace
    const Icon = Icons[children];

    return (
      <IconButton {...args}>
        <Icon />
      </IconButton>
    );
  },
};

export default meta;

type Story = StoryObj<IconButtonArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <IconButton disabled label="More actions">
            <More />
          </IconButton>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const SizeSmall = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <IconButton size="S" label="More actions">
            <More />
          </IconButton>
        `,
      },
    },
  },
  name: 'size small',
} satisfies Story;

export const SizeLarge = {
  args: {
    size: 'L',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <IconButton size="L" label="More actions">
            <More />
          </IconButton>
        `,
      },
    },
  },
  name: 'size large',
} satisfies Story;

export const AllVariants = {
  render: ({ children, ...args }) => {
    // eslint-disable-next-line import/namespace
    const Icon = Icons[children];

    return (
      <Flex gap={2}>
        {BUTTON_VARIANTS.map((variant) => (
          <IconButton key={variant} {...args} variant={variant}>
            <Icon />
          </IconButton>
        ))}
      </Flex>
    );
  },
  name: 'all variants',
} satisfies Story;

export const Group = {
  render: () => (
    <IconButtonGroup>
      <IconButton label="Edit">
        <Icons.Pencil />
      </IconButton>
      <IconButton label="Clone">
        <Icons.Duplicate />
      </IconButton>
      <IconButton label="Delete" variant="danger">
        <Icons.Trash />
      </IconButton>
    </IconButtonGroup>
  ),
  name: 'group',
};
