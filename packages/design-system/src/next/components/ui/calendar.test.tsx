import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders a grid of six weeks named by the month, with the month and year selects', () => {
    render(<Calendar locale="en-GB" defaultMonth={new Date(2021, 8, 1)} startMonth={new Date(2020, 0)} />);

    expect(screen.getByRole('grid', { name: 'September 2021' })).toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')).toHaveLength(42);
    expect(screen.getByRole('combobox', { name: /month/i })).toHaveTextContent('September');
    expect(screen.getByRole('combobox', { name: /year/i })).toHaveTextContent('2021');
  });

  it('formats with a BCP 47 locale and starts the week on its first day', () => {
    render(<Calendar locale="de-DE" defaultMonth={new Date(2022, 8, 1)} />);

    expect(screen.getAllByRole('columnheader', { hidden: true })[0]).toHaveTextContent('Mo');
    expect(screen.getByRole('gridcell', { name: 'Mittwoch, 7. September 2022' })).toBeInTheDocument();
  });

  it('states the selected and disabled days', () => {
    render(
      <Calendar
        locale="en-GB"
        mode="single"
        selected={new Date(2021, 8, 4)}
        onSelect={() => {}}
        disabled={{ before: new Date(2021, 8, 3) }}
        defaultMonth={new Date(2021, 8, 1)}
      />,
    );

    expect(screen.getByRole('gridcell', { name: 'Saturday, 4 September 2021' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('gridcell', { name: 'Friday, 3 September 2021' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByRole('gridcell', { name: 'Thursday, 2 September 2021' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('calls onSelect when a day is pressed', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<Calendar locale="en-GB" mode="single" onSelect={onSelect} defaultMonth={new Date(2021, 8, 1)} />);

    await user.click(screen.getByRole('button', { name: 'Wednesday, 8 September 2021' }));

    expect(onSelect).toHaveBeenCalledWith(
      new Date(2021, 8, 8),
      new Date(2021, 8, 8),
      expect.anything(),
      expect.anything(),
    );
  });

  describe('range', () => {
    const Range = ({ onSelect }: { onSelect?: (range: { from?: Date; to?: Date } | undefined) => void }) => {
      const [range, setRange] = React.useState<{ from: Date | undefined; to?: Date } | undefined>({
        from: new Date(2021, 8, 6),
        to: new Date(2021, 8, 9),
      });

      return (
        <Calendar
          locale="en-GB"
          mode="range"
          selected={range}
          onSelect={(next) => {
            setRange(next);
            onSelect?.(next);
          }}
          defaultMonth={new Date(2021, 8, 1)}
        />
      );
    };

    it('marks the ends of the range and the days between them', () => {
      render(<Range />);

      const start = screen.getByRole('button', { name: 'Monday, 6 September 2021' });
      const middle = screen.getByRole('button', { name: 'Tuesday, 7 September 2021' });
      const end = screen.getByRole('button', { name: 'Thursday, 9 September 2021' });

      expect(start).toHaveAttribute('data-range-start');
      expect(start).not.toHaveAttribute('data-range-middle');
      expect(middle).toHaveAttribute('data-range-middle');
      expect(end).toHaveAttribute('data-range-end');
      expect(screen.getByRole('gridcell', { name: 'Wednesday, 8 September 2021' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('gridcell', { name: 'Friday, 10 September 2021' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('selects a new range with two presses', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();

      render(<Range onSelect={onSelect} />);

      await user.click(screen.getByRole('button', { name: 'Monday, 20 September 2021' }));
      await user.click(screen.getByRole('button', { name: 'Wednesday, 22 September 2021' }));

      expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ to: new Date(2021, 8, 22) }));
      expect(screen.getByRole('button', { name: 'Wednesday, 22 September 2021' })).toHaveAttribute('data-range-end');
    });

    it('does not mark a single selection as a range', () => {
      render(
        <Calendar
          locale="en-GB"
          mode="single"
          selected={new Date(2021, 8, 4)}
          onSelect={() => {}}
          defaultMonth={new Date(2021, 8, 1)}
        />,
      );

      const day = screen.getByRole('button', { name: 'Saturday, 4 September 2021' });

      expect(day).toHaveAttribute('data-selected');
      expect(day).not.toHaveAttribute('data-range-start');
    });
  });

  it('forwards its ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();

    const { container } = render(<Calendar ref={ref} />);

    expect(ref.current).toBe(container.querySelector('[data-slot="calendar"]'));
  });
});
