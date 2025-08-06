import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Switch, SwitchProps, composeEventHandlers } from '@strapi/design-system';

interface SwitchArgs extends SwitchProps {}

const meta: Meta<SwitchArgs> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    checked: true,
    disabled: false,
    required: false,
    onCheckedChange: fn(),
  },
  render: ({ onCheckedChange, ...args }) => {
    const [, updateArgs] = useArgs();

    const handleCheckedChange = (checked: boolean) => {
      updateArgs({ checked });
    };

    return <Switch onCheckedChange={composeEventHandlers(onCheckedChange, handleCheckedChange)} {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Checked = {
  name: 'checked',
} satisfies Story;

export const Unchecked = {
  args: {
    checked: false,
  },
  name: 'unchecked',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'disabled',
} satisfies Story;

export const WithVisibleLabels = {
  args: {
    visibleLabels: true,
  },
  name: 'with visible labels',
} satisfies Story;
