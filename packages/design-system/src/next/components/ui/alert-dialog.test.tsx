import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const Icon = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon" {...props} />;

const Confirm = ({
  onConfirm,
  defaultOpen,
  body = 'Are you sure you want to delete this?',
}: {
  onConfirm?: () => void;
  defaultOpen?: boolean;
  body?: React.ReactNode;
}) => (
  <AlertDialog defaultOpen={defaultOpen}>
    <AlertDialogTrigger>Delete</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogBody icon={<Icon />}>{body}</AlertDialogBody>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

describe('AlertDialog', () => {
  it('renders only the trigger while closed', () => {
    render(<Confirm />);

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('opens an alertdialog named by its title and described by its body', async () => {
    const user = userEvent.setup();

    render(<Confirm />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    const dialog = await screen.findByRole('alertdialog', { name: 'Confirmation' });

    expect(dialog).toHaveAccessibleDescription('Are you sure you want to delete this?');
    expect(screen.getByRole('heading', { level: 2, name: 'Confirmation' })).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this?').tagName).toBe('P');
    expect(screen.getByRole('contentinfo')).toContainElement(screen.getByRole('button', { name: 'Confirm' }));
  });

  it('renders the icon at 24px only when the body is a string', () => {
    const { unmount } = render(<Confirm defaultOpen />);

    expect(screen.getByTestId('icon')).toHaveAttribute('width', '24');
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');

    unmount();

    render(<Confirm defaultOpen body={<span>Custom body</span>} />);

    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.getByText('Custom body')).toBeInTheDocument();
  });

  it('closes on Cancel without confirming', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(<Confirm defaultOpen onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('confirms then closes on Action', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(<Confirm defaultOpen onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  });

  it('closes on Escape and gives focus back to the trigger', async () => {
    const user = userEvent.setup();

    render(<Confirm />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await screen.findByRole('alertdialog');
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus();
  });

  it('forwards the refs of its parts', () => {
    const contentRef = React.createRef<HTMLDivElement>();
    const footerRef = React.createRef<HTMLElement>();
    const cancelRef = React.createRef<HTMLButtonElement>();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent ref={contentRef}>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogFooter ref={footerRef}>
            <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(contentRef.current).toBe(screen.getByRole('alertdialog'));
    expect(footerRef.current?.tagName).toBe('FOOTER');
    expect(cancelRef.current).toBe(screen.getByRole('button', { name: 'Cancel' }));
  });
});
