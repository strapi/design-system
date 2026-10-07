import * as React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { FocusTrap } from './focus-trap';

const Trap = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof FocusTrap>>((props, ref) => (
  <FocusTrap ref={ref} {...props}>
    <button type="button">First</button>
    <input aria-label="Middle" />
    <button type="button">Last</button>
  </FocusTrap>
));

describe('FocusTrap', () => {
  it('focuses the first focusable element on mount', () => {
    render(<Trap />);

    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });

  it('does not move the focus with skipAutoFocus', () => {
    render(<Trap skipAutoFocus />);

    expect(document.body).toHaveFocus();
  });

  it('loops the focus with Tab and Shift+Tab', async () => {
    const user = userEvent.setup();

    render(<Trap />);

    await user.tab();
    expect(screen.getByRole('textbox', { name: 'Middle' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();
  });

  it('calls onEscape on Escape', async () => {
    const user = userEvent.setup();
    const onEscape = jest.fn();

    render(<Trap onEscape={onEscape} />);

    await user.keyboard('{Escape}');

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('restores the focus on unmount, unless restoreFocus is false', () => {
    const Example = ({ restoreFocus }: { restoreFocus: boolean }) => {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <button type="button" onClick={() => setOpen((prev) => !prev)}>
            Toggle
          </button>
          {open ? (
            <FocusTrap restoreFocus={restoreFocus} onEscape={() => setOpen(false)}>
              <button type="button">Inside</button>
            </FocusTrap>
          ) : null}
        </>
      );
    };

    const { unmount } = render(<Example restoreFocus />);

    const toggle = screen.getByRole('button', { name: 'Toggle' });
    toggle.focus();
    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('button', { name: 'Inside' }), { key: 'Escape' });

    expect(toggle).toHaveFocus();

    unmount();

    render(<Example restoreFocus={false} />);

    const otherToggle = screen.getByRole('button', { name: 'Toggle' });
    otherToggle.focus();
    fireEvent.click(otherToggle);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Inside' }), { key: 'Escape' });

    expect(otherToggle).not.toHaveFocus();
  });

  it('forwards its ref, props and onKeyDown', () => {
    const ref = React.createRef<HTMLDivElement>();
    const onKeyDown = jest.fn();

    render(<Trap ref={ref} data-testid="trap" className="custom" onKeyDown={onKeyDown} />);

    const trap = screen.getByTestId('trap');

    expect(ref.current).toBe(trap);
    expect(trap).toHaveClass('custom');

    fireEvent.keyDown(trap, { key: 'a' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
