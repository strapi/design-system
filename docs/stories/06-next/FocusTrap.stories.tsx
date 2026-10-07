import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, FocusTrap } from '@strapi/design-system/next';
import { fn } from 'storybook/test';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const PANEL_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.8rem',
  padding: '1.6rem',
  border: '1px dashed currentColor',
  borderRadius: '4px',
  fontSize: '1.4rem',
} as const;

const meta: Meta<typeof FocusTrap> = {
  title: 'Next/FocusTrap',
  component: FocusTrap,
  args: {
    onEscape: fn(),
    restoreFocus: true,
    skipAutoFocus: false,
  },
  argTypes: {
    onEscape: {
      description: 'Called when the user presses Escape inside the trap.',
      table: { type: { summary: '() => void' } },
    },
    restoreFocus: {
      description: 'If true, the focus goes back to the element that had it before, when the trap unmounts.',
      table: { defaultValue: { summary: 'true' } },
    },
    skipAutoFocus: {
      description: 'If true, the trap does not focus its first focusable element on mount.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>
        <Button onClick={() => setOpen(true)} disabled={open}>
          Open the trap
        </Button>
        {open ? (
          <FocusTrap
            {...args}
            onEscape={() => {
              args.onEscape?.();
              setOpen(false);
            }}
            style={PANEL_STYLE}
          >
            <span>Tab stays in this box. Escape closes it.</span>
            <Button>First</Button>
            <Button>Second</Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </FocusTrap>
        ) : null}
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof FocusTrap>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Open = {
  render: (args) => (
    <FocusTrap {...args} style={PANEL_STYLE}>
      <span>The first button has the focus.</span>
      <Button>First</Button>
      <Button>Last</Button>
    </FocusTrap>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;
