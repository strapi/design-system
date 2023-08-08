import { useState } from 'react';

import { RenderOptions, render as renderRTL } from '@test/utils';

import { TimePicker, TimePickerProps } from '../TimePicker';

const Component = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = useState<string>();

  return <TimePicker label="timepicker" value={value} onChange={setValue} {...props} />;
};

const render = (props?: Partial<TimePickerProps>, renderOptions?: RenderOptions) =>
  renderRTL(<Component {...props} />, { renderOptions });

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

  it('should not update the textValue if a letter is typed, only when a number or the separator', async () => {
    const { getByRole, user } = render();

    await user.type(getByRole('combobox', { name: 'timepicker' }), 'a');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('');

    await user.type(getByRole('combobox', { name: 'timepicker' }), '1');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('1');

    await user.type(getByRole('combobox', { name: 'timepicker' }), ':');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('1:');

    await user.type(getByRole('combobox', { name: 'timepicker' }), '00');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox', { name: 'timepicker' })).toHaveValue('1:00');
  });

  it('should call onChange when a new value is selected from the list', async () => {
    const onChange = jest.fn();
    const { getByRole, user } = render({ onChange });

    await user.click(getByRole('combobox', { name: 'timepicker' }));
    await user.click(getByRole('option', { name: '01:00' }));

    expect(onChange).toHaveBeenCalledWith('01:00');
  });

  it("should call onChange when a new value is typed in the input and it's a valid time and the input is blurred", async () => {
    const onChange = jest.fn();
    const { getByRole, user } = render(
      { onChange },
      {
        wrapper({ children }) {
          return (
            <div>
              {children}
              <button type="button">testing</button>
            </div>
          );
        },
      },
    );

    await user.type(getByRole('combobox', { name: 'timepicker' }), '01:00');

    await user.keyboard('[Escape]');
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('01:00');
  });

  it("should call onChange when a partial value is typed in the input and it's a valid time and the input is blurred", async () => {
    const onChange = jest.fn();
    const { getByRole, user } = render(
      { onChange },
      {
        wrapper({ children }) {
          return (
            <div>
              {children}
              <button type="button">testing</button>
            </div>
          );
        },
      },
    );

    await user.type(getByRole('combobox', { name: 'timepicker' }), '1');

    await user.keyboard('[Escape]');
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('01:00');

    await user.clear(getByRole('combobox', { name: 'timepicker' }));

    await user.type(getByRole('combobox', { name: 'timepicker' }), '20');

    await user.keyboard('[Escape]');
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('20:00');
  });

  it('should call onChange when a vlaue is typed that isnt in the list but is still a valid time and the input is blurred', async () => {
    const onChange = jest.fn();
    const { getByRole, user } = render(
      { onChange },
      {
        wrapper({ children }) {
          return (
            <div>
              {children}
              <button type="button">testing</button>
            </div>
          );
        },
      },
    );

    await user.type(getByRole('combobox', { name: 'timepicker' }), '01:01');

    await user.keyboard('[Escape]');
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('01:01');
  });

  it('should not have a pattern mismatch by using the field as standard', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('combobox', { name: 'timepicker' }));

    await user.click(getByRole('option', { name: '01:00' }));

    expect(getByRole('combobox')).toHaveValue('01:00');

    expect((getByRole('combobox') as HTMLInputElement).validity.patternMismatch).toBe(false);
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
