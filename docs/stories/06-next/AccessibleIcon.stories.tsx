import { Meta, StoryObj } from '@storybook/react-vite';
import { AccessibleIcon } from '@strapi/design-system/next';
import { Cross, Pencil, Trash } from '@strapi/icons';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

// A plain button keeps the story about the icon. The /next IconButton is the component to use in an app
const ICON_BUTTON_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  border: '1px solid currentColor',
  borderRadius: '4px',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
} as const;

const meta: Meta<typeof AccessibleIcon> = {
  title: 'Next/AccessibleIcon',
  component: AccessibleIcon,
  args: {
    label: 'Close',
  },
  argTypes: {
    label: {
      description: 'The text that screen readers announce in place of the icon.',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      description: 'The icon. One React element, an SVG most of the time.',
      table: { type: { summary: 'ReactElement' } },
    },
  },
  render: (args) => (
    <button type="button" style={ICON_BUTTON_STYLE}>
      <AccessibleIcon {...args}>
        <Cross />
      </AccessibleIcon>
    </button>
  ),
};

export default meta;

type Story = StoryObj<typeof AccessibleIcon>;

export const Base = {
  name: 'base',
} satisfies Story;

export const IconButtons = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.8rem' }}>
      <button type="button" style={ICON_BUTTON_STYLE}>
        <AccessibleIcon label="Edit">
          <Pencil />
        </AccessibleIcon>
      </button>
      <button type="button" style={ICON_BUTTON_STYLE}>
        <AccessibleIcon label="Delete">
          <Trash />
        </AccessibleIcon>
      </button>
      <button type="button" style={ICON_BUTTON_STYLE}>
        <AccessibleIcon label="Close">
          <Cross />
        </AccessibleIcon>
      </button>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'icon buttons',
} satisfies Story;
