import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Calendar } from './calendar';

describe('Calendar', () => {
  it('selects a day and returns a Date for it', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    // November 2026, a month whose grid shows "20" only for November
    render(<Calendar defaultMonth={new Date(2026, 10, 1)} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('gridcell', { name: '20' }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const picked = onValueChange.mock.calls[0][0] as Date;
    expect(picked.getFullYear()).toBe(2026);
    expect(picked.getMonth()).toBe(10);
    expect(picked.getDate()).toBe(20);
  });

  it('disables and ignores days before minDate', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Calendar defaultMonth={new Date(2026, 10, 15)} minDate={new Date(2026, 10, 15)} onValueChange={onValueChange} />,
    );

    const earlyDay = screen.getByRole('gridcell', { name: '10' });
    expect(earlyDay).toBeDisabled();

    await user.click(earlyDay);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('navigates to the next month', async () => {
    const user = userEvent.setup();

    render(<Calendar defaultMonth={new Date(2026, 10, 1)} />);

    expect(screen.getByText('November 2026')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next month' }));

    expect(screen.getByText('December 2026')).toBeInTheDocument();
  });
});
