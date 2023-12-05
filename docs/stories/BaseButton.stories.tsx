import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { BaseButton, Typography } from '@strapi/design-system';

const meta: Meta<typeof BaseButton> = {
  title: 'Design System/Technical Components/BaseButton',
  component: BaseButton,
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Base = {
  render: () => (
    <BaseButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => console.log(e)}>
      <Typography>button</Typography>
    </BaseButton>
  ),
  name: 'base',
} satisfies Story;
