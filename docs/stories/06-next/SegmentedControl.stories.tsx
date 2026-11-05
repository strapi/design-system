import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl, SegmentedControlItem } from '@strapi/design-system/next';
import { fn } from 'storybook/test';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Next/SegmentedControl',
  component: SegmentedControl,
  args: {
    disabled: false,
    onValueChange: fn(),
  },
  argTypes: {
    value: { control: false, description: 'The selected item value (controlled).' },
    defaultValue: { description: 'The selected item value on mount (uncontrolled).' },
    disabled: { description: 'If true, the whole control is dimmed and ignores input.' },
  },
  render: function Render(args) {
    const [value, setValue] = useState('publish');
    return (
      <SegmentedControl {...args} value={value} onValueChange={(next) => setValue(next as string)}>
        <SegmentedControlItem value="publish">Publish</SegmentedControlItem>
        <SegmentedControlItem value="unpublish">Unpublish</SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  name: 'disabled',
  args: { disabled: true },
} satisfies Story;
