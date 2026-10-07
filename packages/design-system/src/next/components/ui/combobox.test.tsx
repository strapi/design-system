import * as React from 'react';

import { fireEvent, render as renderRTL, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Combobox, ComboboxOption, type ComboboxProps } from './combobox';

const defaultOptions = [
  { value: 'hamburger', children: 'Hamburger' },
  { value: 'bagel', children: 'Bagel' },
  { value: 'tartuffo', children: 'Tartuffo' },
  { value: 'carbonara', children: 'Carbonara' },
];

type ComponentProps = Partial<ComboboxProps> & { options?: typeof defaultOptions };

const Component = ({ options = defaultOptions, ...props }: ComponentProps) => (
  <Combobox aria-label="Food" {...props}>
    {options.map((option) => (
      <ComboboxOption key={option.value} value={option.value}>
        {option.children}
      </ComboboxOption>
    ))}
  </Combobox>
);

const render = (props?: ComponentProps) => ({
  user: userEvent.setup(),
  ...renderRTL(
    <>
      <Component {...props} />
      <button type="button">Next field</button>
    </>,
  ),
});

/*
 * Base UI prevents the default of `pointerdown` on an option, and user-event then skips the `click`
 * that a browser still fires. So the tests click the options with `fireEvent`
 */
const clickOption = async (name: string) => fireEvent.click(await screen.findByRole('option', { name }));

describe('Combobox', () => {
  it('is a combobox input named by its aria-label', () => {
    render();

    const input = screen.getByRole('combobox', { name: 'Food' });

    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('placeholder', 'Select or enter a value');
  });

  it('is named by a label', () => {
    renderRTL(
      <>
        <label htmlFor="food">Meal</label>
        <Combobox id="food">
          <ComboboxOption value="bagel">Bagel</ComboboxOption>
        </Combobox>
      </>,
    );

    expect(screen.getByRole('combobox', { name: 'Meal' })).toBeInTheDocument();
  });

  it('shows the label of a value', () => {
    render({ value: 'hamburger' });

    expect(screen.getByRole('combobox')).toHaveValue('Hamburger');
  });

  /**
   * @see https://github.com/strapi/design-system/issues/1074
   */
  it('completes the text inline and changes the value of similarly named options', async () => {
    const { user } = render({
      options: [
        { value: 'strawberry1', children: 'Strawberry 1' },
        { value: 'strawberry2', children: 'Strawberry 2' },
      ],
    });

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'Straw');

    expect(screen.getByRole('combobox')).toHaveValue('Strawberry 1');

    await clickOption('Strawberry 2');

    expect(screen.getByRole('combobox')).toHaveValue('Strawberry 2');
  });

  describe('callbacks', () => {
    it('fires onValueChange when an option is chosen, not when the text changes', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange });

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByRole('listbox')).toBeInTheDocument();

      await clickOption('Hamburger');

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith('hamburger');
      expect(screen.getByRole('combobox')).toHaveValue('Hamburger');
    });

    it('calls onInputChange as the input changes', async () => {
      const onInputChange = jest.fn();
      const { user } = render({ onInputChange });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'ham');

      expect(onInputChange).toHaveBeenNthCalledWith(1, expect.any(Object));
    });

    it('selects the highlighted option with Enter', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ onValueChange });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'tar');
      await user.keyboard('{Enter}');

      expect(onValueChange).toHaveBeenCalledWith('tartuffo');
      expect(screen.getByRole('combobox')).toHaveValue('Tartuffo');
    });
  });

  describe('filtering', () => {
    it('filters the options by the start of the typed text, ignoring case', async () => {
      const { user } = render();

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'b');

      await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
      expect(screen.getByRole('option', { name: 'Bagel' })).toBeInTheDocument();
    });

    it('filters on the whole text with a contains list autocomplete', async () => {
      const { user } = render({ autocomplete: { type: 'list', filter: 'contains' } });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'ar');

      await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(2));
      expect(screen.getByRole('combobox')).toHaveValue('ar');
    });
  });

  describe('props that make visual changes', () => {
    it('handles the disabled prop', () => {
      render({ disabled: true });

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('marks the input invalid with aria-invalid', () => {
      render({ 'aria-invalid': true });

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('handles the required prop', () => {
      render({ required: true });

      expect(screen.getByRole('combobox')).toBeRequired();
    });

    it('shows a loading message in the list when loading', async () => {
      const { user } = render({ loading: true });

      expect(screen.queryByText('Loading content...')).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('Loading');

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByText('Loading content...')).toBeInTheDocument();
    });

    it('shows no loader when not loading', () => {
      render();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows the noOptionsMessage when there is no option', async () => {
      const { user } = render({ options: [] });

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByText('No results found')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')).toHaveLength(0);
    });

    it('shows a custom noOptionsMessage when no option matches', async () => {
      const { user } = render({ noOptionsMessage: (value) => `${value} is not an option` });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'apple');

      expect(await screen.findByText('apple is not an option')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
  });

  describe('virtualization', () => {
    const manyOptions = Array.from({ length: 150 }, (_, index) => ({
      value: `item-${index}`,
      children: `Item ${index}`,
    }));

    it('virtualizes more than 100 options', async () => {
      const { user } = render({ options: manyOptions });

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByTestId('virtualized-list')).toBeInTheDocument();
    });

    it('does not virtualize while filtering', async () => {
      const { user } = render({ options: manyOptions });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'item 1');

      expect(screen.queryByTestId('virtualized-list')).not.toBeInTheDocument();
    });

    it('does not virtualize a short list', async () => {
      const { user } = render();

      await user.click(screen.getByRole('combobox'));
      await screen.findByRole('listbox');

      expect(screen.queryByTestId('virtualized-list')).not.toBeInTheDocument();
    });
  });

  describe('clear', () => {
    it('shows the clear button once there is a text and onClear is passed', async () => {
      const { user } = render({ onClear: jest.fn() });

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('button', { name: 'Clear', hidden: true })).not.toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'hamburger');

      expect(screen.getByRole('button', { name: 'Clear', hidden: true })).toBeInTheDocument();
    });

    it('uses a custom label', async () => {
      const { user } = render({ onClear: jest.fn(), clearLabel: 'Clear the field' });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'hamburger');

      expect(screen.getByRole('button', { name: 'Clear the field', hidden: true })).toBeInTheDocument();
    });

    it('clears the text when pressed', async () => {
      const onClear = jest.fn();
      const { user } = render({ onClear });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'hamburger');
      await user.click(screen.getByRole('button', { name: 'Clear', hidden: true }));

      expect(screen.getByRole('combobox')).toHaveValue('');
      expect(screen.getByRole('combobox')).toHaveFocus();
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('blur', () => {
    it('restores the label of the value when the text matches no option', async () => {
      const { user } = render({ defaultValue: 'bagel' });

      await user.click(screen.getByRole('combobox'));
      await user.clear(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'zzz');
      await user.tab();

      await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('Bagel'));
    });

    it('keeps a custom text as the value with allowCustomValue', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ allowCustomValue: true, onValueChange });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'zzz');
      await user.tab();

      expect(onValueChange).toHaveBeenLastCalledWith('zzz');
      expect(screen.getByRole('combobox')).toHaveValue('zzz');
    });

    it('clears the value when the text is erased', async () => {
      const onValueChange = jest.fn();
      const { user } = render({ defaultValue: 'bagel', onValueChange });

      await user.click(screen.getByRole('combobox'));
      await user.clear(screen.getByRole('combobox'));
      await user.tab();

      expect(onValueChange).toHaveBeenLastCalledWith(undefined);
    });
  });

  describe('creatable', () => {
    it('shows the create option only for a text that matches no option', async () => {
      const { user } = render({ creatable: true });

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('option', { name: /Create/ })).not.toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'Hamb');

      expect(await screen.findByRole('option', { name: 'Create "Hamb"' })).toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'urger');

      await waitFor(() => expect(screen.queryByRole('option', { name: /Create/ })).not.toBeInTheDocument());
    });

    it('shows the create option without any option once something is typed', async () => {
      const { user } = render({ creatable: true, options: [] });

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('option', { name: /Create/ })).not.toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'Hamb');

      expect(await screen.findByRole('option', { name: 'Create "Hamb"' })).toBeInTheDocument();
    });

    it('always shows a visible create option, with the no option message', async () => {
      const { user } = render({ creatable: 'visible' });

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByRole('option', { name: /Create/ })).toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'Hamburger');

      expect(screen.getByRole('option', { name: 'Create "Hamburger"' })).toBeInTheDocument();

      await user.type(screen.getByRole('combobox'), 'invalid value');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('uses a custom createMessage', async () => {
      const { user } = render({ creatable: true, createMessage: (value) => `Create ${value} as an option` });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'hamb');
      await user.keyboard('{Backspace}');

      expect(await screen.findByRole('option', { name: 'Create ham as an option' })).toBeInTheDocument();
    });

    it('calls onCreateOption with the text when the create option is clicked', async () => {
      const onCreateOption = jest.fn();
      const { user } = render({ creatable: true, onCreateOption });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'newValue');
      await clickOption('Create "newValue"');

      expect(onCreateOption).toHaveBeenCalledTimes(1);
      expect(onCreateOption).toHaveBeenCalledWith('newValue');
      expect(screen.getByRole('combobox')).toHaveValue('newValue');
    });

    it('calls onCreateOption without a text for a visible create option', async () => {
      const onCreateOption = jest.fn();
      const { user } = render({ creatable: 'visible', onCreateOption, createMessage: () => 'Create a food' });

      await user.click(screen.getByRole('combobox'));
      await clickOption('Create a food');

      expect(onCreateOption).toHaveBeenCalledTimes(1);
      expect(onCreateOption).toHaveBeenCalledWith();
    });

    it('chooses the create option with the arrow keys and Enter', async () => {
      const onCreateOption = jest.fn();
      const { user } = render({ creatable: true, onCreateOption, options: [] });

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('combobox'), 'keyboardValue');
      await user.keyboard('{ArrowDown}');

      expect(await screen.findByRole('option', { name: 'Create "keyboardValue"' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{Enter}');

      expect(onCreateOption).toHaveBeenCalledTimes(1);
      expect(onCreateOption).toHaveBeenCalledWith('keyboardValue');
    });

    it('chooses a visible create option with the arrow keys and Enter', async () => {
      const onCreateOption = jest.fn();
      const { user } = render({
        creatable: 'visible',
        onCreateOption,
        createMessage: () => 'Create a food',
        options: [],
      });

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}');

      expect(await screen.findByRole('option', { name: 'Create a food' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{Enter}');

      expect(onCreateOption).toHaveBeenCalledTimes(1);
    });
  });

  it('forwards its ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();

    renderRTL(
      <Combobox ref={ref} aria-label="Food">
        <ComboboxOption value="bagel">Bagel</ComboboxOption>
      </Combobox>,
    );

    expect(ref.current).toBe(screen.getByRole('combobox'));
  });
});
