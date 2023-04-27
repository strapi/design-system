import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DatePickerCalendarContent, DatePickerCalendarContentProps } from '../DatePickerCalendar';

const Component = (props: Partial<DatePickerCalendarContentProps>) => (
  <ThemeProvider theme={lightTheme}>
    <DatePickerCalendarContent minDate={new Date('Mon Sep 04 2000')} {...props} />
  </ThemeProvider>
);

const render = (props?: Partial<DatePickerCalendarContentProps>) => ({
  user: userEvent.setup(),
  ...renderRTL(<Component {...props} />),
});

describe('DatePickerCalendar', () => {
  it('should render the month passed in the initialDate by default', () => {
    const { getByRole, getByText, getAllByRole } = render({ initialDate: new Date('Mon Sep 04 2021') });

    expect(getByRole('combobox', { name: 'Month' })).toBeInTheDocument();
    expect(getByRole('combobox', { name: 'Year' })).toBeInTheDocument();

    expect(getByText('Su')).toBeInTheDocument();
    expect(getByText('Mo')).toBeInTheDocument();
    expect(getByText('Tu')).toBeInTheDocument();
    expect(getByText('We')).toBeInTheDocument();
    expect(getByText('Th')).toBeInTheDocument();
    expect(getByText('Fr')).toBeInTheDocument();
    expect(getByText('Sa')).toBeInTheDocument();

    /**
     * We always render a 7*7 grid to make sure the calendar is always the same size
     * The header row is hidden.
     */
    expect(getAllByRole('gridcell', { hidden: true })).toHaveLength(49);
  });

  describe('interaction', () => {
    it('should update the grid view when the month is changed', async () => {
      const { getByRole, getAllByRole, user } = render({ initialDate: new Date('Mon Sep 04 2021') });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      await user.click(getByRole('combobox', { name: 'Month' }));
      await user.click(getByRole('option', { name: 'October' }));

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
    });

    it('should update the grid view when the year is changed', async () => {
      const { getByRole, getAllByRole, user } = render({
        initialDate: new Date('Mon Sep 04 2021'),
      });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      await user.click(getByRole('combobox', { name: 'Year' }));
      await user.click(getByRole('option', { name: '2022' }));

      expect(getByRole('combobox', { name: 'Year' })).toHaveTextContent('2022');

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('5');
    });

    it('should call onChange when a date is selected', async () => {
      const onChange = jest.fn();

      const { getByRole, user } = render({ onChange, initialDate: new Date('Mon Sep 04 2021') });

      await user.click(getByRole('button', { name: 'Wednesday, September 1, 2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Mon Sep 01 2021'));
    });
  });

  describe('props', () => {
    it('should update the view when there is a passed selectedDate and it is updated', () => {
      const { rerender, getByRole, getAllByRole } = render({ selectedDate: new Date('Mon Sep 04 2021') });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      rerender(<Component selectedDate={new Date('Mon Oct 04 2021')} />);

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
    });

    it('should format the date if a locale is passed', () => {
      const { getByRole } = render({ selectedDate: new Date('Mon Sep 04 2021'), locale: 'de-DE' });

      expect(getByRole('button', { name: 'Samstag, 4. September 2021' })).toBeInTheDocument();
    });

    it('should handle the minDate and maxDate prop correctly', async () => {
      const { getByRole, queryByRole, user } = render({
        minDate: new Date('Mon Sep 04 2020'),
        maxDate: new Date('Mon Sep 04 2023'),
        initialDate: new Date('Mon Sep 04 2021'),
      });

      await user.click(getByRole('combobox', { name: 'Year' }));

      expect(queryByRole('option', { name: '2019' })).not.toBeInTheDocument();
      expect(queryByRole('option', { name: '2014' })).not.toBeInTheDocument();
    });
  });
});
