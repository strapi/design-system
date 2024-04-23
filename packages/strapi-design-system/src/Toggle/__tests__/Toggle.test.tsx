import { fireEvent, render as renderHarness } from '@test/utils';

import { Field, FieldHint, FieldError, type FieldProps } from '../../Field';
import { ToggleInput, type ToggleInputProps } from '../Toggle';

const render = (props: Partial<Omit<ToggleInputProps, 'aria-label'>> = {}) =>
  renderHarness(<ToggleInput onLabel="On" offLabel="Off" label="Label" {...props} />);

describe('Toggle', () => {
  it('should render and be accesisble with a label', () => {
    const { getByRole, getByText } = render();

    expect(getByRole('checkbox', { name: 'Label' })).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
    expect(getByText('Off')).toBeInTheDocument();
  });

  it('should be accessible by only supplying aria-label', () => {
    const { getByRole } = render({
      label: undefined,
      // @ts-ignore
      'aria-label': 'Label',
    });

    expect(getByRole('checkbox', { name: 'Label' })).toBeInTheDocument();
  });

  it('should be able to be disabled', () => {
    const { getByRole } = render({
      disabled: true,
    });

    expect(getByRole('checkbox', { name: 'Label' })).toBeDisabled();
  });

  it('should be able to be required', () => {
    const { getByRole } = render({
      required: true,
    });

    expect(getByRole('checkbox', { name: /Label/ })).toBeRequired();
  });

  it('should render an error if supplied', () => {
    const renderField = (props: Partial<Omit<ToggleInputProps, 'aria-label'> & Pick<FieldProps, 'error'>> = {}) =>
      renderHarness(
        <Field id="with_field" error={props.error}>
          <ToggleInput onLabel="On" offLabel="Off" label="Label" {...props} />
          <FieldError />
        </Field>,
      );

    const { getByText } = renderField({
      error: 'error',
    });

    expect(getByText('error')).toBeInTheDocument();
  });

  it('should render a hint if supplied', () => {
    const renderField = (props: Partial<Omit<ToggleInputProps, 'aria-label'> & Pick<FieldProps, 'hint'>> = {}) =>
      renderHarness(
        <Field id="with_field" hint={props.hint}>
          <ToggleInput onLabel="On" offLabel="Off" label="Label" {...props} />
          <FieldHint />
        </Field>,
      );

    const { getByText } = renderField({
      hint: 'Hint',
    });

    expect(getByText('Hint')).toBeInTheDocument();
  });

  it('should change the checked value when clicked & call onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = render({
      onChange,
    });

    expect(getByRole('checkbox', { name: 'Label' })).not.toBeChecked();

    /**
     * we use fireEvent.click here because user.click doesn't work with the
     * way the input is setup/styled
     */
    fireEvent.click(getByRole('checkbox', { name: 'Label' }));

    expect(getByRole('checkbox', { name: 'Label' })).toBeChecked();

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should render the clear button if 'onClear' and 'clearLabel' are supplied and input is not disabled", async () => {
    const onClear = jest.fn();
    const { getByRole, user } = render({
      onClear,
      clearLabel: 'Clear',
    });

    expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

    /**
     * we use fireEvent.click here because user.click doesn't work with the
     * way the input is setup/styled
     */
    fireEvent.click(getByRole('checkbox', { name: 'Label' }));

    expect(getByRole('checkbox', { name: 'Label' })).toBeChecked();

    await user.click(getByRole('button', { name: 'Clear' }));
  });
});
