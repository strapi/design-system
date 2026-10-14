import * as React from 'react';

import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { render as renderWithProvider } from '@test/utils';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Modal } from '../../../components/Modal';
import { SingleSelect, SingleSelectOption } from '../../../components/Select/SingleSelect';

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
    expect(onOpenChange).toHaveBeenCalledTimes(1);
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

  it('closes from its actionsRef', async () => {
    const actionsRef = React.createRef<DrawerPrimitive.Root.Actions>();

    render(
      <Drawer defaultOpen actionsRef={actionsRef}>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.getByRole('dialog', { name: 'Releases' })).toBeInTheDocument();

    act(() => actionsRef.current?.close());

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays open when another layer handles the Escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    const preventEscape = (event: KeyboardEvent) => event.preventDefault();

    render(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    document.addEventListener('keydown', preventEscape);
    await user.keyboard('{Escape}');
    await new Promise((resolve) => setTimeout(resolve));
    document.removeEventListener('keydown', preventEscape);

    expect(screen.getByRole('dialog', { name: 'Releases' })).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('stays open when Escape closes a legacy SingleSelect', async () => {
    const onOpenChange = jest.fn();

    const { user } = renderWithProvider(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
          <SingleSelect aria-label="Fruit" placeholder="Pick a fruit">
            <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          </SingleSelect>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    expect(screen.getByRole('listbox', { hidden: true })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('listbox', { hidden: true })).not.toBeInTheDocument());
    expect(screen.getByRole('dialog', { name: 'Releases' })).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('stays open when Escape closes a legacy Modal', async () => {
    const onOpenChange = jest.fn();

    const { user } = renderWithProvider(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Releases</DrawerTitle>
          <Modal.Root>
            <Modal.Trigger>
              <button type="button">Open modal</button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Legacy modal</Modal.Title>
              </Modal.Header>
            </Modal.Content>
          </Modal.Root>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    expect(screen.getByRole('dialog', { name: 'Legacy modal' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Legacy modal' })).not.toBeInTheDocument());
    expect(screen.getByRole('dialog', { name: 'Releases', hidden: true })).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
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
