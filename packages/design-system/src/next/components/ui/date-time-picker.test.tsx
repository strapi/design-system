import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DateTimePicker } from './date-time-picker';

describe('DateTimePicker', () => {
  it('shows the placeholder and opens the calendar', async () => {
    const user = userEvent.setup();

    render(<DateTimePicker aria-label="Release date" placeholder="Pick a date and time" />);

    expect(screen.getByText('Pick a date and time')).toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Release date'));

    expect(await screen.findByRole('grid')).toBeInTheDocument();
  });

  it('keeps the time when a new day is picked', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <DateTimePicker
        aria-label="Release date"
        value={new Date(2026, 10, 1, 9, 30)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByLabelText('Release date'));
    await user.click(await screen.findByRole('gridcell', { name: '20' }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const picked = onValueChange.mock.calls[0][0] as Date;
    expect(picked.getDate()).toBe(20);
    expect(picked.getHours()).toBe(9);
    expect(picked.getMinutes()).toBe(30);
  });
});
