import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { RadioGroup, RadioGroupItem } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta = {
  title: 'Next/Radio',
  component: RadioGroup,
  args: {
    'aria-label': 'Food',
    defaultValue: 'pizza',
    disabled: false,
    onValueChange: fn(),
  },
  argTypes: {
    value: { control: 'text', description: 'The selected value.' },
    defaultValue: { control: 'text', description: 'The value selected at first, uncontrolled.' },
    disabled: { description: 'Disables every radio.' },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="pizza">Pizza</RadioGroupItem>
      <RadioGroupItem value="bagel">Bagel</RadioGroupItem>
      <RadioGroupItem value="pasta">Pasta</RadioGroupItem>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <RadioGroup aria-label="States" defaultValue="checked">
      <RadioGroupItem value="unchecked">Unchecked</RadioGroupItem>
      <RadioGroupItem value="checked">Checked</RadioGroupItem>
      <RadioGroupItem value="disabled" disabled>
        Disabled
      </RadioGroupItem>
    </RadioGroup>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
