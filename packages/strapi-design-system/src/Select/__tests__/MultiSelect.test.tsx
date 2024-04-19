import { render as renderRTL } from '@test/utils';

import { MultiSelect, MultiSelectOption, MultiSelectOptionProps, MultiSelectProps } from '../MultiSelect';

const defaultOpts: MultiSelectOptionProps[] = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
  {
    value: 'Option 3',
    children: 'Option 3',
  },
];

const Component = (props: Partial<Omit<MultiSelectProps, 'aria-label'>>) => (
  <MultiSelect placeholder="Choose an option" label="Choose" {...props}>
    {defaultOpts.map((option) => (
      <MultiSelectOption key={option.value.toString()} value={option.value}>
        {option.children}
      </MultiSelectOption>
    ))}
  </MultiSelect>
);

const render = (props: Partial<MultiSelectProps> = {}) => renderRTL(<Component {...props} />);

describe('MultiSelect', () => {
  it('should render the select and the options', async () => {
    const { getByRole, user } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await user.click(getByRole('combobox'));

    expect(getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('should be accessible if I only pass an aria-label', () => {
    const { getByRole, queryByRole } = render({ 'aria-label': 'Choose', label: undefined });

    expect(queryByRole('label')).not.toBeInTheDocument();

    expect(getByRole('combobox', { name: 'Choose' })).toBeInTheDocument();
  });

  it('should be able to select multiple options in one go without the listbox dissapearing', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('combobox'));

    await user.click(getByRole('option', { name: 'Option 1' }));
    await user.click(getByRole('option', { name: 'Option 2' }));

    expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-checked', 'true');

    expect(getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
  });
});
