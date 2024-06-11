import { Meta, StoryObj } from '@storybook/react';
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
  render: (args) => <BaseLink {...args} />,
};

export default meta;

type Story = StoryObj<typeof BaseLink>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'disabled',
} satisfies Story;
