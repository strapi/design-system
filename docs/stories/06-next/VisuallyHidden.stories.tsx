import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, VisuallyHidden } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Next/VisuallyHidden',
  component: VisuallyHidden,
  args: {
    children: 'This text is only read by screen readers',
  },
  argTypes: {
    children: {
      description: 'The content that screen readers announce.',
      table: { type: { summary: 'ReactNode' } },
    },
    render: {
      control: false,
      description: 'Replaces the `<span>` with another element, for example `render={<figcaption />}`.',
      table: { type: { summary: 'ReactElement | (props, state) => ReactElement' } },
    },
  },
  render: (args) => (
    <p style={{ fontSize: '1.4rem' }}>
      The next sentence is hidden from the screen. <VisuallyHidden {...args} />
    </p>
  ),
};

export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

export const Base = {
  name: 'base',
} satisfies Story;

export const InAButton = {
  render: () => (
    <Button>
      Edit
      <VisuallyHidden> the entry “Homepage”</VisuallyHidden>
    </Button>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'in a button',
} satisfies Story;
