import * as React from 'react';

import { fireEvent, render } from '@test/utils';

import { Field, FieldError, FieldHint, FieldLabel } from './field';
import { Toggle, type ToggleProps } from './toggle';

const setup = (props: Partial<ToggleProps> = {}) =>
  render(<Toggle onLabel="True" offLabel="False" aria-label="Label" {...props} />);

describe('Toggle', () => {
  it('renders a labelled checkbox and both options', () => {
    const { getByRole, getByText } = setup();

    expect(getByRole('checkbox', { name: 'Label' })).toBeInTheDocument();
    expect(getByText('True')).toBeInTheDocument();
    expect(getByText('False')).toBeInTheDocument();
  });

  it('can be disabled and required', () => {
    const { getByRole } = setup({ disabled: true, required: true });

    expect(getByRole('checkbox')).toBeDisabled();
    expect(getByRole('checkbox')).toBeRequired();
  });

  it('changes the checked value on click and calls onChange', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = setup({ onChange });

    expect(getByRole('checkbox')).not.toBeChecked();
    expect(getByText('False')).toHaveAttribute('data-selected');

    fireEvent.click(getByRole('checkbox'));

    expect(getByRole('checkbox')).toBeChecked();
    expect(getByText('True')).toHaveAttribute('data-selected');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects neither option when checked is null', () => {
    const { getByText, getByRole } = setup({ checked: null, onChange: () => {} });

    expect(getByRole('checkbox')).not.toBeChecked();
    expect(getByText('True')).not.toHaveAttribute('data-selected');
    expect(getByText('False')).not.toHaveAttribute('data-selected');
  });

  it('takes its label, hint and error from the Field', () => {
    const { getByRole, rerender } = render(
      <Field hint="Shown on the site">
        <FieldLabel>Visible</FieldLabel>
        <Toggle onLabel="True" offLabel="False" />
        <FieldHint />
      </Field>,
    );

    expect(getByRole('checkbox', { name: 'Visible' })).toHaveAccessibleDescription('Shown on the site');

    rerender(
      <Field error="Required">
        <FieldLabel>Visible</FieldLabel>
        <Toggle onLabel="True" offLabel="False" />
        <FieldError />
      </Field>,
    );

    expect(getByRole('checkbox', { name: 'Visible' })).toHaveAccessibleDescription('Required');
    expect(getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards its ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = setup({ ref } as Partial<ToggleProps>);

    expect(ref.current).toBe(getByRole('checkbox'));
  });
});
