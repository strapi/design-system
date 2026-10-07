import * as React from 'react';

import { screen, waitFor } from '@testing-library/react';
// The close button renders an icon of @strapi/icons, which reads the styled-components theme
import { render } from '@test/utils';

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetContentProps,
} from './sheet';

const Panel = ({
  modal,
  disablePointerDismissal,
  ...contentProps
}: Pick<React.ComponentProps<typeof Sheet>, 'modal' | 'disablePointerDismissal'> & Partial<SheetContentProps>) => (
  <>
    <button type="button">Outside</button>
    <Sheet modal={modal} disablePointerDismissal={disablePointerDismissal}>
      <SheetTrigger>Open details</SheetTrigger>
      <SheetContent {...contentProps}>
        <SheetHeader>
          <SheetTitle>Asset details</SheetTitle>
          <SheetDescription>Edit the asset</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <label>
            Name
            <input />
          </label>
        </SheetBody>
        <SheetFooter>
          <SheetClose>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
);

describe('Sheet', () => {
  // jsdom has no Web Animations API, which the scroll area of the body calls
  beforeAll(() => {
    if (!Element.prototype.getAnimations) {
      Element.prototype.getAnimations = () => [];
    }
  });

  it('opens a dialog named and described by its title and description', async () => {
    const { user } = render(<Panel />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open details' }));

    const dialog = await screen.findByRole('dialog', { name: 'Asset details' });

    expect(dialog).toHaveAccessibleDescription('Edit the asset');
    expect(dialog).toHaveAttribute('data-side', 'right');
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('closes with the close button, named by closeLabel', async () => {
    const { user } = render(<Panel closeLabel="Close the details" />);

    await user.click(screen.getByRole('button', { name: 'Open details' }));
    await user.click(await screen.findByRole('button', { name: 'Close the details' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes with SheetClose and on Escape', async () => {
    const { user } = render(<Panel />);

    await user.click(screen.getByRole('button', { name: 'Open details' }));
    await user.click(await screen.findByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open details' }));
    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('hides the close button and the overlay on demand', async () => {
    const { user } = render(<Panel showCloseButton={false} showOverlay={false} />);

    await user.click(screen.getByRole('button', { name: 'Open details' }));
    await screen.findByRole('dialog');

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    expect(document.querySelector('[data-slot="sheet-overlay"]')).not.toBeInTheDocument();
  });

  it('stays open on an outside press with disablePointerDismissal, and keeps the page usable when not modal', async () => {
    const { user } = render(<Panel modal={false} disablePointerDismissal showOverlay={false} />);

    await user.click(screen.getByRole('button', { name: 'Open details' }));
    await screen.findByRole('dialog');
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it('places the panel by side, and as a floating card', async () => {
    const { user } = render(<Panel side="responsive" floating className="medium:w-120" />);

    await user.click(screen.getByRole('button', { name: 'Open details' }));

    const dialog = await screen.findByRole('dialog');
    const panel = dialog.querySelector('[data-slot="sheet-panel"]');

    expect(dialog).toHaveAttribute('data-side', 'responsive');
    expect(dialog).toHaveClass('bottom-0', 'medium:left-auto', 'p-2');
    expect(panel).toHaveClass('rounded-md', 'border', 'medium:w-120');
  });
});
