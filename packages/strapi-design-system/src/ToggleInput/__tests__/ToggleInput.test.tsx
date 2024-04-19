import { fireEvent, render as renderHarness } from '@test/utils';

import { ToggleInput, ToggleInputProps } from '../ToggleInput';

const render = (props: Partial<Omit<ToggleInputProps, 'aria-label'>> = {}) =>
  renderHarness(<ToggleInput onLabel="On" offLabel="Off" label="Label" {...props} />);

describe('ToggleInput', () => {
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
    const { getByText, getByRole } = render({
      error: 'Error',
    });

    expect(getByText('Error')).toBeInTheDocument();
    expect(getByRole('checkbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
  });

  it('should render a hint if supplied', () => {
    const { getByText, getByRole } = render({
      hint: 'Hint',
    });

    expect(getByText('Hint')).toBeInTheDocument();
    expect(getByRole('checkbox')).toHaveAttribute('aria-describedby', expect.stringContaining('hint'));
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
