import { useState } from 'react';

import { render as renderRTL } from '@test/utils';

import { TimePicker, TimePickerProps } from '../TimePicker';

const Component = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = useState<string>();

  return <TimePicker label="timepicker" value={value} onChange={setValue} {...props} />;
};

const render = (props?: Partial<TimePickerProps>) => renderRTL(<Component {...props} />);

describe('TimePicker', () => {
  it('should by default have "--:--" as the placeholder', () => {
    const { getByRole, getByPlaceholderText } = render();

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('');
    expect(getByPlaceholderText('--:--')).toBe(getByRole('combobox', { name: 'timepicker' }));
  });

  test('assuming the value is an item in the list it should render accordingly', () => {
    const { getByRole } = render({ value: '01:00' });

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('01:00');
  });

  test('assuming the value is not an item in the list it should still render the value', () => {
    const { getByRole } = render({ value: '01:01' });

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('01:01');
  });

  it('should call onChange when a new value is selected from the list', async () => {
    const onChange = jest.fn();
    const { getByRole, user } = render({ onChange });

    await user.click(getByRole('combobox', { name: 'timepicker' }));
    await user.click(getByRole('option', { name: '01:00' }));

    expect(onChange).toHaveBeenCalledWith('01:00');
  });

  describe('step prop', () => {
    it('should render 96 options for time by default', async () => {
      const { getAllByRole, getByRole, user } = render();

      await user.click(getByRole('combobox', { name: 'timepicker' }));

      expect(getAllByRole('option')).toHaveLength(96);
    });

    it('should handle a different step count being passed', async () => {
      const { getAllByRole, getByRole, user } = render({ step: 30 });

      await user.click(getByRole('combobox', { name: 'timepicker' }));

      /**
       * 24 hours * (60 minutes / 30 minutes(steps))
       */
      expect(getAllByRole('option')).toHaveLength(24 * (60 / 30));
    });
  });
});
