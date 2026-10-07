import * as React from 'react';

import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DateTimePicker, type DateTimePickerProps } from './date-time-picker';

const Component = (props: Partial<DateTimePickerProps>) => <DateTimePicker locale="en-GB" {...props} />;

const render = (props: Partial<DateTimePickerProps> = {}) => ({
  user: userEvent.setup(),
  ...renderRTL(<Component {...props} />),
});

const dateInput = () => screen.getByRole('combobox', { name: 'Choose date' });
const timeInput = () => screen.getByRole('combobox', { name: 'Choose time' });

const formatDate = (date: number | Date, locale = 'en-GB') => new Intl.DateTimeFormat(locale).format(date);

const pickDay = async (user: ReturnType<typeof userEvent.setup>, name: RegExp | string) => {
  await user.click(dateInput());
  await screen.findByRole('dialog');
  await user.click(screen.getByRole('button', { name }));
};

const pickTime = async (user: ReturnType<typeof userEvent.setup>, name: RegExp | string) => {
  await user.click(timeInput());
  // Base UI prevents the default of `pointerdown`, and user-event then skips the `click`
  fireEvent.click(await screen.findByRole('option', { name }));
};

describe('DateTimePicker', () => {
  it('renders a date field and a time field in a group', () => {
    renderRTL(
      <>
        <span id="label">Publish at</span>
        <Component aria-labelledby="label" />
      </>,
    );

    expect(screen.getByRole('group', { name: 'Publish at' })).toBeInTheDocument();
    expect(dateInput()).toHaveValue('');
    expect(timeInput()).toHaveValue('');
  });

  it('opens the calendar from the date field', async () => {
    const { user } = render();

    await user.click(dateInput());

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('opens the list from the time field', async () => {
    const { user } = render();

    await user.click(timeInput());

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('fills the time with 00:00 when a day is picked first', async () => {
    const { user } = render({ defaultValue: new Date('12/01/2023') });

    await pickDay(user, 'Friday, 15 December 2023');

    expect(dateInput()).toHaveValue('15/12/2023');
    expect(timeInput()).toHaveValue('00:00');
  });

  it('fills the date with today when a time is picked first', async () => {
    const { user } = render();

    await pickTime(user, '12:00');

    expect(dateInput()).toHaveValue(formatDate(new Date()));
    expect(timeInput()).toHaveValue('12:00');
  });

  it('keeps the time when a day is picked', async () => {
    const { user } = render({ defaultValue: new Date('12/01/2023 12:00') });

    await pickDay(user, 'Friday, 15 December 2023');

    expect(dateInput()).toHaveValue('15/12/2023');
    expect(timeInput()).toHaveValue('12:00');
  });

  it('clears both fields with the date clear button, and calls onClear', async () => {
    const onClear = jest.fn();
    const { user } = render({ onClear, defaultValue: new Date('12/01/2023') });

    await pickDay(user, 'Friday, 15 December 2023');
    await user.click(screen.getByRole('button', { name: 'clear date' }));

    expect(dateInput()).toHaveValue('');
    expect(timeInput()).toHaveValue('');
    expect(onClear).toHaveBeenCalled();
  });

  it('clears a controlled value the first time the clear button is pressed', async () => {
    const Controlled = () => {
      const [value, setValue] = React.useState<Date | null>(new Date('12/01/2023 10:00'));

      return (
        <DateTimePicker
          locale="en-GB"
          value={value}
          onValueChange={(date) => setValue(date ?? null)}
          onClear={() => setValue(null)}
        />
      );
    };

    const user = userEvent.setup();
    renderRTL(<Controlled />);

    await pickDay(user, 'Friday, 15 December 2023');

    expect(dateInput()).toHaveValue('15/12/2023');
    expect(timeInput()).toHaveValue('10:00');

    await pickTime(user, '12:30');

    expect(timeInput()).toHaveValue('12:30');

    await user.click(screen.getByRole('button', { name: 'clear date' }));

    expect(dateInput()).toHaveValue('');
    expect(timeInput()).toHaveValue('');
  });

  it('resets the time to 00:00 with the time clear button, without onClear', async () => {
    const onClear = jest.fn();
    const { user } = render({ onClear });

    await pickTime(user, '12:00');

    await user.click(screen.getByRole('button', { name: 'clear time' }));

    expect(timeInput()).toHaveValue('00:00');
    expect(dateInput()).toHaveValue(formatDate(new Date()));
    expect(onClear).not.toHaveBeenCalled();
  });

  it('passes required and disabled to both fields', () => {
    const { rerender } = render({ required: true });

    expect(dateInput()).toBeRequired();
    expect(timeInput()).toBeRequired();

    rerender(<Component disabled />);

    expect(dateInput()).toBeDisabled();
    expect(timeInput()).toBeDisabled();
  });

  it('passes the step to the time field', async () => {
    const { user } = render({ step: 30 });

    await user.click(timeInput());
    await screen.findByRole('listbox');

    expect(screen.getAllByRole('option')).toHaveLength(24 * (60 / 30));
  });

  it('renders the value and its updates', () => {
    const { rerender } = render({ value: new Date('12/15/2023 12:00') });

    expect(dateInput()).toHaveValue('15/12/2023');
    expect(timeInput()).toHaveValue('12:00');

    rerender(<Component value={new Date('12/20/2023 12:30')} />);

    expect(dateInput()).toHaveValue('20/12/2023');
    expect(timeInput()).toHaveValue('12:30');

    rerender(<Component value={undefined} />);

    expect(dateInput()).toHaveValue('');
    expect(timeInput()).toHaveValue('');
  });

  it('calls onValueChange when uncontrolled', async () => {
    const onValueChange = jest.fn();
    const { user } = render({ onValueChange, defaultValue: new Date('12/01/2023') });

    await pickDay(user, 'Friday, 15 December 2023');

    expect(onValueChange).toHaveBeenNthCalledWith(1, new Date('12/15/2023'));

    await pickTime(user, '12:00');

    expect(onValueChange).toHaveBeenLastCalledWith(new Date('12/15/2023 12:00'));
  });

  it('forwards its ref to the date input', () => {
    const ref = React.createRef<HTMLInputElement>();

    renderRTL(<DateTimePicker ref={ref} />);

    expect(ref.current).toBe(dateInput());
  });
});
