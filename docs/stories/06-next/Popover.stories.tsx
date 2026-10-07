import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  Popover,
  PopoverContent,
  type PopoverContentProps,
  PopoverScrollArea,
  PopoverTrigger,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

interface PopoverArgs extends Pick<PopoverContentProps, 'side' | 'align' | 'sideOffset'> {
  defaultOpen?: boolean;
}

const meta: Meta<PopoverArgs> = {
  title: 'Next/Popover',
  args: {
    side: 'bottom',
    align: 'start',
    sideOffset: 4,
  },
  argTypes: {
    side: {
      control: 'select',
      options: SIDES,
      description: 'The side of the trigger the content opens on.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    align: {
      control: 'select',
      options: ALIGNS,
      description: 'The alignment of the content against the trigger.',
      table: { defaultValue: { summary: 'start' } },
    },
    sideOffset: {
      description: 'The distance from the trigger, in px.',
      table: { defaultValue: { summary: '4' } },
    },
  },
  render: ({ defaultOpen, ...args }) => (
    <div style={{ minHeight: '24rem', padding: '8rem' }}>
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger render={<Button variant="tertiary" />}>Open the popover</PopoverTrigger>
        <PopoverContent {...args}>
          <div style={{ padding: '1.6rem', fontSize: '1.4rem', maxWidth: '28rem' }}>
            A popover shows more content next to its trigger, without blocking the page.
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export default meta;

type Story = StoryObj<PopoverArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

const ITEM_STYLE = { padding: '0.8rem 1.6rem', fontSize: '1.4rem' } as const;

const InfiniteList = ({ defaultOpen }: { defaultOpen?: boolean }) => {
  const [items, setItems] = React.useState(() => Array.from({ length: 15 }, (_, index) => index + 1));

  return (
    <div style={{ minHeight: '28rem' }}>
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger render={<Button variant="tertiary" />}>Pick a locale</PopoverTrigger>
        <PopoverContent>
          <PopoverScrollArea
            onReachEnd={() =>
              setItems((previous) => [
                ...previous,
                ...Array.from({ length: 10 }, (_, index) => previous.length + index + 1),
              ])
            }
          >
            {items.map((item) => (
              <div key={item} style={ITEM_STYLE}>
                Locale {item}
              </div>
            ))}
          </PopoverScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const ScrollArea = {
  render: () => <InfiniteList />,
  parameters: { controls: { disable: true } },
  name: 'scroll area',
} satisfies Story;

/**
 * Open on load, for the visual tests.
 */
export const Open = {
  render: () => (
    <div style={{ display: 'flex', gap: '24rem', minHeight: '28rem', padding: '1.6rem' }}>
      <Popover defaultOpen modal={false}>
        <PopoverTrigger render={<Button variant="tertiary" />}>Open the popover</PopoverTrigger>
        <PopoverContent>
          <div style={{ padding: '1.6rem', fontSize: '1.4rem', maxWidth: '28rem' }}>
            A popover shows more content next to its trigger, without blocking the page.
          </div>
        </PopoverContent>
      </Popover>
      <InfiniteList defaultOpen />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;
