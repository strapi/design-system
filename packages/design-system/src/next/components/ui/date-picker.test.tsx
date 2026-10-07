import * as React from 'react';

import { render as renderRTL, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DatePicker, type DatePickerProps } from './date-picker';

const Component = (props: Partial<DatePickerProps>) => (
  <DatePicker locale="en-GB" aria-label="date picker" {...props} />
);

const render = (props?: Partial<DatePickerProps>) => ({
  user: userEvent.setup(),
  ...renderRTL(
    <div>
      <Component {...props} />
      <button type="button">testing</button>
    </div>,
  ),
});

const input = () => screen.getByRole('combobox', { name: 'date picker' });

const openCalendar = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(input());

  return screen.findByRole('dialog');
};

describe('DatePicker', () => {
  describe('Input', () => {
    it('renders no date by default', () => {
      render();

      expect(input()).toHaveValue('');
      expect(input()).toHaveAttribute('aria-haspopup', 'dialog');
      expect(input()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it('opens the calendar dialog when clicked', async () => {
      const { user } = render();

      const dialog = await openCalendar(user);

      expect(dialog).toHaveAccessibleName('Choose date');
      expect(input()).toHaveAttribute('aria-expanded', 'true');
      expect(input()).toHaveFocus();
    });

    it('calls onValueChange and closes the dialog when a day is chosen', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange, defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);
      await user.click(screen.getByRole('button', { name: 'Wednesday, 1 September 2021' }));

      expect(onValueChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      expect(input()).toHaveValue('01/09/2021');
    });

    it('names the day cells with the full date', async () => {
      const { user } = render({ defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name: 'Saturday, 4 September 2021' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it('shows a clear button with a value, which calls onClear', async () => {
      const onClear = jest.fn();
      const onValueChange = jest.fn();
      const { user } = render({ onClear, onValueChange, defaultValue: new Date('Sep 04 2021') });

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onClear).toHaveBeenCalled();
      expect(onValueChange).toHaveBeenCalledWith(undefined);
      expect(input()).toHaveValue('');
    });

    it('calls onValueChange on blur after typing a date', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange });

      await user.type(input(), '01/09/2021');
      await user.keyboard('[Escape]');
      await user.tab();

      expect(onValueChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));
    });

    it('completes a partial date on blur', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange, defaultValue: new Date('Sep 04 2021') });

      await user.clear(input());
      await user.type(input(), '14');
      await user.keyboard('[Escape]');
      await user.tab();

      expect(onValueChange).toHaveBeenCalledWith(new Date('Sep 14 2021'));
    });

    it('keeps the last correct date of an incorrect partial date on blur', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange, defaultValue: new Date('Sep 04 2021') });

      await user.clear(input());
      await user.type(input(), '99');
      await user.keyboard('[Escape]');
      await user.tab();

      expect(onValueChange).toHaveBeenCalledWith(new Date('Sep 09 2021'));
    });

    it('chooses the highlighted day with Enter', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange, defaultValue: new Date('Sep 16 2021') });

      await openCalendar(user);
      await user.keyboard('[ArrowRight][Enter]');

      expect(onValueChange).toHaveBeenCalledWith(new Date('Sep 17 2021'));
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('clears the field with Escape when the calendar is closed', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange, defaultValue: new Date('Sep 16 2021') });

      input().focus();
      await user.keyboard('[Escape]');

      expect(input()).toHaveValue('');
      expect(onValueChange).toHaveBeenCalledWith(undefined);
    });

    it('has no pattern mismatch for a chosen date', async () => {
      const { user } = render({ defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);
      await user.click(screen.getByRole('button', { name: 'Wednesday, 8 September 2021' }));

      expect((input() as HTMLInputElement).validity.patternMismatch).toBe(false);
    });

    it('forwards its ref to the input and passes aria-invalid', () => {
      const ref = React.createRef<HTMLInputElement>();

      renderRTL(<DatePicker ref={ref} aria-label="date picker" aria-invalid />);

      expect(ref.current).toBe(input());
      expect(input()).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Calendar', () => {
    it('renders the month of the date, with the month and year selects and the weekdays', async () => {
      const { user } = render({ defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);

      expect(screen.getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');
      expect(screen.getByRole('combobox', { name: 'Year' })).toHaveTextContent('2021');
      ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].forEach((day) => expect(screen.getByText(day)).toBeInTheDocument());
      // Always six weeks, so the calendar keeps its size
      expect(screen.getAllByRole('gridcell')).toHaveLength(42);
    });

    it('changes the month with the month select', async () => {
      const { user } = render({ defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);
      await user.click(screen.getByRole('combobox', { name: 'Month' }));
      await user.click(await screen.findByRole('option', { name: 'October' }));

      await waitFor(() => expect(screen.getByRole('combobox', { name: 'Month' })).toHaveTextContent('October'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('gridcell', { name: 'Monday, 4 October 2021' })).toHaveAttribute('aria-selected', 'true');
    });

    it('changes the year with the year select', async () => {
      const { user } = render({ defaultValue: new Date('Sep 04 2021') });

      await openCalendar(user);
      await user.click(screen.getByRole('combobox', { name: 'Year' }));
      await user.click(await screen.findByRole('option', { name: '2022' }));

      await waitFor(() => expect(screen.getByRole('combobox', { name: 'Year' })).toHaveTextContent('2022'));
      expect(screen.getByRole('gridcell', { name: 'Sunday, 4 September 2022' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it('follows a controlled value', async () => {
      const { user, rerender } = render({ value: new Date('Sep 04 2021') });

      expect(input()).toHaveValue('04/09/2021');

      rerender(
        <div>
          <Component value={new Date('Oct 04 2021')} />
        </div>,
      );

      expect(input()).toHaveValue('04/10/2021');

      await openCalendar(user);

      expect(screen.getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
    });

    it.each([
      ['ArrowDown', 'Thursday, 23 September 2021'],
      ['ArrowUp', 'Thursday, 9 September 2021'],
      ['ArrowLeft', 'Wednesday, 15 September 2021'],
      ['ArrowRight', 'Friday, 17 September 2021'],
    ])('moves the highlighted day with %s', async (key, name) => {
      const { user } = render({ value: new Date('Sep 16 2021') });

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'false');

      await user.keyboard(`[${key}]`);

      expect(screen.getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'true');
    });

    it('changes the month when the highlighted day moves to another month', async () => {
      const { user } = render({ value: new Date('Sep 30 2021') });

      await openCalendar(user);

      expect(screen.getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');

      await user.keyboard('[ArrowRight]');

      expect(screen.getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(screen.getByRole('gridcell', { name: 'Friday, 1 October 2021' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('disabled', () => {
    it('does not open', async () => {
      const { user } = render({ disabled: true });

      await user.click(input());

      expect(input()).toBeDisabled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not clear', async () => {
      const onClear = jest.fn();
      const { user } = render({ onClear, value: new Date('Sep 04 2021'), disabled: true });

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('localisation', () => {
    it('formats with the en-GB locale', async () => {
      const { user } = render({ value: new Date('Tue Sep 06 2022') });

      expect(input()).toHaveValue('06/09/2022');
      expect(input()).toHaveAttribute('placeholder', 'DD/MM/YYYY');

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name: 'Wednesday, 7 September 2022' })).toBeInTheDocument();
    });

    it('formats with the en locale, starting the week on Sunday', async () => {
      const { user } = render({ value: new Date('Tue Sep 06 2022'), locale: 'en' });

      expect(input()).toHaveValue('09/06/2022');

      await openCalendar(user);

      expect(screen.getAllByRole('columnheader', { hidden: true })[0]).toHaveTextContent('Su');
      expect(screen.getByRole('gridcell', { name: 'Wednesday, September 7, 2022' })).toBeInTheDocument();
    });

    it('formats with the de-DE locale', async () => {
      const { user } = render({ locale: 'de-DE', value: new Date('Tue Sep 06 2022') });

      expect(input()).toHaveValue('06.09.2022');

      await openCalendar(user);

      expect(screen.getByText('So')).toBeInTheDocument();
      expect(screen.getByRole('gridcell', { name: 'Mittwoch, 7. September 2022' })).toBeInTheDocument();
    });

    it('uses the order of the locale for the placeholder and the typing', async () => {
      const { user } = render({ locale: 'ja', defaultValue: new Date('Tue Sep 06 2021') });

      await user.clear(input());

      expect(input()).toHaveAttribute('placeholder', 'YYYY/MM/DD');

      await user.type(input(), '2022/12/18');

      expect(input()).toHaveValue('2022/12/18');
      expect(screen.getByRole('gridcell', { name: '2022年12月18日日曜日' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('min and max dates', () => {
    it('limits the years of the year select', async () => {
      const { user } = render({
        minDate: new Date('Mon Sep 04 2020'),
        maxDate: new Date('Mon Sep 04 2023'),
        defaultValue: new Date('Sep 04 2021'),
      });

      await openCalendar(user);
      await user.click(screen.getByRole('combobox', { name: 'Year' }));

      expect(await screen.findByRole('option', { name: '2020' })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: '2019' })).not.toBeInTheDocument();
      expect(screen.queryByRole('option', { name: '2024' })).not.toBeInTheDocument();
    });

    it('disables the days before the min date', async () => {
      const { user } = render({ minDate: new Date('Mon Sep 04 2020'), defaultValue: new Date('Sep 04 2020') });

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name: 'Thursday, 3 September 2020' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
      expect(screen.getByRole('gridcell', { name: 'Saturday, 5 September 2020' })).toHaveAttribute(
        'aria-disabled',
        'false',
      );
    });

    it('disables the days after the max date', async () => {
      const { user } = render({ maxDate: new Date('Mon Sep 04 2020'), defaultValue: new Date('Sep 04 2020') });

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name: 'Saturday, 5 September 2020' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('highlights the min date when today is before it', async () => {
      const { user } = render({ minDate: new Date('Sep 04 4000') });

      await openCalendar(user);

      expect(screen.getByRole('gridcell', { name: 'Monday, 4 September 4000' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it('does not go past the min date when typing', async () => {
      const { user } = render({ minDate: new Date('Sep 04 2001') });

      await user.click(input());
      await user.type(input(), '09/03/1994');

      expect(screen.getByRole('gridcell', { name: 'Tuesday, 4 September 2001' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });

  describe('typing updates the calendar', () => {
    it('follows D/M/Y as it is typed', async () => {
      const { user } = render({ defaultValue: new Date('Sept 04 2020') });

      await openCalendar(user);
      await user.clear(input());
      await user.keyboard('5');

      expect(screen.getByRole('gridcell', { name: 'Saturday, 5 September 2020' })).toHaveAttribute(
        'aria-selected',
        'true',
      );

      await user.keyboard('/1');

      expect(screen.getByRole('gridcell', { name: 'Sunday, 5 January 2020' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('/2');

      expect(screen.getByRole('gridcell', { name: 'Saturday, 5 January 2002' })).toHaveAttribute(
        'aria-selected',
        'true',
      );

      await user.keyboard('2');

      expect(screen.getByRole('gridcell', { name: 'Wednesday, 5 January 2022' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });
});
