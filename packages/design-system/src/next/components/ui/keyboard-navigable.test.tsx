import * as React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { KeyboardNavigable } from './keyboard-navigable';

describe('KeyboardNavigable', () => {
  it('moves the focus between the elements of a tag name with the arrow keys, Home and End', async () => {
    const user = userEvent.setup();

    render(
      <KeyboardNavigable tagName="button">
        <button type="button">One</button>
        <button type="button">Two</button>
        <button type="button">Three</button>
      </KeyboardNavigable>,
    );

    const one = screen.getByRole('button', { name: 'One' });
    const two = screen.getByRole('button', { name: 'Two' });
    const three = screen.getByRole('button', { name: 'Three' });

    one.focus();

    await user.keyboard('{ArrowRight}');
    expect(two).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(three).toHaveFocus();

    // wraps to the first one
    await user.keyboard('{ArrowDown}');
    expect(one).toHaveFocus();

    // wraps to the last one
    await user.keyboard('{ArrowLeft}');
    expect(three).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(two).toHaveFocus();

    await user.keyboard('{Home}');
    expect(one).toHaveFocus();

    await user.keyboard('{End}');
    expect(three).toHaveFocus();
  });

  it('uses an attribute when no tag name is set', async () => {
    const user = userEvent.setup();

    render(
      <KeyboardNavigable attributeName="data-nav">
        <div tabIndex={0} data-nav>
          A
        </div>
        <div tabIndex={0} data-nav>
          B
        </div>
      </KeyboardNavigable>,
    );

    screen.getByText('A').focus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('B')).toHaveFocus();
  });

  it('ignores the keys when the focused element does not match', async () => {
    const user = userEvent.setup();

    render(
      <KeyboardNavigable tagName="button">
        <input aria-label="Search" />
        <button type="button">One</button>
      </KeyboardNavigable>,
    );

    const input = screen.getByRole('textbox', { name: 'Search' });
    input.focus();

    await user.keyboard('{ArrowRight}');

    expect(input).toHaveFocus();
  });

  it('forwards its ref, props and onKeyDown', () => {
    const ref = React.createRef<HTMLDivElement>();
    const onKeyDown = jest.fn();

    render(<KeyboardNavigable ref={ref} tagName="button" data-testid="nav" className="flex" onKeyDown={onKeyDown} />);

    const element = screen.getByTestId('nav');

    expect(ref.current).toBe(element);
    expect(element).toHaveClass('flex');

    fireEvent.keyDown(element, { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
