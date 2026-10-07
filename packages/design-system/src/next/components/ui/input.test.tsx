import * as React from 'react';

import { PlusCircle } from '@strapi/icons';
import { render } from '@test/utils';

import { Field, FieldAction, FieldLabel } from './field';
import { Input, type InputProps } from './input';

const setup = (props: InputProps = {}) =>
  render(
    <Field>
      <FieldLabel>field label</FieldLabel>
      <Input {...props} />
    </Field>,
  );

describe('Input', () => {
  it('renders outside a Field and keeps its own props', () => {
    const { getByRole } = render(
      <Input aria-label="text label" id="own" name="own" required hasError aria-describedby="other" />,
    );

    const input = getByRole('textbox', { name: 'text label' });

    expect(input).toHaveAttribute('id', 'own');
    expect(input).toHaveAttribute('name', 'own');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'other');
  });

  it('does not call onChange when disabled', async () => {
    const onChange = jest.fn();
    const { getByRole, user } = setup({ disabled: true, onChange });

    expect(getByRole('textbox')).toBeDisabled();

    await user.type(getByRole('textbox'), 'test');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange', async () => {
    const onChange = jest.fn();
    const { getByRole, user } = setup({ onChange });

    await user.type(getByRole('textbox'), 'test');

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it('can be controlled with a value', async () => {
    const { getByRole, user } = setup({ value: 'test', onChange: () => {} });

    await user.type(getByRole('textbox'), 'apple');

    expect(getByRole('textbox')).toHaveValue('test');
  });

  it('renders clickable start and end actions', async () => {
    const startClick = jest.fn();
    const endClick = jest.fn();

    const { getByRole, user } = setup({
      startAction: (
        <FieldAction onClick={startClick} label="start">
          <PlusCircle />
        </FieldAction>
      ),
      endAction: (
        <FieldAction onClick={endClick} label="end">
          <PlusCircle />
        </FieldAction>
      ),
    });

    await user.click(getByRole('button', { name: 'start' }));
    await user.click(getByRole('button', { name: 'end' }));

    expect(startClick).toHaveBeenCalled();
    expect(endClick).toHaveBeenCalled();
    expect(getByRole('button', { name: 'start' })).toHaveAttribute('type', 'button');
    expect(getByRole('button', { name: 'start' }).querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies className to the box and forwards its ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<Input ref={ref} aria-label="label" className="custom" size="S" />);

    expect(ref.current).toBe(getByRole('textbox'));
    expect(getByRole('textbox').parentElement).toHaveClass('custom');
  });
});
