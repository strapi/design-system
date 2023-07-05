import { screen, render, waitFor } from '@test/utils';

import { SingleSelectOption, SingleSelect, SingleSelectProps } from '../SingleSelect';

type RenderProps = Partial<Omit<SingleSelectProps, 'children' | 'aria-label'>> & {
  options?: Array<{ value: string; label: string }>;
};

const defaultOpts = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
];

const Component = ({ options = defaultOpts, ...restProps }: RenderProps) => {
  return (
    <SingleSelect label="Pick Options" placeholder="Your option" {...restProps}>
      {options.map((opt) => (
        <SingleSelectOption key={opt.label} value={opt.value}>
          {opt.label}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};

const renderComponent = (props: RenderProps = {}) => render(<Component {...props} />);

describe('Select', () => {
  describe('Interactions', () => {
    it('should open the list when the trigger is clicked', async () => {
      const { user } = renderComponent();

      await user.click(screen.getByRole('combobox', { name: 'Pick Options' }));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should close the list when an option is selected', async () => {
      const { user } = renderComponent();

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should not open the menu if the component is disabled', async () => {
      const { user } = renderComponent({ disabled: true });

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('label / placeholder / value / onChange / clear / customiseContent prop', () => {
    it('should render a label when provided', () => {
      renderComponent({ label: 'Label' });

      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should be accessible if I only pass an aria-label', () => {
      const { getByRole, queryByRole } = render(
        <SingleSelect aria-label="Label">
          {defaultOpts.map((opt) => (
            <SingleSelectOption key={opt.label} value={opt.value}>
              {opt.label}
            </SingleSelectOption>
          ))}
        </SingleSelect>,
      );

      expect(queryByRole('label')).not.toBeInTheDocument();

      expect(getByRole('combobox', { name: 'Label' })).toBeInTheDocument();
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
      const { user } = renderComponent({ value: 'Option 1' });

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should fire the onChange handler if you have a value provided and when you dont', async () => {
      const onChange = jest.fn();

      const { rerender, user } = renderComponent({ onChange });

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
      const { user, rerender } = renderComponent({ value: 'Option 1' });

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();

      rerender(<Component />);

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
    });

    it('should render the clear button when both a value and onClear are passed', async () => {
      const { user, rerender } = renderComponent({ value: 'Option 1', onClear: jest.fn() });

      expect(screen.getByLabelText('Clear')).toBeInTheDocument();

      rerender(<Component onClear={jest.fn()} />);

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByLabelText('Clear')).toBeInTheDocument();
    });

    it('should call onClear when clicked', async () => {
      const onClear = jest.fn();

      const { user } = renderComponent({ onClear });

      await user.click(screen.getByRole('combobox'));

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Clear'));

      await waitFor(() => expect(screen.queryByText('Option 1')).not.toBeInTheDocument());

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
