import * as React from 'react';

import { render } from '@test/utils';

import { Checkbox } from './checkbox';

/**
 * Base UI forwards a click to its hidden input as a `PointerEvent`. The mock in `test/env-setup.js` extends
 * `Event`, and jsdom only toggles a checkbox for a `MouseEvent`, so these tests use a `MouseEvent` instead
 */
const OriginalPointerEvent = window.PointerEvent;

beforeAll(() => {
  window.PointerEvent = class extends MouseEvent {} as typeof PointerEvent;
});

afterAll(() => {
  window.PointerEvent = OriginalPointerEvent;
});

describe('Checkbox', () => {
  it('renders a checkbox labelled by its children', async () => {
    const onCheckedChange = jest.fn();
    const { getByRole, user } = render(<Checkbox onCheckedChange={onCheckedChange}>Accept the terms</Checkbox>);

    const checkbox = getByRole('checkbox', { name: 'Accept the terms' });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('toggles when its label is clicked', async () => {
    const { getByRole, getByText, user } = render(<Checkbox>Remember me</Checkbox>);

    await user.click(getByText('Remember me'));

    expect(getByRole('checkbox', { name: 'Remember me' })).toBeChecked();
  });

  it('toggles with the Space key', async () => {
    const { getByRole, user } = render(<Checkbox aria-label="Select row" />);

    await user.tab();
    await user.keyboard(' ');

    expect(getByRole('checkbox', { name: 'Select row' })).toBeChecked();
  });

  it('can be controlled, with an indeterminate state', () => {
    const { getByRole, rerender } = render(<Checkbox aria-label="Select all" checked="indeterminate" />);

    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');

    rerender(<Checkbox aria-label="Select all" checked />);

    expect(getByRole('checkbox')).toBeChecked();

    rerender(<Checkbox aria-label="Select all" checked={false} indeterminate />);

    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('can start checked', () => {
    const { getByRole } = render(<Checkbox aria-label="Select" defaultChecked />);

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('ignores clicks when disabled', async () => {
    const onCheckedChange = jest.fn();
    const { getByRole, user } = render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Disabled
      </Checkbox>,
    );

    await user.click(getByRole('checkbox', { name: 'Disabled' }));

    expect(onCheckedChange).not.toHaveBeenCalled();
    // A native disabled button, like the legacy Radix checkbox
    expect(getByRole('checkbox')).toBeDisabled();
  });

  it('forwards its ref, with or without a label', () => {
    const ref = React.createRef<HTMLElement>();
    const { getByRole, rerender } = render(<Checkbox ref={ref} aria-label="Alone" />);

    expect(ref.current).toBe(getByRole('checkbox'));

    rerender(<Checkbox ref={ref}>Labelled</Checkbox>);

    expect(ref.current).toBe(getByRole('checkbox'));
  });
});
