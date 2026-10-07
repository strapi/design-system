import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Alert, AlertAction, AlertDescription, AlertTitle, type AlertVariant } from '@strapi/design-system/next';

const VARIANTS = ['default', 'success', 'warning', 'danger'] satisfies AlertVariant[];

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Alert> = {
  title: 'Next/Alert',
  component: Alert,
  args: {
    variant: 'default',
    closeLabel: 'Close',
    onClose: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description:
        'The colours and the icon. `danger` renders the content in a `role="alert"` region, the others in `role="status"`.',
      table: { type: { summary: VARIANTS.map((v) => `'${v}'`).join(' | ') }, defaultValue: { summary: 'default' } },
    },
    closeLabel: {
      control: 'text',
      description: 'The accessible name of the close button.',
      table: { defaultValue: { summary: 'Close' } },
    },
    onClose: {
      description:
        'Called when the close button is clicked. The close button shows when `onClose` or `closeLabel` is set.',
    },
    icon: {
      control: false,
      description: 'Replaces the icon of the variant. `null` removes it.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Title</AlertTitle>
      <AlertDescription>This is the default alert.</AlertDescription>
    </Alert>
  ),
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithAction = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Title</AlertTitle>
      <AlertDescription>This is an alert with an action.</AlertDescription>
      <AlertAction>
        <a href="https://strapi.io">Learn more</a>
      </AlertAction>
    </Alert>
  ),
  name: 'with action',
} satisfies Story;

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} closeLabel="Close">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>{`This is the ${variant} alert.`}</AlertDescription>
          <AlertAction>
            <a href="https://strapi.io">Learn more</a>
          </AlertAction>
        </Alert>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants',
} satisfies Story;
