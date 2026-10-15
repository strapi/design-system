import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from './drawer';

describe('Drawer', () => {
  it('opens from its trigger and closes from its close button', async () => {
    const user = userEvent.setup();

    render(
      <Drawer swipeDirection="right">
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
          <DrawerDescription>Add the entry to a release.</DrawerDescription>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = screen.getByRole('dialog', { name: 'Releases' });

    expect(dialog).toHaveAccessibleDescription('Add the entry to a release.');

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes when the user presses Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.getByRole('dialog', { name: 'Releases' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('closes from Escape when it is controlled', async () => {
    const user = userEvent.setup();

    const ControlledDrawer = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerTitle>Releases</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );
    };

    render(<ControlledDrawer />);

    expect(screen.getByRole('dialog', { name: 'Releases' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('forwards its refs', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    const titleRef = React.createRef<HTMLHeadingElement>();

    render(
      <Drawer defaultOpen>
        <DrawerTrigger ref={triggerRef}>Open</DrawerTrigger>
        <DrawerContent ref={contentRef}>
          <DrawerTitle ref={titleRef}>Releases</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Open', hidden: true }));
    expect(contentRef.current).toBe(screen.getByRole('dialog'));
    expect(titleRef.current).toBe(screen.getByRole('heading', { name: 'Releases' }));
  });
});
