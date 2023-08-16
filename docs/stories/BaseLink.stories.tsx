import { Meta, StoryObj } from '@storybook/react';
import { BaseLink, Typography } from '@strapi/design-system';

const meta: Meta<typeof BaseLink> = {
  title: 'Design System/Technical Components/BaseLink',
  component: BaseLink,
};

export default meta;

type Story = StoryObj<typeof BaseLink>;

export const Base = {
  render: () => (
    <BaseLink href="https://strapi.io" isExternal>
      <Typography>Base link</Typography>
    </BaseLink>
  ),

  name: 'base',
} satisfies Story;
