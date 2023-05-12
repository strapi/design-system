import { render as renderRTL } from '@test/utils';

import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker';

const Component = (props: Partial<DateTimePickerProps>) => (
  <DateTimePicker label="datetime picker" locale="en-GB" {...props} />
);

const render = (props: Partial<DateTimePickerProps> = {}) => renderRTL(<Component {...props} />);

describe('DateTimePicker', () => {
  describe('rendering', () => {
    it('should render the DatePicker and TimePicker components and only one label', () => {
      const { getByText, getByRole } = render();

      expect(getByText('datetime picker')).toBeInTheDocument();
      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('');

      const id = getByText('datetime picker').getAttribute('for');
      expect(getByRole('combobox', { name: 'Choose date' })).toHaveAttribute(
        'aria-describedby',
        `${id}-hint ${id}-error`,
      );
      expect(getByRole('combobox', { name: 'Choose date' })).not.toHaveAttribute('id', id);
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveAttribute(
        'aria-describedby',
        `${id}-hint ${id}-error`,
      );
      expect(getByRole('combobox', { name: 'Choose time' })).not.toHaveAttribute('id', id);
    });

    it('should handle a hints being passed to the component where its only rendered once', () => {
      const { getByText, getByRole } = render({ hint: 'hint' });

      expect(getByText('hint')).toBeInTheDocument();
      const id = getByText('hint').getAttribute('id')!;
      expect(getByRole('combobox', { name: 'Choose date' })).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(id),
      );
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(id),
      );
    });

    it("should handle an error being passed to the component where it's only rendered once", () => {
      const { getByText, getByRole } = render({ error: 'error' });

      expect(getByText('error')).toBeInTheDocument();
      const id = getByText('error').getAttribute('id')!;
      expect(getByRole('combobox', { name: 'Choose date' })).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(id),
      );
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(id),
      );
    });
  });

  describe('interactions', () => {
    it('should open the calendar when clicking on the DatePicker', async () => {
      const { queryByRole, getByRole, user } = render();

      expect(queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(getByRole('combobox', { name: 'Choose date' }));

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should open the menu when clicking on the TimePicker', async () => {
      const { queryByRole, getByRole, user } = render();

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(getByRole('combobox', { name: 'Choose time' }));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should fill the TimePicker with 00:00 when a date is picked and the TimePicker is empty', async () => {
      const { getByRole, user } = render({ initialDate: new Date('12/01/2023') });

      await user.click(getByRole('combobox', { name: 'Choose date' }));
      await user.click(getByRole('gridcell', { name: /15/ }));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('00:00');
    });

    it('should fill the DatePicker with the current date when a time is picked and the DatePicker is empty', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox', { name: 'Choose time' }));
      await user.click(getByRole('option', { name: /12:00/ }));

      const today = formatDate(new Date());

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue(today);
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');
    });

    it('should not change the value of the DatePicker when a time is picked and the DatePicker is not empty', async () => {
      const { getByRole, user } = render({ initialDate: new Date('12/01/2023') });

      await user.click(getByRole('combobox', { name: 'Choose date' }));
      await user.click(getByRole('gridcell', { name: 'Friday, 15 December 2023' }));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');

      await user.click(getByRole('combobox', { name: 'Choose time' }));
      await user.click(getByRole('option', { name: /12:15/ }));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:15');
    });

    it('should not change the value of the TimePicker when a date is picked and the TimePicker is not empty', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox', { name: 'Choose time' }));
      await user.click(getByRole('option', { name: /12:00/ }));

      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');

      await user.click(getByRole('combobox', { name: 'Choose date' }));
      await user.click(getByRole('gridcell', { name: /15/ }));

      const today = formatDate(new Date().setDate(15));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue(today);
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');
    });

    it('should clear the value of the DatePicker when clicking on the clear button and clear the TimePicker', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({ onClear, initialDate: new Date('12/01/2023') });

      await user.click(getByRole('combobox', { name: 'Choose date' }));
      await user.click(getByRole('gridcell', { name: /15/ }));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('00:00');

      await user.click(getByRole('button', { name: 'clear date' }));

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('');

      expect(onClear).toHaveBeenCalled();
    });

    it('should reset the value of the TimePicker to 00:00 when clicking on the clear button but not clear the DatePicker and not call onClear', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({ onClear });

      await user.click(getByRole('combobox', { name: 'Choose time' }));
      await user.click(getByRole('option', { name: /12:00/ }));

      const today = formatDate(new Date());

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue(today);
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');

      await user.click(getByRole('button', { name: 'clear time' }));

      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('00:00');
      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue(today);

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('props', () => {
    it('should handle the required prop correctly', () => {
      const { getByRole } = render({ required: true });

      expect(getByRole('combobox', { name: 'Choose date' })).toBeRequired();
      expect(getByRole('combobox', { name: 'Choose time' })).toBeRequired();
    });

    it('should handle the disabled prop correctly', () => {
      const { getByRole } = render({ disabled: true });

      expect(getByRole('combobox', { name: 'Choose date' })).toBeDisabled();
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('should pass the step prop to the TimePicker component', async () => {
      const { getByRole, getAllByRole, user } = render({ step: 30 });

      await user.click(getByRole('combobox', { name: 'Choose time' }));

      /**
       * 24 hours * (60 mins / 30mins to get steps of 30 = 2)
       */
      expect(getAllByRole('option')).toHaveLength(24 * (60 / 30));
    });

    it('should render the value prop including updates to said prop', () => {
      const { getByRole, rerender } = render({ value: new Date('12/15/2023 12:00') });

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');

      rerender(<Component value={new Date('12/20/2023 12:30')} />);

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('20/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:30');
    });

    it('should render the value prop even when the value is empty', () => {
      const { getByRole, rerender } = render({ value: new Date('12/15/2023 12:00') });

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('15/12/2023');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('12:00');

      rerender(<Component value={undefined} />);

      expect(getByRole('combobox', { name: 'Choose date' })).toHaveValue('');
      expect(getByRole('combobox', { name: 'Choose time' })).toHaveValue('');
    });

    it('should call onChange when the value is updated even if the component is not controlled', async () => {
      const onChange = jest.fn();
      const { getByRole, user } = render({ onChange, initialDate: new Date('12/01/2023') });

      await user.click(getByRole('combobox', { name: 'Choose date' }));
      await user.click(getByRole('gridcell', { name: /15/ }));

      expect(onChange).toHaveBeenNthCalledWith(1, new Date('12/15/2023'));

      await user.click(getByRole('combobox', { name: 'Choose time' }));
      await user.click(getByRole('option', { name: /12:00/ }));

      expect(onChange).toHaveBeenNthCalledWith(2, new Date('12/15/2023 12:00'));
    });
  });
});

const formatDate = (date: number | Date, locale = 'en-GB'): string => {
  const langFormatter = new Intl.DateTimeFormat(locale);

  return langFormatter.format(date);
};
