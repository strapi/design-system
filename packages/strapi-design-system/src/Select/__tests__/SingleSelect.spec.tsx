import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { darkTheme } from '../../themes';
import * as Select from '../SingleSelect';

interface RenderProps extends Partial<Omit<Select.SingleSelectProps, 'children'>> {
  options?: Array<{ value: string; label: string }>;
}

const defaultOpts = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
];

const Component = ({ options = defaultOpts, ...restProps }: RenderProps) => (
  <ThemeProvider theme={darkTheme}>
    <Select.SingleSelect label="Pick Options" {...restProps}>
      {options.map((opt) => (
        <Select.SingleSelectOption key={opt.label} value={opt.value}>
          {opt.label}
        </Select.SingleSelectOption>
      ))}
    </Select.SingleSelect>
  </ThemeProvider>
);

const renderComponent = (props: RenderProps = {}) => render(<Component {...props} />);

describe('SingleSelect', () => {
  describe('Interactions', () => {
    it('should open the list when the trigger is clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole('combobox', { name: 'Pick Options' }));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should close the list when an option is selected', async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should not open the menu if the component is disabled', async () => {
      const user = userEvent.setup();
      renderComponent({ disabled: true });

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('label / placeholder / value / onChange / clear / customiseContent prop', () => {
    it('should render a label when provided', () => {
      renderComponent({ label: 'Label' });

      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should render a placeholder when provided', () => {
      renderComponent({ placeholder: 'Placeholder' });

      expect(screen.getByText('Placeholder')).toBeInTheDocument();
    });

    it('should render the value provided and update when a new value is provided', () => {
      const { rerender } = renderComponent({ value: 'Option 1' });

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      rerender(<Component value="Option 2" />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render the value provided and not update when an option is selected', async () => {
      const user = userEvent.setup();
      renderComponent({ value: 'Option 1' });

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should fire the onChange handler if you have a value provided and when you dont', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      const { rerender } = renderComponent({ onChange });

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 3' }));

      expect(onChange).toHaveBeenCalledWith('Option 3');

      rerender(<Component onChange={onChange} value="Option 1" />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(onChange).toHaveBeenCalledWith('Option 2');
    });

    it('should not render the clear button when there is no current value and onClear is not passed', () => {
      renderComponent();

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
    });

    it('should not render the clear button when there is no current value and onClear is passed', () => {
      renderComponent({ onClear: jest.fn() });

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
    });

    it('should not render the clear button when there is a value but onClear is not passed', async () => {
      const user = userEvent.setup();
      const { rerender } = renderComponent({ value: 'Option 1' });

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();

      rerender(<Component />);

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
    });

    it('should render the clear button when both a value and onClear are passed', async () => {
      const user = userEvent.setup();
      const { rerender } = renderComponent({ value: 'Option 1', onClear: jest.fn() });

      expect(screen.getByLabelText('Clear')).toBeInTheDocument();

      rerender(<Component onClear={jest.fn()} />);

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByLabelText('Clear')).toBeInTheDocument();
    });

    /**
     * TODO: This test is skipped because of an issue with the event being prevented by not calling the original...
     */
    it.skip('should call onClear when clicked', async () => {
      const onClear = jest.fn();
      const user = userEvent.setup();
      renderComponent({ onClear });

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Clear'));

      await waitFor(() => expect(screen.getByText('Option 1')).not.toBeInTheDocument());

      expect(onClear).toHaveBeenCalled();
    });

    it('should render the customizeContent when provided', () => {
      renderComponent({
        value: 'Option 1',
        customizeContent: () => 'Custom Content',
      });

      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  it.todo('should call onReachEnd when the list is scrolled to the end assuming the callback has been provided');

  it.todo('should render a hint and error when provided');
});
