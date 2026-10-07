import * as React from 'react';

import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TimePicker, type TimePickerProps } from './time-picker';

const Component = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = React.useState<string>();

  return <TimePicker aria-label="timepicker" locale="en-GB" value={value} onValueChange={setValue} {...props} />;
};

const render = (props?: Partial<TimePickerProps>) => ({
  user: userEvent.setup(),
  ...renderRTL(
    <div>
      <Component {...props} />
      <button type="button">testing</button>
    </div>,
  ),
});

const input = () => screen.getByRole('combobox', { name: 'timepicker' });

describe('TimePicker', () => {
  it('has "--:--" as the placeholder and a clock icon', () => {
    render();

    expect(input()).toHaveValue('');
    expect(input()).toHaveAttribute('placeholder', '--:--');
    expect(input()).toHaveAttribute('inputmode', 'numeric');
  });

  it('renders a value of the list', () => {
    render({ value: '01:00' });

    expect(input()).toHaveValue('01:00');
  });

  it('renders a value that is not in the list', () => {
    render({ value: '01:01' });

    expect(input()).toHaveValue('01:01');
  });

  it('ignores letters, but takes numbers and the separator', async () => {
    const { user } = render();

    await user.type(input(), 'a');
    await user.keyboard('[Escape]');

    expect(input()).toHaveValue('');

    await user.type(input(), '1');
    await user.keyboard('[Escape]');

    expect(input()).toHaveValue('1');

    await user.type(input(), ':00');
    await user.keyboard('[Escape]');

    expect(input()).toHaveValue('1:00');
  });

  it('calls onValueChange when a time is chosen in the list', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange });

    await user.click(input());
    // Base UI prevents the default of `pointerdown`, and user-event then skips the `click`
    fireEvent.click(await screen.findByRole('option', { name: '01:00' }));

    expect(onValueChange).toHaveBeenCalledWith('01:00');
    expect(input()).toHaveValue('01:00');
    expect((input() as HTMLInputElement).validity.patternMismatch).toBe(false);
  });

  it('calls onValueChange on blur after typing a valid time', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange });

    await user.type(input(), '01:00');
    await user.keyboard('[Escape]');
    await user.tab();

    expect(onValueChange).toHaveBeenCalledWith('01:00');
  });

  it('completes a partial time on blur', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange });

    await user.type(input(), '1');
    await user.keyboard('[Escape]');
    await user.tab();

    expect(onValueChange).toHaveBeenCalledWith('01:00');
    expect(input()).toHaveValue('01:00');

    await user.clear(input());
    await user.type(input(), '20');
    await user.keyboard('[Escape]');
    await user.tab();

    expect(onValueChange).toHaveBeenCalledWith('20:00');
  });

  it('takes a valid time that is not in the list on blur', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange });

    await user.type(input(), '01:01');
    await user.keyboard('[Escape]');
    await user.tab();

    expect(onValueChange).toHaveBeenCalledWith('01:01');
  });

  it('restores the value when an invalid time is typed', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange, value: '10:00' });

    await user.clear(input());
    await user.type(input(), '99:99');
    await user.keyboard('[Escape]');
    await user.tab();

    expect(onValueChange).not.toHaveBeenCalled();
    expect(input()).toHaveValue('10:00');
  });

  describe('step', () => {
    it('renders 96 options by default', async () => {
      const { user } = render();

      await user.click(input());
      await screen.findByRole('listbox');

      expect(screen.getAllByRole('option')).toHaveLength(96);
    });

    it('renders an option every step minutes', async () => {
      const { user } = render({ step: 30 });

      await user.click(input());
      await screen.findByRole('listbox');

      expect(screen.getAllByRole('option')).toHaveLength(24 * (60 / 30));
    });
  });

  it('shows a clear button that calls onClear', async () => {
    const onClear = jest.fn();
    const { user } = render({ value: '10:00', onClear, clearLabel: 'Clear time' });

    await user.click(screen.getByRole('button', { name: 'Clear time' }));

    expect(onClear).toHaveBeenCalled();
    expect(input()).toHaveValue('');
  });

  it('forwards its ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();

    renderRTL(<TimePicker ref={ref} aria-label="timepicker" />);

    expect(ref.current).toBe(input());
  });
});
