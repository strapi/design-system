import { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const FRAME_STYLE = {
  width: '32rem',
  height: '20rem',
  border: '1px solid currentColor',
  borderRadius: '4px',
  fontSize: '1.4rem',
} as const;

const ITEMS = Array.from({ length: 30 }, (_, index) => `Entry ${index + 1}`);

const meta: Meta<typeof ScrollArea> = {
  title: 'Next/ScrollArea',
  component: ScrollArea,
  argTypes: {
    viewportRef: {
      control: false,
      description: 'The ref of the viewport, the element that scrolls. `ref` goes to the root.',
      table: { type: { summary: 'Ref<HTMLDivElement>' } },
    },
    viewportClassName: {
      control: 'text',
      description: 'Classes for the viewport, the element that scrolls.',
      table: { type: { summary: 'string' } },
    },
  },
  render: (args) => (
    <div style={FRAME_STYLE}>
      <ScrollArea {...args}>
        <ul style={{ margin: 0, padding: '0.8rem 1.6rem', listStyle: 'none' }}>
          {ITEMS.map((item) => (
            <li key={item} style={{ padding: '0.4rem 0' }}>
              {item}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;

export const Horizontal = {
  render: (args) => (
    <div style={{ ...FRAME_STYLE, height: 'auto' }}>
      <ScrollArea {...args}>
        <div style={{ display: 'flex', gap: '0.8rem', padding: '1.6rem', width: 'max-content' }}>
          {ITEMS.slice(0, 15).map((item) => (
            <span key={item} style={{ whiteSpace: 'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
  name: 'horizontal',
} satisfies Story;
