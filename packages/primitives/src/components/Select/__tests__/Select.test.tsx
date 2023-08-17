import * as React from 'react';

import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '../index';

const defaultOptions = [
  { value: '1', label: 'Option 1', disabled: false },
  { value: '2', label: 'Option 2', disabled: false },
  { value: '3', label: 'Option 3', disabled: false },
];

type ComponentProps = {
  options?: Array<Pick<Select.SelectItemProps, 'value' | 'disabled'> & { label: string }>;
} & Omit<Select.SelectProps, 'children'> &
  Pick<Select.SelectValueProps, 'children'>;

const Component = ({ options = defaultOptions, children, ...restProps }: ComponentProps) => (
  <>
    {/* @ts-expect-error there's a confusion here over the expected value prop */}
    <Select.Root {...restProps}>
      <Select.Trigger>
        <Select.Value>{children}</Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            {options.map(({ label, ...restProps }) => (
              <Select.Item key={label} {...restProps}>
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator>check</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </>
);

const render = (props?: ComponentProps) => ({
  // eslint-disable-next-line testing-library/await-async-events
  user: userEvent.setup({ document }),
  ...renderRTL(<Component {...props} />),
});

describe('Select', () => {
  it('should render the children of Select.Value when it is a function and pass the current value to said function', async () => {
    const { getByRole, user } = render({
      children: (value) => <span>{`Value is ${value}`}</span>,
    });

    await user.click(getByRole('combobox'));

    await user.click(getByRole('option', { name: 'Option 1' }));

    expect(getByRole('combobox')).toHaveTextContent('Value is 1');
  });

  describe('single', () => {
    it('should allow a single selection', async () => {
      const { user, getByRole } = render();

      await user.click(getByRole('combobox'));

      await user.click(getByRole('option', { name: 'Option 1' }));

      expect(getByRole('combobox')).toHaveTextContent('1');

      await user.click(getByRole('combobox'));

      expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('multiple', () => {
    it('should render correctly when multi is true', async () => {
      const { getByRole, user } = render({ multi: true });

      await user.click(getByRole('combobox'));

      expect(getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('should allow multiple selection when multi is true', async () => {
      const { getByRole, user } = render({ multi: true });

      await user.click(getByRole('combobox'));

      await user.click(getByRole('option', { name: 'Option 1' }));
      await user.click(getByRole('option', { name: 'Option 2' }));

      expect(getByRole('option', { name: 'Option 1' })).toBeChecked();
      expect(getByRole('option', { name: 'Option 2' })).toBeChecked();

      await user.keyboard('[Escape]');

      expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
    });

    it('should let me pass an array of values when multi is true', async () => {
      const { getByRole } = render({
        multi: true,
        value: ['1', '2'],
      });

      expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
    });
  });
});
