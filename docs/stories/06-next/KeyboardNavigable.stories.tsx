import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, KeyboardNavigable } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const CARD_STYLE = {
  padding: '1.6rem',
  border: '1px solid currentColor',
  borderRadius: '4px',
  fontSize: '1.4rem',
} as const;

const meta: Meta<typeof KeyboardNavigable> = {
  title: 'Next/KeyboardNavigable',
  component: KeyboardNavigable,
  args: {
    tagName: 'button',
  },
  argTypes: {
    tagName: {
      control: 'text',
      description: 'The tag name, in lower case, of the elements to move between. It wins over `attributeName`.',
      table: { type: { summary: 'string' } },
    },
    attributeName: {
      control: 'text',
      description: 'The attribute that marks the elements to move between, when `tagName` is not set.',
      table: { type: { summary: 'string' } },
    },
  },
  render: (args) => (
    <KeyboardNavigable {...args} style={{ display: 'flex', gap: '0.8rem' }}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </KeyboardNavigable>
  ),
};

export default meta;

type Story = StoryObj<typeof KeyboardNavigable>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;

export const WithAnAttribute = {
  render: () => (
    <KeyboardNavigable
      attributeName="data-card"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}
    >
      {['Folder A', 'Folder B', 'Folder C'].map((name) => (
        <article key={name} tabIndex={0} data-card style={CARD_STYLE}>
          {name}
        </article>
      ))}
    </KeyboardNavigable>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'with an attribute',
} satisfies Story;
