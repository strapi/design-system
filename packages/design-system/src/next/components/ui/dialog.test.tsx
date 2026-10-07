import * as React from 'react';

import { act, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
// The close button renders an icon of @strapi/icons, which reads the styled-components theme
import { render } from '@test/utils';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

// The scroll area of the body measures itself in a frame after it mounts
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 20)));

const Modal = ({ closeLabel, defaultOpen }: { closeLabel?: string; defaultOpen?: boolean }) => (
  <Dialog defaultOpen={defaultOpen}>
    <DialogTrigger>Open modal</DialogTrigger>
    <DialogContent>
      <DialogHeader closeLabel={closeLabel}>
        <DialogTitle>Edit entry</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <label>
          Name
          <input />
        </label>
      </DialogBody>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <button type="button">Finish</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe('Dialog', () => {
  // jsdom has no Web Animations API, which the scroll area of the body calls
  beforeAll(() => {
    if (!Element.prototype.getAnimations) {
      Element.prototype.getAnimations = () => [];
    }
  });

  it('renders only the trigger while closed', () => {
    render(<Modal />);

    expect(screen.getByRole('button', { name: 'Open modal' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens a dialog named by its title', async () => {
    const user = userEvent.setup();

    render(<Modal />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));

    const dialog = await screen.findByRole('dialog', { name: 'Edit entry' });
    await settle();

    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Edit entry' })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toContainElement(screen.getByRole('button', { name: 'Close modal' }));
    expect(screen.getByRole('contentinfo')).toContainElement(screen.getByRole('button', { name: 'Finish' }));
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('labels the close button with closeLabel', async () => {
    render(<Modal defaultOpen closeLabel="Fermer" />);
    await settle();

    expect(screen.getByRole('button', { name: 'Fermer' })).toBeInTheDocument();
  });

  it('hides the close button with showCloseButton={false}', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader showCloseButton={false}>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument();
  });

  it.each(['Close modal', 'Cancel'])('closes with the %s button', async (name) => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('closes on Escape and gives focus back to the trigger', async () => {
    const user = userEvent.setup();

    render(<Modal />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    await screen.findByRole('dialog');
    await settle();
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Open modal' })).toHaveFocus();
  });

  it('forwards the refs of its parts', async () => {
    const contentRef = React.createRef<HTMLDivElement>();
    const headerRef = React.createRef<HTMLElement>();
    const titleRef = React.createRef<HTMLHeadingElement>();
    const bodyRef = React.createRef<HTMLDivElement>();
    const footerRef = React.createRef<HTMLElement>();

    render(
      <Dialog defaultOpen>
        <DialogContent ref={contentRef}>
          <DialogHeader ref={headerRef}>
            <DialogTitle ref={titleRef}>Title</DialogTitle>
          </DialogHeader>
          <DialogBody ref={bodyRef}>Body</DialogBody>
          <DialogFooter ref={footerRef} />
        </DialogContent>
      </Dialog>,
    );
    await settle();

    expect(contentRef.current).toBe(screen.getByRole('dialog'));
    expect(headerRef.current?.tagName).toBe('HEADER');
    expect(titleRef.current).toBe(screen.getByRole('heading', { name: 'Title' }));
    expect(bodyRef.current).toHaveAttribute('data-slot', 'dialog-body');
    expect(footerRef.current?.tagName).toBe('FOOTER');
  });
});
