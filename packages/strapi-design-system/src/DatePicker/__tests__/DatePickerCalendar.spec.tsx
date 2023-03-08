import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DatePickerCalendarContent, DatePickerCalendarContentProps } from '../DatePickerCalendar';

const Component = (props: Partial<DatePickerCalendarContentProps>) => (
  <ThemeProvider theme={lightTheme}>
    <DatePickerCalendarContent {...props} />
  </ThemeProvider>
);

const render = (props?: Partial<DatePickerCalendarContentProps>) => renderRTL(<Component {...props} />);

describe('DatePickerCalendar', () => {
  beforeAll(() => {
    jest.setTimeout(5000 * 4);
  });

  afterAll(() => {
    jest.setTimeout(5000);
  });

  it('should render the month passed in the initialDate by default', () => {
    const { getByRole, getByText, getAllByRole } = render({ initialDate: new Date('Mon Sep 04 2021') });

    expect(getByRole('button', { name: 'September' })).toBeInTheDocument();
    expect(getByRole('button', { name: '2021' })).toBeInTheDocument();

    expect(getByText('Su')).toBeInTheDocument();
    expect(getByText('Mo')).toBeInTheDocument();
    expect(getByText('Tu')).toBeInTheDocument();
    expect(getByText('We')).toBeInTheDocument();
    expect(getByText('Th')).toBeInTheDocument();
    expect(getByText('Fr')).toBeInTheDocument();
    expect(getByText('Sa')).toBeInTheDocument();

    /**
     * We always render a 7*7 grid to make sure the calendar is always the same size
     */
    expect(getAllByRole('gridcell')).toHaveLength(49);
  });

  describe('interaction', () => {
    it('should update the grid view when the month is changed', async () => {
      const user = userEvent.setup();

      const { getByRole, getAllByRole, getByText } = render({ initialDate: new Date('Mon Sep 04 2021') });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('308/30/2021');

      await user.click(getByRole('button', { name: 'September' }));
      await user.click(getByText('October'));

      expect(getByRole('button', { name: 'October' })).toBeInTheDocument();

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('279/27/2021');
    });

    it('should update the grid view when the year is changed', async () => {
      const user = userEvent.setup();

      const { getByRole, getAllByRole, getByText } = render({ initialDate: new Date('Mon Sep 04 2021') });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('308/30/2021');

      await user.click(getByRole('button', { name: '2021' }));
      await user.click(getByText('2022'));

      expect(getByRole('button', { name: '2022' })).toBeInTheDocument();

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('298/29/2022');
    });

    it('should call onChange when a date is selected', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      const { getByRole } = render({ onChange, initialDate: new Date('Mon Sep 04 2021') });

      await user.click(getByRole('button', { name: '9/1/2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Mon Sep 01 2021'));
    });
  });

  describe('props', () => {
    it('should update the view when there is a passed selectedDate and it is updated', () => {
      const { rerender, getByRole, getAllByRole } = render({ selectedDate: new Date('Mon Sep 04 2021') });

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('308/30/2021');

      rerender(<Component selectedDate={new Date('Mon Oct 04 2021')} />);

      expect(getByRole('button', { name: 'October' })).toBeInTheDocument();
      expect(getAllByRole('gridcell')[8]).toHaveTextContent('279/27/2021');
    });

    it('should format the date if a locale is passed', () => {
      const { getByRole } = render({ selectedDate: new Date('Mon Sep 04 2021'), locale: 'de-DE' });

      expect(getByRole('button', { name: '4.9.2021' })).toBeInTheDocument();
    });

    it('should handle the minDate and maxDate prop correctly', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByRole } = render({
        minDate: new Date('Mon Sep 04 2020'),
        maxDate: new Date('Mon Sep 04 2023'),
        initialDate: new Date('Mon Sep 04 2021'),
      });

      await user.click(getByRole('button', { name: '2021' }));

      expect(queryByRole('button', { name: '2019' })).not.toBeInTheDocument();
      expect(queryByRole('button', { name: '2014' })).not.toBeInTheDocument();
    });
  });
});
