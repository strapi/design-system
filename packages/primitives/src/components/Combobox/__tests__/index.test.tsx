import * as React from 'react';

import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Combobox } from '../index';

const defaultOptions = [
  { value: '1', label: 'Option 1', disabled: false },
  { value: '2', label: 'Option 2', disabled: false },
  { value: '3', label: 'Option 3', disabled: false },
];

interface ComponentProps extends Combobox.RootProps {
  options?: Array<Pick<Combobox.ItemProps, 'value' | 'disabled'> & { label: string }>;
  hideCreatable?: boolean;
}

const Component = ({ options = defaultOptions, hideCreatable = false, ...restProps }: ComponentProps) => (
  <Combobox.Root {...restProps}>
    <Combobox.Trigger>
      <Combobox.TextInput placeholder="combobox test" />
      <Combobox.Icon />
    </Combobox.Trigger>
    <Combobox.Portal>
      <Combobox.Content>
        <Combobox.Viewport>
          {options.map(({ label, ...restProps }) => (
            <Combobox.Item key={label} {...restProps}>
              <Combobox.ItemText>{label}</Combobox.ItemText>
              <Combobox.ItemIndicator>check</Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
          <Combobox.NoValueFound>No value found</Combobox.NoValueFound>
          {!hideCreatable ? <Combobox.CreateItem>Create this option</Combobox.CreateItem> : null}
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox.Portal>
  </Combobox.Root>
);

const render = (props?: ComponentProps) => ({
  user: userEvent.setup({ document }),
  ...renderRTL(<Component {...props} />),
});

/**
 * @note Because there is a bug in `user-event` when we expect the `combobox`
 * to be focussed after clicking on it we need to manually call the `focus` method.
 *
 * For more information see – https://github.com/testing-library/user-event/issues/1002
 *
 * TODO: When the bug is fixed we can remove the `focus` method.
 */
describe('Combobox', () => {
  it('renders correctly', () => {
    const { getByRole, rerender, queryByRole } = render();

    expect(getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'none');
    expect(getByRole('combobox')).toHaveAttribute('aria-controls');
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(getByRole('combobox')).toHaveAttribute('aria-required', 'false');
    expect(getByRole('combobox')).toHaveAttribute('data-placeholder');
    expect(getByRole('combobox')).toHaveAttribute('data-state', 'closed');
    expect(getByRole('combobox')).toHaveAttribute('placeholder', 'combobox test');
    expect(getByRole('combobox')).toHaveAttribute('type', 'text');
    expect(getByRole('combobox')).toHaveAttribute('value', '');

    rerender(<Component disabled />);

    expect(getByRole('combobox')).toHaveAttribute('data-disabled');
    expect(getByRole('combobox')).toHaveAttribute('disabled');

    const iconButton = getByRole('button', { hidden: true });

    expect(iconButton).toHaveAttribute('aria-hidden', 'true');

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  describe('Trigger/Input', () => {
    it('should show the options when the trigger is clicked', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should show the options if the icon is clicked', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('button', { hidden: true }));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    test('you should not be able to tab to the icon button', async () => {
      const { getByRole, user } = render();

      await user.tab();

      expect(getByRole('combobox')).toHaveFocus();

      await user.tab();

      expect(getByRole('button', { hidden: true })).not.toHaveFocus();
    });

    /**
     * @note Because of the top note, theres no actual point in this test.
     */
    it.skip('should focus the input when the listbox is opened', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveFocus();
    });

    (['ArrowDown', 'ArrowUp'] as const).forEach((key) => {
      it(`should open the list when the the input is tabbed too & ${key} is pressed and visually focus the ${
        key === 'ArrowDown' ? 'first' : 'last'
      }`, async () => {
        const { getByRole, user } = render();

        await user.tab();
        await user.keyboard(`[${key}]`);

        expect(getByRole('listbox')).toBeInTheDocument();

        expect(getByRole('option', { name: key === 'ArrowDown' ? 'Option 1' : 'Option 3' })).not.toHaveFocus();
        expect(getByRole('option', { name: key === 'ArrowDown' ? 'Option 1' : 'Option 3' })).toHaveAttribute(
          'data-highlighted',
        );
        expect(getByRole('combobox')).toHaveAttribute(
          'aria-activedescendant',
          getByRole('option', { name: key === 'ArrowDown' ? 'Option 1' : 'Option 3' })?.id,
        );
      });
    });

    test('when pressing escape, if the listbox is open it should close it', async () => {
      const { getByRole, queryByRole, user } = render();

      await user.tab();
      await user.keyboard('[ArrowDown]');

      expect(queryByRole('listbox')).toBeInTheDocument();

      await user.keyboard('[Escape]');

      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(getByRole('combobox')).toHaveFocus();
    });

    test('when pressing escape, if the listbox is closed and there is a value in the combobox it should clear it', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));
      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.keyboard('[Escape]');

      expect(getByRole('combobox')).toHaveValue('');
    });

    it('should reopen the menu after a user has clicked an option and then pressed a key', async () => {
      const { getByRole, queryByRole, queryByText, user } = render();

      await user.click(getByRole('combobox'));

      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      /**
       * see note above
       */
      getByRole('combobox').focus();

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(getByRole('combobox')).toHaveFocus();

      await user.keyboard('{backspace}');

      expect(getByRole('combobox')).toHaveValue('Option ');

      expect(queryByRole('listbox')).toBeInTheDocument();

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).toBeInTheDocument();
      expect(queryByText('Option 3')).toBeInTheDocument();
    });

    /**
     * Window blur events are not being fired
     */
    it.skip('should revert to the related items textValue based on the set value if an unaccepted textValue is left onBlur', async () => {
      const onValueChange = jest.fn();

      const { getByRole, user } = render({ onValueChange });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.type(getByRole('combobox'), 'apples');

      await user.tab();

      expect(getByRole('combobox')).toHaveValue('');

      expect(onValueChange).not.toHaveBeenCalled();
    });

    /**
     * Window blur events are not being fired
     */
    it.skip("should set the value to the textValue's item's value assuming an allowed textValue is left onBlur", async () => {
      const onValueChange = jest.fn();

      const { getByRole, user } = render({ onValueChange });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.type(getByRole('combobox'), 'Option 1');

      await user.tab();

      expect(getByRole('combobox')).toHaveValue('Option 1');

      expect(onValueChange).toHaveBeenCalledWith('1');
    });

    /**
     * Window blur events are not being fired
     */
    it.skip('should not revert to the related items textValue based on the set value if the field is emptied', async () => {
      const onValueChange = jest.fn();

      const { getByRole, user } = render({ onValueChange });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.type(getByRole('combobox'), 'Option 1');

      await user.tab();

      expect(onValueChange).toHaveBeenNthCalledWith(1, '1');

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.clear(getByRole('combobox'));

      await user.tab();

      expect(getByRole('combobox')).toHaveValue('');

      expect(onValueChange).toHaveBeenNthCalledWith(2, undefined);
    });

    it('should not control the value strictly if `allowCustomValue` is true', async () => {
      const { getByRole, user } = render({ allowCustomValue: true });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.type(getByRole('combobox'), 'apples');

      await user.tab();

      expect(getByRole('combobox')).toHaveValue('apples');
    });
  });

  describe('Listbox', () => {
    it('should visually focus the first item when the combobox is clicked and ArrowDown is pressed', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowDown]');

      expect(getByRole('option', { name: 'Option 1' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute(
        'aria-activedescendant',
        getByRole('option', { name: 'Option 1' })?.id,
      );
    });

    it('should focus the last item when the combobox is clicked and ArrowUp is pressed', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowUp]');

      expect(getByRole('option', { name: 'Option 3' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Option 3' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute(
        'aria-activedescendant',
        getByRole('option', { name: 'Option 3' })?.id,
      );
    });

    it('should focus the first item in the list if the last item is in focussed and ArrowDown is pressed', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowDown]');

      expect(getByRole('option', { name: 'Option 1' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute(
        'aria-activedescendant',
        getByRole('option', { name: 'Option 1' })?.id,
      );
    });

    it('should focus the last item in the list if the first item is in focussed and ArrowUp is pressed', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowUp]');

      expect(getByRole('option', { name: 'Option 3' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Option 3' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute(
        'aria-activedescendant',
        getByRole('option', { name: 'Option 3' })?.id,
      );
    });

    it('should refocus the trigger when an item is clicked from the List & update the value', async () => {
      const { getByRole, getByText, user } = render();

      await user.click(getByRole('combobox'));
      await user.click(getByText('Option 1'));

      expect(getByRole('combobox')).toHaveFocus();

      expect(getByRole('combobox')).toHaveValue('Option 1');
    });

    ['Enter'].forEach((key) => {
      it(`should refocus the trigger when an item from the list is focussed and ${key} is pressed & update the value`, async () => {
        const { getByRole, user } = render();

        await user.click(getByRole('combobox'));

        /**
         * see note above
         */
        getByRole('combobox').focus();

        await user.keyboard('[ArrowDown]');

        expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('data-highlighted');
        expect(getByRole('combobox')).toHaveAttribute(
          'aria-activedescendant',
          getByRole('option', { name: 'Option 1' })?.id,
        );

        await user.keyboard(`[${key}]`);

        expect(getByRole('combobox')).toHaveFocus();
        expect(getByRole('combobox')).toHaveValue('Option 1');
      });
    });

    it('should not allow focus or clicking on a disabled item', async () => {
      const options = [
        { value: '1', label: 'Option 1', disabled: true, textValue: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: false, textValue: 'Option 2' },
        { value: '3', label: 'Option 3', disabled: false, textValue: 'Option 3' },
      ];

      const { getByRole, getByText, user } = render({ options });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowDown]');

      expect(getByRole('option', { name: 'Option 2' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Option 2' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute(
        'aria-activedescendant',
        getByRole('option', { name: 'Option 2' })?.id,
      );

      await user.keyboard('[Enter]');

      expect(getByRole('combobox')).toHaveValue('Option 2');

      await user.click(getByRole('combobox'));
      await user.clear(getByRole('combobox'));
      await user.click(getByText('Option 1'));

      expect(getByRole('combobox')).toHaveValue('');
      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should show an ItemIndicator when an item is selected', async () => {
      const { getByRole, getByText, user } = render();

      await user.click(getByRole('combobox'));

      await user.click(getByText('Option 1'));

      await user.click(getByRole('combobox'));

      expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('data-state', 'checked');
      expect(getByText('check')).toBeInTheDocument();
    });

    it('should show the creatable button when the user starts typing and it does not exactly match a value', async () => {
      const { getByRole, queryByText, user } = render();

      await user.click(getByRole('combobox'));

      expect(queryByText('Create this option')).not.toBeInTheDocument();

      await user.type(getByRole('combobox'), 'appl');

      expect(queryByText('Create this option')).toBeInTheDocument();

      await user.clear(getByRole('combobox'));

      getByRole('combobox').focus();

      expect(queryByText('Create this option')).not.toBeInTheDocument();

      await user.keyboard('Option ');

      expect(queryByText('Create this option')).toBeInTheDocument();

      await user.keyboard('1');

      expect(queryByText('Create this option')).not.toBeInTheDocument();

      await user.clear(getByRole('combobox'));
    });

    it('should show the creatable button if the option is spelt slightly different e.g. lowercase', async () => {
      const { getByRole, queryByText, user } = render();

      await user.click(getByRole('combobox'));

      expect(queryByText('Create this option')).not.toBeInTheDocument();

      await user.type(getByRole('combobox'), 'option 1');

      expect(queryByText('Create this option')).toBeInTheDocument();
    });

    it('should allow the createable button to be focussable and trigger the onChange handler', async () => {
      const onValueChange = jest.fn();

      const { getByRole, queryByText, user } = render({ allowCustomValue: true, onValueChange });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('appl');

      expect(getByRole('option', { name: 'Create this option' })).toBeInTheDocument();

      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');

      expect(getByRole('option', { name: 'Create this option' })).not.toHaveFocus();
      expect(getByRole('option', { name: 'Create this option' })).toHaveAttribute('data-highlighted');
      expect(getByRole('combobox')).toHaveAttribute('aria-activedescendant', queryByText('Create this option')?.id);

      await user.keyboard('[Enter]');

      expect(onValueChange).toHaveBeenCalled();
    });

    it('should correctly show the NoValue text as the textValue changes in different ways', async () => {
      const { getByRole, queryByText, user } = render({ hideCreatable: true });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('Option 1');

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(queryByText('No value found')).not.toBeInTheDocument();

      await user.keyboard('2');

      expect(getByRole('combobox')).toHaveValue('Option 12');
      expect(queryByText('No value found')).toBeInTheDocument();

      await user.keyboard('[Backspace]');

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(queryByText('No value found')).not.toBeInTheDocument();

      await user.clear(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveValue('');
      expect(queryByText('No value found')).not.toBeInTheDocument();
    });
  });

  describe('Controlling the component', () => {
    it('should allow the value to be controlled and call onValueChange when the value prop changes', async () => {
      const onValueChange = jest.fn();

      const { getByRole, user } = render({ value: '1', onValueChange });

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));
      await user.clear(getByRole('combobox'));
      await user.click(getByRole('option', { name: 'Option 2' }));

      expect(onValueChange).toHaveBeenCalledWith('2');

      expect(getByRole('combobox')).toHaveValue('Option 2');
    });

    it('should allow the textValue to be controlled and call onTextValueChange when the textValue prop changes', async () => {
      const onTextValueChange = jest.fn();

      const { getByRole, user } = render({ textValue: 'Option 1', onTextValueChange });

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));

      getByRole('combobox').focus();

      await user.keyboard('[Backspace]');

      expect(getByRole('combobox')).toHaveValue('Option 1');
    });

    it('should allow the open to be controlled and call onOpenChange when the open prop changes', async () => {
      const onOpenChange = jest.fn();

      const { getByRole, rerender, queryByRole, user } = render({ open: false, onOpenChange });

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(getByRole('combobox'));

      expect(onOpenChange).toHaveBeenCalledWith(true);

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      rerender(<Component open onOpenChange={onOpenChange} />);

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should not open the listbox when the disabled prop is true', async () => {
      const { getByRole, queryByRole, user } = render({ disabled: true });

      await user.click(getByRole('combobox'));

      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('autocomplete prop === list', () => {
    it('should filter the list of visible options when the input is typed', async () => {
      const { getByRole, queryByText, user } = render({ autocomplete: 'list' });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.type(getByRole('combobox'), 'Option 1');

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).not.toBeInTheDocument();
      expect(queryByText('Option 3')).not.toBeInTheDocument();
    });

    it('should filter the list if there is a selected option and we re-open the combobox', async () => {
      const { getByRole, queryByText, user } = render({
        autocomplete: 'list',
      });

      await user.click(getByRole('combobox'));

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).toBeInTheDocument();
      expect(queryByText('Option 3')).toBeInTheDocument();

      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).not.toBeInTheDocument();
      expect(queryByText('Option 3')).not.toBeInTheDocument();
    });

    it('should reopen the menu after a user has clicked an option and then pressed a key assuming there are items that match the filter pattern', async () => {
      const { getByRole, queryByRole, queryByText, user } = render({
        autocomplete: 'list',
      });

      await user.click(getByRole('combobox'));

      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      /**
       * see note above
       */
      getByRole('combobox').focus();

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(getByRole('combobox')).toHaveFocus();

      await user.keyboard('{backspace}');

      expect(getByRole('combobox')).toHaveValue('Option ');

      expect(queryByRole('listbox')).toBeInTheDocument();

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).toBeInTheDocument();
      expect(queryByText('Option 3')).toBeInTheDocument();

      await user.keyboard('1');

      expect(getByRole('combobox')).toHaveValue('Option 1');

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).not.toBeInTheDocument();
      expect(queryByText('Option 3')).not.toBeInTheDocument();
    });

    it('should correctly show the NoValue text as the textValue changes in different ways while filtering the list', async () => {
      const { getByRole, getAllByRole, queryByText, queryByRole, queryAllByRole, user } = render({
        hideCreatable: true,
        autocomplete: 'list',
      });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('Option 1');

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(queryByText('No value found')).not.toBeInTheDocument();

      await user.keyboard('2');

      expect(getByRole('combobox')).toHaveValue('Option 12');
      expect(queryAllByRole('option')).toHaveLength(0);
      expect(queryByText('No value found')).toBeInTheDocument();

      await user.keyboard('[Backspace]');

      expect(getByRole('combobox')).toHaveValue('Option 1');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(queryByText('No value found')).not.toBeInTheDocument();

      await user.clear(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveValue('');
      expect(getAllByRole('option')).toHaveLength(3);
      expect(queryByText('No value found')).not.toBeInTheDocument();

      await user.click(getByRole('option', { name: 'Option 2' }));

      expect(getByRole('combobox')).toHaveValue('Option 2');
      expect(queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveValue('Option 2');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(queryByText('No value found')).not.toBeInTheDocument();
    });
  });

  describe('autocomplete prop === both', () => {
    const options = [
      { value: '1', label: 'Banana' },
      { value: '4', label: 'Apples' },
      { value: '2', label: 'Oranges' },
      { value: '3', label: 'Kiwis' },
      { value: '5', label: 'Avocado' },
    ];

    it('should show first item of the list as the input value when you begin typing', async () => {
      const { getByRole, user } = render({ options, autocomplete: 'both' });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */

      getByRole('combobox').focus();

      await user.keyboard('a');

      expect(getByRole('combobox')).toHaveValue('Apples');

      await user.keyboard('v');

      expect(getByRole('combobox')).toHaveValue('Avocado');
    });

    it('should skip focussing the first item in the listbox when theres an autofilled suggestion and you press the ArrowDown key', async () => {
      const { getByRole, user } = render({ options, autocomplete: 'both' });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('a');

      expect(getByRole('combobox')).toHaveValue('Apples');

      await user.keyboard('{ArrowDown}');

      expect(getByRole('combobox')).toHaveValue('Avocado');
      expect(getByRole('option', { name: 'Avocado' })).toHaveAttribute('data-highlighted');
    });

    it('should still focus the first item if the input is empty', async () => {
      const { getByRole, user } = render({ options, autocomplete: 'both' });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      expect(getByRole('combobox')).toHaveValue('');

      await user.keyboard('{ArrowDown}');

      expect(getByRole('combobox')).toHaveValue('Banana');
    });

    it('should skip to the end of the word when there is an autofilled suggestion and you press the ArrowRight key', async () => {
      const { getByRole, user } = render({ options, autocomplete: 'both' });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('a');

      expect(getByRole('combobox')).toHaveValue('Apples');

      await user.keyboard('{ArrowRight}');
      await user.keyboard('x');

      expect(getByRole('combobox')).toHaveValue('Applesx');
    });

    it('should correct filter the list when an item is selected', async () => {
      const { getByRole, queryAllByRole, user } = render({ options, autocomplete: 'both' });

      await user.click(getByRole('combobox'));

      await user.click(getByRole('option', { name: 'Apples' }));

      expect(getByRole('combobox')).toHaveValue('Apples');

      await user.click(getByRole('combobox'));

      expect(queryAllByRole('option')).toHaveLength(1);

      await user.clear(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveValue('');

      getByRole('combobox').focus();

      expect(queryAllByRole('option')).toHaveLength(options.length);

      await user.keyboard('a');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(getByRole('combobox')).toHaveValue('Avocado');

      await user.click(getByRole('combobox'));

      expect(queryAllByRole('option')).toHaveLength(1);
    });
  });
});
