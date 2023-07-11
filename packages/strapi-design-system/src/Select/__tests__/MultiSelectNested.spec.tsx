import { render as renderRTL } from '@test/utils';

import { MultiSelectNested, MultiSelectNestedProps } from '../MultiSelectNested';

const defaultOpts: MultiSelectNestedProps['options'] = [
  {
    label: 'Group 1',
    children: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
    ],
  },
  {
    value: 'Option 3',
    label: 'Option 3',
  },
];

const Component = (props: Partial<Omit<MultiSelectNestedProps, 'aria-label'>>) => (
  <MultiSelectNested options={defaultOpts} placeholder="Choose an option" label="Choose" {...props} />
);

const render = (props: Partial<MultiSelectNestedProps> = {}) => renderRTL(<Component {...props} />);

describe('MultiSelectNested', () => {
  it('should render the select and the options', async () => {
    const { getByRole, getByText, user } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await user.click(getByRole('combobox'));

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('should select an option when only one is pressed', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('combobox'));

    await user.click(getByRole('option', { name: 'Option 3' }));

    expect(getByRole('option', { name: 'Option 3' })).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 3');
  });

  it('should select all the options in the group if said group item is clicked', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('combobox'));

    await user.click(getByRole('option', { name: 'Group 1' }));

    expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
  });
});
