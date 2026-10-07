import * as React from 'react';

import { fireEvent, render } from '@test/utils';

import { Field, FieldLabel } from './field';
import { NumberInput, type NumberInputProps } from './number-input';

const setup = (props: Partial<NumberInputProps> = {}) =>
  render(
    <Field>
      <FieldLabel>Amount</FieldLabel>
      <NumberInput locale="en-GB" {...props} />
    </Field>,
  );

describe('NumberInput', () => {
  it('renders a labelled text input with a decimal keyboard', () => {
    const { getByRole } = setup({ value: 1234.5 });

    const input = getByRole('textbox', { name: 'Amount' });

    expect(input).toHaveAttribute('inputmode', 'decimal');
    expect(input).toHaveValue('1,234.5');
  });

  it('calls onValueChange with a number, or undefined for text that is not a number yet', async () => {
    const onValueChange = jest.fn();
    const { getByRole, user } = setup({ onValueChange });

    await user.type(getByRole('textbox'), '-');

    expect(onValueChange).toHaveBeenLastCalledWith(undefined);

    await user.type(getByRole('textbox'), '12.5');

    expect(onValueChange).toHaveBeenLastCalledWith(-12.5);
    expect(getByRole('textbox')).toHaveValue('-12.5');
  });

  it('ignores characters that do not make a number', async () => {
    const { getByRole, user } = setup();

    await user.type(getByRole('textbox'), '1a2');

    expect(getByRole('textbox')).toHaveValue('12');
  });

  it('steps with the arrow keys', async () => {
    const onValueChange = jest.fn();
    const { getByRole, user } = setup({ onValueChange, step: 0.1 });

    await user.click(getByRole('textbox'));
    await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');

    expect(getByRole('textbox')).toHaveValue('0.3');
    expect(onValueChange).toHaveBeenLastCalledWith(0.3);

    await user.keyboard('{ArrowDown}');

    expect(getByRole('textbox')).toHaveValue('0.2');
  });

  it('steps with the arrow buttons, which stay out of the tab order', async () => {
    const { getByRole, getByTestId, user } = setup({ value: 5 });

    expect(getByTestId('ArrowUp')).toHaveAttribute('tabindex', '-1');
    expect(getByTestId('ArrowUp')).toHaveAttribute('aria-hidden', 'true');

    await user.click(getByTestId('ArrowUp'));

    expect(getByRole('textbox')).toHaveValue('6');

    await user.click(getByTestId('ArrowDown'));
    await user.click(getByTestId('ArrowDown'));

    expect(getByRole('textbox')).toHaveValue('4');
  });

  it('does not step when disabled', () => {
    const { getByRole, getByTestId } = setup({ value: 5, disabled: true });

    fireEvent.keyDown(getByRole('textbox'), { key: 'ArrowUp' });

    expect(getByRole('textbox')).toHaveValue('5');
    expect(getByRole('textbox')).toBeDisabled();
    expect(getByTestId('ArrowUp')).toBeDisabled();
  });

  it('formats the value on blur', async () => {
    const onValueChange = jest.fn();
    const { getByRole, user } = setup({ onValueChange });

    await user.type(getByRole('textbox'), '1000.');
    await user.tab();

    expect(getByRole('textbox')).toHaveValue('1,000');
    expect(onValueChange).toHaveBeenLastCalledWith(1000);
  });

  it('follows a value that the parent changes', () => {
    const { getByRole, rerender } = setup({ value: 5 });

    rerender(
      <Field>
        <FieldLabel>Amount</FieldLabel>
        <NumberInput locale="en-GB" value={42} />
      </Field>,
    );

    expect(getByRole('textbox')).toHaveValue('42');

    rerender(
      <Field>
        <FieldLabel>Amount</FieldLabel>
        <NumberInput locale="en-GB" value={undefined} />
      </Field>,
    );

    expect(getByRole('textbox')).toHaveValue('');
  });

  it('forwards its ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<NumberInput ref={ref} aria-label="Amount" />);

    expect(ref.current).toBe(getByRole('textbox'));
  });
});
