import { useId } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, Typography } from '@strapi/design-system';
import { fn } from 'storybook/test';

type RadioArgs = Radio.GroupProps;
type RadioItemArgs = Radio.ItemProps;

// Combine the props
type CombinedRadioProps = RadioArgs & {
  item: RadioItemArgs;
};

const meta: Meta<CombinedRadioProps> = {
  title: 'Inputs/Radio',
  component: Radio.Group,
  argTypes: {
    defaultValue: {
      control: 'select',
      description: 'The default value of the radio group',
      options: ['system', 'light', 'dark'],
      table: {
        category: 'Radio.Group',
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      control: false,
      description: 'Callback function triggered when the value changes.',
      table: {
        category: 'Radio.Group',
        type: { summary: 'function', detail: '(value: string) => void' },
      },
      defaultValue: { summary: '(value: string) => void;' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input when set to true.',
      table: {
        category: 'Radio.Group',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'Whether the radio group is required in a form context.',
      table: {
        category: 'Radio.Group',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loop: {
      control: false,
      description: 'Whether keyboard navigation should loop from last to first and vice versa',
      table: {
        category: 'Radio.Group',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    name: {
      control: false,
      description: 'The name of the radio group, used when submitting an HTML form.',
      table: {
        category: 'Radio.Group',
        type: { summary: 'string' },
      },
    },
    value: {
      control: false,
      description: 'The value of the radio item.',
      table: {
        category: 'Radio.Item',
        type: { summary: 'string' },
      },
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
  name: 'Base',
} satisfies Story;

export const DefaultValue = {
  args: {
    defaultValue: 'system',
  },
  name: 'Default Value',
} satisfies Story;

export const Controlled = {
  args: {
    value: 'dark',
  },
  name: 'Controlled',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'Disabled',
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
  name: 'With label',
} satisfies Story;
