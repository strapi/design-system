import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DatePicker, DatePickerProps } from '../DatePicker';

const Component = (props: Partial<DatePickerProps>) => (
  <ThemeProvider theme={lightTheme}>
    <DatePicker label="date picker" minDate={new Date('Mon Sep 04 2000')} {...props} />
  </ThemeProvider>
);

const render = (props?: Partial<DatePickerProps>) => ({
  user: userEvent.setup(),
  ...renderRTL(<Component {...props} />),
});

describe('DatePicker', () => {
  describe('Input', () => {
    it('should render by default no date', () => {
      const { getByRole, queryByRole } = render();

      expect(getByRole('combobox', { name: 'date picker' })).toHaveValue('');
      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it('should open the calendar popover when clicked', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onChange and close the dialog when a date is selected in the calendar', async () => {
      const onChange = jest.fn();
      const { getByRole, queryByRole, user } = render({ onChange, initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('dialog')).toBeInTheDocument();

      await user.click(getByRole('gridcell', { name: 'Wednesday, September 1, 2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should show the onClear button if there is a value and when pressed call the onClear callback', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({ onClear, selectedDate: new Date('Sep 04 2021') });

      expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.click(getByRole('button', { name: 'Clear' }));

      expect(onClear).toHaveBeenCalled();

      /**
       * This won't work due to a bug in `user-event` that doesn't trigger the focus event.
       */
      // expect(getByRole('textbox', { name: 'date picker' })).toHaveFocus();
    });

    it('should update the input text value when a selectedDate is passed and a calendar date is pressed', async () => {
      const { getByRole, user } = render({ selectedDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      await user.click(getByRole('gridcell', { name: 'Wednesday, September 8, 2021' }));

      expect(getByRole('combobox', { name: 'date picker' })).toHaveValue('08/09/2021');
    });
  });

  describe('Calendar', () => {
    it('should render the month passed in the initialDate by default', async () => {
      const { getByRole, getByText, getAllByRole, user } = render({ initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

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
        const { getByRole, getAllByRole, user } = render({ initialDate: new Date('Sep 04 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

        await user.click(getByRole('combobox', { name: 'Month' }));
        await user.click(getByRole('option', { name: 'October' }));

        expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');

        expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
      });

      it('should update the grid view when the year is changed', async () => {
        const { getByRole, getAllByRole, user } = render({
          initialDate: new Date('Sep 04 2021'),
        });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

        await user.click(getByRole('combobox', { name: 'Year' }));
        await user.click(getByRole('option', { name: '2022' }));

        expect(getByRole('combobox', { name: 'Year' })).toHaveTextContent('2022');

        expect(getAllByRole('gridcell')[8]).toHaveTextContent('5');
      });

      it('should call onChange when a date is selected', async () => {
        const onChange = jest.fn();

        const { getByRole, user } = render({ onChange, initialDate: new Date('Sep 04 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        await user.click(getByRole('gridcell', { name: 'Wednesday, September 1, 2021' }));

        expect(onChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));
      });
    });

    it('should update the view when there is a passed selectedDate and it is updated', async () => {
      const { rerender, getByRole, getAllByRole, user } = render({ selectedDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      rerender(<Component selectedDate={new Date('Oct 04 2021')} />);

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
    });

    it('should handle the minDate and maxDate prop correctly', async () => {
      const { getByRole, queryByRole, user } = render({
        minDate: new Date('Mon Sep 04 2020'),
        maxDate: new Date('Mon Sep 04 2023'),
        initialDate: new Date('Sep 04 2021'),
      });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.click(getByRole('combobox', { name: 'Year' }));

      expect(queryByRole('option', { name: '2019' })).not.toBeInTheDocument();
      expect(queryByRole('option', { name: '2014' })).not.toBeInTheDocument();
    });

    ['ArrowDown', 'ArrowUp'].forEach((key) =>
      it(`should move my highlighted gridcell ${
        key === 'ArrowDown' ? 'forward' : 'backward'
      } by one week when the ${key} key is pressed`, async () => {
        const { getByRole, user } = render({ selectedDate: new Date('Sep 16 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        const name = key === 'ArrowDown' ? 'Thursday, September 23, 2021' : 'Thursday, September 9, 2021';

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'false');

        await user.keyboard(`[${key}]`);

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'true');
      }),
    );

    ['ArrowLeft', 'ArrowRight'].forEach((key) =>
      it(`should move my highlighted gridcell ${
        key === 'ArrowDown' ? 'forward' : 'backward'
      } by one day when the ${key} key is pressed`, async () => {
        const { getByRole, user } = render({ selectedDate: new Date('Sep 16 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        const name = key === 'ArrowLeft' ? 'Wednesday, September 15, 2021' : 'Friday, September 17, 2021';

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'false');

        await user.keyboard(`[${key}]`);

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'true');
      }),
    );

    it('should change the month when we change the date by either a week or day and subsequently its a new month', async () => {
      const { user, getByRole } = render({ selectedDate: new Date('Sep 30 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');

      await user.keyboard('[ArrowRight]');

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(getByRole('gridcell', { name: 'Friday, October 1, 2021' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[ArrowUp]');

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');
      expect(getByRole('gridcell', { name: 'Friday, September 24, 2021' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('disabled prop', () => {
    it('should not open the popover is the disabled is true', async () => {
      const { getByRole, queryByRole, user } = render({ disabled: true });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not clear the input if the input is disabled', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({
        onClear,
        selectedDate: new Date('Sep 04 2021'),
        disabled: true,
      });

      expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.click(getByRole('button', { name: 'Clear' }));

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('localisation', () => {
    it('should format by en-EN locale by default', async () => {
      const { getByRole, user } = render({ selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('combobox')).toHaveValue('06/09/2022');

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { hidden: true, name: 'Su' })).toBeInTheDocument();
      expect(getByRole('gridcell', { name: 'Wednesday, September 7, 2022' })).toBeInTheDocument();
    });

    it('should format by the DE locale when passed', async () => {
      const { getByRole, user } = render({ locale: 'de-DE', selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('combobox')).toHaveValue('06.09.2022');

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { hidden: true, name: 'So' })).toBeInTheDocument();
      expect(getByRole('gridcell', { name: 'Mittwoch, 7. September 2022' })).toBeInTheDocument();
    });
  });
});
