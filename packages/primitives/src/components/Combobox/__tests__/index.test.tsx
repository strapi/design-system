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
  options?: Combobox.ItemProps[];
}

const Component = ({ options = defaultOptions, ...restProps }: ComponentProps) => (
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
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox.Portal>
  </Combobox.Root>
);

const render = (props?: ComponentProps) => renderRTL(<Component {...props} />);

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

    expect(getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'both');
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
      const user = userEvent.setup();
      const { getByRole } = render();

      await user.click(getByRole('combobox'));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should show the options if the icon is clicked', async () => {
      const user = userEvent.setup();
      const { getByRole } = render();

      await user.click(getByRole('button', { hidden: true }));

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    test('you should not be able to tab to the icon button', async () => {
      const user = userEvent.setup({ document });
      const { getByRole } = render();

      await user.tab();

      expect(getByRole('combobox')).toHaveFocus();

      await user.tab();

      expect(getByRole('button', { hidden: true })).not.toHaveFocus();
    });

    /**
     * @note Because of the top note, theres no actual point in this test.
     */
    it.skip('should focus the input when the listbox is opened', async () => {
      const user = userEvent.setup();
      const { getByRole } = render();

      await user.click(getByRole('combobox'));

      expect(getByRole('combobox')).toHaveFocus();
    });

    it('should filter the list of visible options when the input is typed', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByText } = render();

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

    (['ArrowDown', 'ArrowUp'] as const).forEach((key) => {
      it(`should open the list when the the input is tabbed too & ${key} is pressed and focus the ${
        key === 'ArrowDown' ? 'first' : 'last'
      }`, async () => {
        const user = userEvent.setup({ document });
        const { getByRole } = render();

        await user.tab();
        await user.keyboard(`[${key}]`);

        expect(getByRole('listbox')).toBeInTheDocument();

        expect(getByRole('option', { name: key === 'ArrowDown' ? 'Option 1' : 'Option 3' })).toHaveFocus();
      });
    });

    it('should not filter the list if there is a selected option and we re-open the combobox', async () => {
      const user = userEvent.setup();

      const { getByRole, queryByText } = render();

      await user.click(getByRole('combobox'));
      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));

      expect(queryByText('Option 1')).toBeInTheDocument();
      expect(queryByText('Option 2')).toBeInTheDocument();
      expect(queryByText('Option 3')).toBeInTheDocument();
    });

    it('should reopen the menu after a user has clicked an option and then pressed a key assuming there are items that match the filter pattern', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByRole, queryByText } = render();

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

    it('should revert to the related items textValue based on the set value if an unaccepted textValue is left onBlur', async () => {
      const user = userEvent.setup({ document });

      const onValueChange = jest.fn();

      const { getByRole } = render({ onValueChange });

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

    it("should set the value to the textValue's item's value assuming an allowed textValue is left onBlur", async () => {
      const user = userEvent.setup({ document });

      const onValueChange = jest.fn();

      const { getByRole } = render({ onValueChange });

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

    it('should not revert to the related items textValue based on the set value if the field is emptied', async () => {
      const user = userEvent.setup({ document });

      const onValueChange = jest.fn();

      const { getByRole } = render({ onValueChange });

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
  });

  describe('Listbox', () => {
    it('should focus the first item when the combobox is clicked and ArrowDown is pressed', async () => {
      const user = userEvent.setup();
      const { getByRole } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowDown]');

      expect(getByRole('option', { name: 'Option 1' })).toHaveFocus();
    });

    it('should focus the last item when the combobox is clicked and ArrowUp is pressed', async () => {
      const user = userEvent.setup();

      const { getByRole } = render();

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowUp]');

      expect(getByRole('option', { name: 'Option 3' })).toHaveFocus();
    });

    it('should refocus the trigger when an item is clicked from the List & update the value', async () => {
      const user = userEvent.setup();

      const { getByRole, getByText } = render();

      await user.click(getByRole('combobox'));
      await user.click(getByText('Option 1'));

      expect(getByRole('combobox')).toHaveFocus();

      expect(getByRole('combobox')).toHaveValue('Option 1');
    });

    ['Enter', 'Space'].forEach((key) => {
      it(`should refocus the trigger when an item from the list is focussed and ${key} is pressed & update the value`, async () => {
        const user = userEvent.setup();

        const { getByRole } = render();

        await user.click(getByRole('combobox'));

        /**
         * see note above
         */
        getByRole('combobox').focus();

        await user.keyboard('[ArrowDown]');

        expect(getByRole('option', { name: 'Option 1' })).toHaveFocus();

        await user.keyboard(`[${key}]`);

        expect(getByRole('combobox')).toHaveFocus();
        expect(getByRole('combobox')).toHaveValue('Option 1');
      });
    });

    it('should not allow focus or clicking on a disabled item', async () => {
      const user = userEvent.setup({ document });

      const options = [
        { value: '1', label: 'Option 1', disabled: true, textValue: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: false, textValue: 'Option 2' },
        { value: '3', label: 'Option 3', disabled: false, textValue: 'Option 3' },
      ];

      const { getByRole, getByText } = render({ options });

      await user.click(getByRole('combobox'));

      /**
       * see note above
       */
      getByRole('combobox').focus();

      await user.keyboard('[ArrowDown]');
      expect(getByRole('option', { name: 'Option 2' })).toHaveFocus();
      await user.keyboard('[Enter]');

      expect(getByRole('combobox')).toHaveValue('Option 2');

      await user.click(getByRole('combobox'));
      await user.click(getByText('Option 1'));

      expect(getByRole('combobox')).toHaveValue('Option 2');
      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should show an ItemIndicator when an item is selected', async () => {
      const user = userEvent.setup();

      const { getByRole, getByText } = render();

      await user.click(getByRole('combobox'));

      await user.click(getByText('Option 1'));

      await user.click(getByRole('combobox'));

      expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('data-state', 'checked');
      expect(getByText('check')).toBeInTheDocument();
    });
  });

  describe('Controlling the component', () => {
    it('should allow the value to be controlled and call onValueChange when the value prop changes', async () => {
      const user = userEvent.setup();

      const onValueChange = jest.fn();

      const { getByRole } = render({ value: '1', onValueChange });

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));
      await user.click(getByRole('option', { name: 'Option 2' }));

      expect(onValueChange).toHaveBeenCalledWith('2');

      expect(getByRole('combobox')).toHaveValue('Option 2');
    });

    it('should allow the textValue to be controlled and call onTextValueChange when the textValue prop changes', async () => {
      const user = userEvent.setup();

      const onTextValueChange = jest.fn();

      const { getByRole } = render({ textValue: 'Option 1', onTextValueChange });

      expect(getByRole('combobox')).toHaveValue('Option 1');

      await user.click(getByRole('combobox'));

      await user.keyboard('[Backspace]');

      await user.click(getByRole('option', { name: 'Option 2' }));

      expect(onTextValueChange).toHaveBeenCalledWith('Option 2');

      expect(getByRole('combobox')).toHaveValue('Option 1');
    });

    it('should allow the open to be controlled and call onOpenChange when the open prop changes', async () => {
      const user = userEvent.setup();

      const onOpenChange = jest.fn();

      const { getByRole, rerender, queryByRole } = render({ open: false, onOpenChange });

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(getByRole('combobox'));

      expect(onOpenChange).toHaveBeenCalledWith(true);

      expect(queryByRole('listbox')).not.toBeInTheDocument();

      rerender(<Component open onOpenChange={onOpenChange} />);

      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('should not open the listbox when the disabled prop is true', async () => {
      const user = userEvent.setup();

      const { getByRole, queryByRole } = render({ disabled: true });

      await user.click(getByRole('combobox'));

      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
