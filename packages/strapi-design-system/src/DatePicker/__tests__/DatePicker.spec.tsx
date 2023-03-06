import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DatePicker, DatePickerProps } from '../DatePicker';

const Component = (props: Partial<DatePickerProps>) => (
  <ThemeProvider theme={lightTheme}>
    <DatePicker label="date picker" {...props} />
  </ThemeProvider>
);

const render = (props?: Partial<DatePickerProps>) => renderRTL(<Component {...props} />);

describe('DatePicker', () => {
  it('should render by default no date', () => {
    const { getByRole, queryByRole } = render();

    expect(getByRole('textbox', { name: 'date picker' })).toHaveValue('');
    expect(queryByRole('dialog')).not.toBeInTheDocument();
    expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('should open the calendar popover when clicked', async () => {
    const user = userEvent.setup();
    const { getByRole } = render();

    await user.click(getByRole('textbox', { name: 'date picker' }));

    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('should call onChange and close the dialog when a date is selected in the calendar', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { getByRole, queryByRole } = render({ onChange, initialDate: new Date('Mon Sep 04 2021') });

    await user.click(getByRole('textbox', { name: 'date picker' }));

    expect(getByRole('dialog')).toBeInTheDocument();

    await user.click(getByRole('button', { name: '9/1/2021' }));

    expect(onChange).toHaveBeenCalledWith(new Date('Mon Sep 01 2021'));

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should show the onClear button if there is a value and when pressed call the onClear callback', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    const { getByRole, getByLabelText } = render({ onClear, selectedDate: new Date('Mon Sep 04 2021') });

    expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

    await user.click(getByLabelText('Clear'));

    expect(onClear).toHaveBeenCalled();

    /**
     * This won't work due to a bug in `user-event` that doesn't trigger the focus event.
     */
    // expect(getByRole('textbox', { name: 'date picker' })).toHaveFocus();
  });

  describe('disabled prop', () => {
    it('should not open the popover is the disabled is true', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByRole } = render({ disabled: true });

      await user.click(getByRole('textbox', { name: 'date picker' }));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not clear the input if the input is disabled', async () => {
      const user = userEvent.setup();
      const onClear = jest.fn();
      const { getByRole, getByLabelText } = render({
        onClear,
        selectedDate: new Date('Mon Sep 04 2021'),
        disabled: true,
      });

      expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.click(getByLabelText('Clear'));

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('localisation', () => {
    it('should format by EN locale by default', () => {
      const { getByRole } = render({ selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('textbox')).toHaveValue('9/6/2022');
    });

    it('should format by the DE locale when passed', () => {
      const { getByRole } = render({ locale: 'de-DE', selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('textbox')).toHaveValue('6.9.2022');
    });
  });
});
