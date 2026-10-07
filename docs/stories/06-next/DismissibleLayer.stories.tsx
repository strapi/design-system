import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, DismissibleLayer } from '@strapi/design-system/next';
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

const meta: Meta<typeof DismissibleLayer> = {
  title: 'Next/DismissibleLayer',
  component: DismissibleLayer,
  args: {
    disableOutsidePointerEvents: false,
    onEscapeKeyDown: fn(),
    onPointerDownOutside: fn(),
    onFocusOutside: fn(),
    onInteractOutside: fn(),
    onDismiss: fn(),
  },
  argTypes: {
    disableOutsidePointerEvents: {
      description: 'If true, the elements outside the layer ignore the pointer while the layer is mounted.',
      table: { defaultValue: { summary: 'false' } },
    },
    onEscapeKeyDown: {
      description: 'Called on Escape when this layer is the highest. `event.preventDefault()` keeps it open.',
      table: { type: { summary: '(event: KeyboardEvent) => void' } },
    },
    onPointerDownOutside: {
      description: 'Called on a pointer down outside. `event.preventDefault()` keeps the layer open.',
      table: { type: { summary: '(event: CustomEvent<{ originalEvent: PointerEvent }>) => void' } },
    },
    onFocusOutside: {
      description: 'Called when the focus leaves the layer. `event.preventDefault()` keeps the layer open.',
      table: { type: { summary: '(event: CustomEvent<{ originalEvent: FocusEvent }>) => void' } },
    },
    onInteractOutside: {
      description: 'Called after `onPointerDownOutside` or `onFocusOutside`.',
      table: { type: { summary: '(event) => void' } },
    },
    onDismiss: {
      description: 'Called when the layer should close.',
      table: { type: { summary: '() => void' } },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>
        <Button onClick={() => setOpen(true)} disabled={open}>
          Open the layer
        </Button>
        {open ? (
          <DismissibleLayer
            {...args}
            onDismiss={() => {
              args.onDismiss?.();
              setOpen(false);
            }}
            style={PANEL_STYLE}
          >
            <span>Press Escape, click outside or tab out to dismiss this layer.</span>
            <Button>Inside</Button>
          </DismissibleLayer>
        ) : null}
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof DismissibleLayer>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;
