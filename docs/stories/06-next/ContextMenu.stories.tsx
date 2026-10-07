import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Pencil, Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@strapi/design-system/next';

const meta: Meta<typeof ContextMenu> = {
  title: 'Next/ContextMenu',
  component: ContextMenu,
  parameters: { controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Base = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-50 w-100 items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm text-neutral-600">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Asset</ContextMenuLabel>
        <ContextMenuItem startIcon={<Pencil />} onClick={fn()}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem startIcon={<Download />} onClick={fn()}>
          Download
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={fn()}>Photos</ContextMenuItem>
            <ContextMenuItem onClick={fn()}>Videos</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="danger" startIcon={<Trash />} onClick={fn()}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  name: 'base',
} satisfies Story;

const AtCursorExample = () => {
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  // A virtual anchor: the menu is placed against a zero-sized rect at the pointer
  const anchor = React.useMemo(
    () =>
      position
        ? { getBoundingClientRect: () => DOMRect.fromRect({ x: position.x, y: position.y, width: 0, height: 0 }) }
        : null,
    [position],
  );

  return (
    <>
      <div
        className="flex h-50 w-100 items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm text-neutral-600"
        onContextMenu={(event) => {
          event.preventDefault();
          setPosition({ x: event.clientX, y: event.clientY });
        }}
      >
        Right-click here (controlled)
      </div>
      <DropdownMenu open={position !== null} onOpenChange={(open) => !open && setPosition(null)}>
        <DropdownMenuContent anchor={anchor} sideOffset={0} aria-label="Asset actions">
          <DropdownMenuItem onClick={fn()}>Rename</DropdownMenuItem>
          <DropdownMenuItem variant="danger" onClick={fn()}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const AtCursor = {
  render: () => <AtCursorExample />,
  name: 'at the cursor, controlled',
} satisfies Story;
