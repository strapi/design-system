import { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from '@strapi/design-system';

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

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  args: {
    children: 'strapi.io',
    disabled: false,
    href: 'https://strapi.io',
    isExternal: true,
    size: 'M',
    variant: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
  },
  render: (args) => <LinkButton {...args} />,
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Base = {
  name: 'base',
} satisfies Story;
