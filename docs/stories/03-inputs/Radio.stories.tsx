import { useId } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Radio, Typography } from '@strapi/design-system';

type RadioArgs = Radio.GroupProps;

const meta: Meta<RadioArgs> = {
  title: 'Inputs/Radio',
  component: Radio.Group,
  argTypes: {
    defaultValue: {
      control: 'select',
      options: ['system', 'light', 'dark'],
    },
  },
  args: {
    defaultValue: '',
    disabled: false,
    loop: true,
    name: 'theme',
    required: false,
    onValueChange: fn(),
  },
  render: (args) => {
    return (
      <Radio.Group {...args} aria-label="Theme">
        <Radio.Item value="system">System</Radio.Item>
        <Radio.Item value="light">Light</Radio.Item>
        <Radio.Item value="dark">Dark</Radio.Item>
      </Radio.Group>
    );
  },
};

export default meta;

type Story = StoryObj<RadioArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const DefaultValue = {
  args: {
    defaultValue: 'system',
  },
  name: 'default value',
} satisfies Story;

export const Controlled = {
  args: {
    value: 'dark',
  },
  name: 'controlled',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'disabled',
} satisfies Story;

export const WithLabel = {
  render: (args) => {
    const id = useId();

    return (
      <Radio.Group aria-labelledby={id} {...args}>
        <Typography tag="label" id={id} variant="pi" textColor="neutral800" fontWeight="bold">
          Select Theme
        </Typography>
        <Radio.Item value="system">System</Radio.Item>
        <Radio.Item value="light">Light</Radio.Item>
        <Radio.Item value="dark">Dark</Radio.Item>
      </Radio.Group>
    );
  },
  name: 'with label',
} satisfies Story;
