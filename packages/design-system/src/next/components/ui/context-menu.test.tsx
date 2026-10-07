import * as React from 'react';

import { fireEvent, screen, waitFor } from '@testing-library/react';
// The items render icons of @strapi/icons, which read the styled-components theme
import { render } from '@test/utils';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './dropdown-menu';

/*
 * jsdom has no DOMRect, which Base UI builds to anchor a context menu at the pointer. The real one has the same
 * shape: a rect from x, y, width and height
 */
beforeAll(() => {
  if (typeof globalThis.DOMRect === 'undefined') {
    class DOMRectPolyfill {
      constructor(
        public x = 0,
        public y = 0,
        public width = 0,
        public height = 0,
      ) {}

      get top() {
        return this.y;
      }

      get left() {
        return this.x;
      }

      get right() {
        return this.x + this.width;
      }

      get bottom() {
        return this.y + this.height;
      }

      static fromRect(rect: { x?: number; y?: number; width?: number; height?: number } = {}) {
        return new DOMRectPolyfill(rect.x, rect.y, rect.width, rect.height);
      }

      toJSON() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
      }
    }

    globalThis.DOMRect = DOMRectPolyfill as unknown as typeof DOMRect;
  }
});

const Menu = ({ onRename }: { onRename?: () => void }) => (
  <ContextMenu>
    <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onClick={onRename}>Rename</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="danger">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

describe('ContextMenu', () => {
  it('renders only the trigger area initially', () => {
    render(<Menu />);

    expect(screen.getByText('Right-click here')).toHaveAttribute('data-slot', 'context-menu-trigger');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on a right-click with the items of the dropdown menu', async () => {
    render(<Menu />);

    fireEvent.contextMenu(screen.getByText('Right-click here'), { clientX: 40, clientY: 60 });

    expect(await screen.findByRole('menu')).toHaveAttribute('data-slot', 'context-menu-content');
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveAttribute('data-slot', 'context-menu-item');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-variant', 'danger');
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('calls the action of an item and closes', async () => {
    const onRename = jest.fn();
    const { user } = render(<Menu onRename={onRename} />);

    fireEvent.contextMenu(screen.getByText('Right-click here'));
    await user.click(await screen.findByRole('menuitem', { name: 'Rename' }));

    expect(onRename).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on Escape', async () => {
    const { user } = render(<Menu />);

    fireEvent.contextMenu(screen.getByText('Right-click here'));
    await screen.findByRole('menu');
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });
});

/*
 * A menu opened at a point with no trigger, e.g. by the right-click handler of a grid that decides what to show:
 * a controlled DropdownMenu anchored to a virtual element at the cursor
 */
describe('DropdownMenu at the cursor', () => {
  const AtCursor = ({ onClose }: { onClose: () => void }) => {
    const [open, setOpen] = React.useState(true);
    const anchor = React.useMemo(
      () => ({ getBoundingClientRect: () => DOMRect.fromRect({ x: 120, y: 80, width: 0, height: 0 }) }),
      [],
    );

    return (
      <DropdownMenu
        open={open}
        onOpenChange={(next) => {
          setOpen(next);

          if (!next) {
            onClose();
          }
        }}
      >
        <DropdownMenuContent anchor={anchor} aria-label="Asset actions">
          <DropdownMenuItem>Download</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  it('opens without a trigger and closes on Escape', async () => {
    const onClose = jest.fn();
    const { user } = render(<AtCursor onClose={onClose} />);

    expect(await screen.findByRole('menu', { name: 'Asset actions' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Download' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
