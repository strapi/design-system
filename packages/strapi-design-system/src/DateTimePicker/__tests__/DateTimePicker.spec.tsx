import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formatDate } from '../../DatePicker/utils';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker';

/**
 * NOTE!
 * The tests have their dates formatted in US MM/DD/YYYY.
 */

const Component = (props: Partial<DateTimePickerProps>) => (
  <ThemeProvider theme={lightTheme}>
    <DateTimePicker initialDate={new Date('12/01/2023')} step={15} label="datetime picker" {...props} />
  </ThemeProvider>
);

const render = (props: Partial<DateTimePickerProps> = {}) => renderRTL(<Component {...props} />);

describe('DateTimePicker', () => {
  describe('rendering', () => {
    it('should render the DatePicker and TimePicker components and only one label', () => {
      const { getByText, getByRole } = render();

      expect(getByText('datetime picker')).toBeInTheDocument();
      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('');
      expect(getByRole('combobox')).toHaveTextContent('--:--');

      const id = getByText('datetime picker').getAttribute('for');
      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveAttribute('id', id);
      expect(getByRole('combobox')).toHaveAttribute('id', id);
    });

    it('should handle a hints being passed to the component where its only rendered once', () => {
      const { getByText, getByRole } = render({ hint: 'hint' });

      expect(getByText('hint')).toBeInTheDocument();
      const id = getByText('hint').getAttribute('id')!;
      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveAttribute('aria-describedby', id);
      expect(getByRole('combobox')).toHaveAttribute('aria-describedby', expect.stringContaining(id));
    });

    it("should handle an error being passed to the component where it's only rendered once", () => {
      const { getByText, getByRole } = render({ error: 'error' });

      expect(getByText('error')).toBeInTheDocument();
      const id = getByText('error').getAttribute('id')!;
      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveAttribute('aria-describedby', id);
      expect(getByRole('combobox')).toHaveAttribute('aria-describedby', expect.stringContaining(id));
    });
  });

  describe('interactions', () => {
    it('should open the calendar when clicking on the DatePicker', async () => {
      const user = userEvent.setup();
      const { queryByRole, getByRole } = render();

      expect(queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(getByRole('textbox', { name: 'datetime picker' }));

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should open the menu when clicking on the TimePicker', async () => {
      const user = userEvent.setup();
      const { queryByRole, getByRole } = render();

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(getByRole('combobox'));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it(
      'should fill the TimePicker with 00:00 when a date is picked and the TimePicker is empty',
      async () => {
        const user = userEvent.setup();
        const { getByRole } = render();

        await user.click(getByRole('textbox', { name: 'datetime picker' }));
        await user.click(getByRole('button', { name: /15/ }));

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');
        expect(getByRole('combobox')).toHaveTextContent('00:00');
      },
      5000 * 4,
    );

    it('should fill the DatePicker with the current date when a time is picked and the DatePicker is empty', async () => {
      const user = userEvent.setup();
      const { getByRole } = render();

      await user.click(getByRole('combobox'));
      await user.click(getByRole('option', { name: /12:00/ }));

      const today = formatDate(new Date());

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue(today);
      expect(getByRole('combobox')).toHaveTextContent('12:00');
    });

    it(
      'should not change the value of the DatePicker when a time is picked and the DatePicker is not empty',
      async () => {
        const user = userEvent.setup();
        const { getByRole } = render();

        await user.click(getByRole('textbox', { name: 'datetime picker' }));
        await user.click(getByRole('button', { name: /15/ }));

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');

        await user.click(getByRole('combobox'));
        await user.click(getByRole('option', { name: /12:15/ }));

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');
        expect(getByRole('combobox')).toHaveTextContent('12:15');
      },
      5000 * 4,
    );

    it(
      'should not change the value of the TimePicker when a date is picked and the TimePicker is not empty',
      async () => {
        const user = userEvent.setup();
        const { getByRole } = render();

        await user.click(getByRole('combobox'));
        await user.click(getByRole('option', { name: /12:00/ }));

        expect(getByRole('combobox')).toHaveTextContent('12:00');

        await user.click(getByRole('textbox', { name: 'datetime picker' }));
        await user.click(getByRole('button', { name: /15/ }));

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue(`${month}/15/${year}`);
        expect(getByRole('combobox')).toHaveTextContent('12:00');
      },
      5000 * 4,
    );

    it(
      'should clear the value of the DatePicker when clicking on the clear button and clear the TimePicker',
      async () => {
        const user = userEvent.setup();
        const onClear = jest.fn();
        const { getByRole } = render({ onClear });

        await user.click(getByRole('textbox', { name: 'datetime picker' }));
        await user.click(getByRole('button', { name: /15/ }));

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');
        expect(getByRole('combobox')).toHaveTextContent('00:00');

        await user.click(getByRole('button', { name: 'clear date' }));

        expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('');
        expect(getByRole('combobox')).toHaveTextContent('--:--');

        expect(onClear).toHaveBeenCalled();
      },
      5000 * 4,
    );

    /**
     * TODO: This test is skipped because of an issue with the event being prevented by not calling the original...
     */
    it.skip('should reset the value of the TimePicker to 00:00 when clicking on the clear button but not clear the DatePicker and not call onClear', async () => {
      const user = userEvent.setup();
      const onClear = jest.fn();
      const { getByRole } = render({ onClear });

      await user.click(getByRole('combobox'));
      await user.click(getByRole('option', { name: /12:00/ }));

      const today = formatDate(new Date());

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue(today);
      expect(getByRole('combobox')).toHaveTextContent('12:00');

      await user.click(getByRole('button', { name: 'clear time' }));

      expect(getByRole('combobox')).toHaveTextContent('00:00');
      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue(today);

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('props', () => {
    it('should handle the required prop correctly', () => {
      const { getByRole } = render({ required: true });

      expect(getByRole('textbox', { name: 'datetime picker' })).toBeRequired();
      expect(getByRole('combobox')).toBeRequired();
    });

    it('should handle the disabled prop correctly', () => {
      const { getByRole } = render({ disabled: true });

      expect(getByRole('textbox', { name: 'datetime picker' })).toBeDisabled();
      expect(getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should pass the step prop to the TimePicker component', async () => {
      const user = userEvent.setup();
      const { getByRole, getAllByRole } = render({ step: 30 });

      await user.click(getByRole('combobox'));

      /**
       * 24 hours * (60 mins / 30mins to get steps of 30 = 2)
       */
      expect(getAllByRole('option')).toHaveLength(24 * (60 / 30));
    });

    it('should render the value prop including updates to said prop', () => {
      const { getByRole, rerender } = render({ value: new Date('12/15/2023 12:00') });

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');
      expect(getByRole('combobox')).toHaveTextContent('12:00');

      rerender(<Component value={new Date('12/20/2023 12:30')} />);

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/20/2023');
      expect(getByRole('combobox')).toHaveTextContent('12:30');
    });

    it('should render the value prop even when the value is empty', () => {
      const { getByRole, rerender } = render({ value: new Date('12/15/2023 12:00') });

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('12/15/2023');
      expect(getByRole('combobox')).toHaveTextContent('12:00');

      rerender(<Component value={undefined} />);

      expect(getByRole('textbox', { name: 'datetime picker' })).toHaveValue('');
      expect(getByRole('combobox')).toHaveTextContent('--:--');
    });

    it(
      'should call onChange when the value is updated even if the component is not controlled',
      async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { getByRole } = render({ onChange });

        await user.click(getByRole('textbox', { name: 'datetime picker' }));
        await user.click(getByRole('button', { name: /15/ }));

        expect(onChange).toHaveBeenNthCalledWith(1, new Date('12/15/2023'));

        await user.click(getByRole('combobox'));
        await user.click(getByRole('option', { name: /12:00/ }));

        expect(onChange).toHaveBeenNthCalledWith(2, new Date('12/15/2023 12:00'));
      },
      5000 * 4,
    );
  });
});
