import { Meta, StoryObj } from '@storybook/react-vite';
import { BaseLink } from '@strapi/design-system';

const meta: Meta<typeof BaseLink> = {
  title: 'Primitives/BaseLink',
  component: BaseLink,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    children: 'Strapi.io',
    disabled: false,
    href: 'https://strapi.io',
    isExternal: true,
  },
  argTypes: {
    children: {
      control: false,
      description: 'the content to be rendered inside the link',
      table: {
        type: {
          summary: 'React.ReactNode',
        },
      },
    },
    href: {
      description: 'The URL the link points to',
      type: {
        name: 'string',
        required: true,
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the link is disabled',
      type: { name: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    isExternal: {
      control: 'boolean',
      description: 'When true, the link opens in a new tab/window',
      type: { name: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
  render: (args) => <BaseLink {...args} />,
};

export default meta;

type Story = StoryObj<typeof BaseLink>;

export const Base = {
  name: 'Base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'Disabled',
} satisfies Story;
