import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { darkTheme } from '../../themes';
import { MultiSelect, MultiSelectOption, MultiSelectOptionProps, MultiSelectProps } from '../MultiSelect';

const defaultOpts: MultiSelectOptionProps[] = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
  {
    value: 'Option 3',
    children: 'Option 3',
  },
];

const Component = (props: Partial<MultiSelectProps>) => (
  <MultiSelect placeholder="Choose an option" label="Choose" {...props}>
    {defaultOpts.map((option) => (
      <MultiSelectOption key={option.value.toString()} value={option.value}>
        {option.children}
      </MultiSelectOption>
    ))}
  </MultiSelect>
);

const render = (props: Partial<MultiSelectProps> = {}) => ({
  user: userEvent.setup(),
  ...renderRTL(<Component {...props} />, {
    wrapper: ({ children }) => <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>,
  }),
});

describe('MultiSelect', () => {
  it('should render the select and the options', async () => {
    const { getByRole } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await userEvent.click(getByRole('combobox'));

    expect(getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('should be able to select multiple options in one go without the listbox dissapearing', async () => {
    const { getByRole } = render();

    await userEvent.click(getByRole('combobox'));

    await userEvent.click(getByRole('option', { name: 'Option 1' }));
    await userEvent.click(getByRole('option', { name: 'Option 2' }));

    expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-checked', 'true');

    expect(getByRole('listbox')).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
  });
});
