import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { darkTheme } from '../../themes';
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

const Component = (props: Partial<MultiSelectNestedProps>) => (
  <MultiSelectNested options={defaultOpts} placeholder="Choose an option" label="Choose" {...props} />
);

const render = (props: Partial<MultiSelectNestedProps> = {}) => ({
  user: userEvent.setup(),
  ...renderRTL(<Component {...props} />, {
    wrapper: ({ children }) => <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>,
  }),
});

describe('MultiSelectNested', () => {
  it('should render the select and the options', async () => {
    const { getByRole, getByText } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await userEvent.click(getByRole('combobox'));

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('should select an option when only one is pressed', async () => {
    const { getByRole } = render();

    await userEvent.click(getByRole('combobox'));

    await userEvent.click(getByRole('option', { name: 'Option 3' }));

    expect(getByRole('option', { name: 'Option 3' })).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 3');
  });

  it('should select all the options in the group if said group item is clicked', async () => {
    const { getByRole } = render();

    await userEvent.click(getByRole('combobox'));

    await userEvent.click(getByRole('option', { name: 'Group 1' }));

    expect(getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent('Option 1Option 2');
  });
});
