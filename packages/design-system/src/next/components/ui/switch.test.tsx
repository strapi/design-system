import * as React from 'react';

import { render } from '@test/utils';

import { Switch } from './switch';

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

describe('Switch', () => {
  it('renders a switch that toggles on click', async () => {
    const onCheckedChange = jest.fn();
    const { getByRole, user } = render(<Switch aria-label="Publish" onCheckedChange={onCheckedChange} />);

    const control = getByRole('switch', { name: 'Publish' });

    expect(control).not.toBeChecked();

    await user.click(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('shows the visible labels, hidden from assistive technology', async () => {
    const { getByRole, getByText, user } = render(
      <Switch aria-label="Publish" visibleLabels onLabel="Published" offLabel="Draft" />,
    );

    expect(getByText('Draft')).toHaveAttribute('aria-hidden', 'true');

    await user.click(getByRole('switch'));

    expect(getByText('Published')).toHaveAttribute('data-state', 'checked');
  });

  it('can be controlled', async () => {
    const onCheckedChange = jest.fn();
    const { getByRole, getByText, user } = render(
      <Switch aria-label="Publish" checked visibleLabels onCheckedChange={onCheckedChange} />,
    );

    expect(getByText('On')).toBeInTheDocument();

    await user.click(getByRole('switch'));

    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
    expect(getByRole('switch')).toBeChecked();
  });

  it('ignores clicks when disabled', async () => {
    const onCheckedChange = jest.fn();
    const { getByRole, getByText, user } = render(
      <Switch aria-label="Publish" disabled visibleLabels onCheckedChange={onCheckedChange} />,
    );

    await user.click(getByRole('switch'));

    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(getByText('Off')).toHaveAttribute('data-disabled');
  });

  it('toggles with the Space key and forwards its ref', async () => {
    const ref = React.createRef<HTMLElement>();
    const { getByRole, user } = render(<Switch ref={ref} aria-label="Publish" defaultChecked />);

    expect(ref.current).toBe(getByRole('switch'));
    expect(getByRole('switch')).toBeChecked();

    await user.tab();
    await user.keyboard(' ');

    expect(getByRole('switch')).not.toBeChecked();
  });
});
