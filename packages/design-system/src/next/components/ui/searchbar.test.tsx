import * as React from 'react';

import { render } from '@test/utils';

import { SearchForm, Searchbar, type SearchbarProps } from './searchbar';

const Controlled = (props: Partial<SearchbarProps>) => {
  const [value, setValue] = React.useState(props.value ?? '');

  return (
    <SearchForm>
      <Searchbar
        name="search"
        clearLabel="Clear the search"
        {...props}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onClear={(event) => {
          setValue('');
          props.onClear?.(event);
        }}
      >
        Search entries
      </Searchbar>
    </SearchForm>
  );
};

describe('Searchbar', () => {
  it('renders a search box in a search landmark, labelled by its children', () => {
    const { getByRole } = render(<Controlled />);

    expect(getByRole('search')).toBeInTheDocument();
    expect(getByRole('searchbox', { name: 'Search entries' })).toHaveAttribute('name', 'search');
  });

  it('shows the clear button only when there is a value', async () => {
    const onClear = jest.fn();
    const { getByRole, queryByRole, user } = render(<Controlled onClear={onClear} />);

    expect(queryByRole('button', { name: 'Clear the search' })).not.toBeInTheDocument();

    await user.type(getByRole('searchbox'), 'abc');
    await user.click(getByRole('button', { name: 'Clear the search' }));

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(getByRole('searchbox')).toHaveValue('');
    expect(getByRole('searchbox')).toHaveFocus();
    expect(queryByRole('button', { name: 'Clear the search' })).not.toBeInTheDocument();
  });

  it('clears with the Escape key', async () => {
    const onClear = jest.fn();
    const { getByRole, user } = render(<Controlled onClear={onClear} />);

    await user.type(getByRole('searchbox'), 'abc{Escape}');

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(getByRole('searchbox')).toHaveValue('');
  });

  it('stops the propagation of key events', async () => {
    const onKeyDown = jest.fn();
    const { getByRole, user } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyDown={onKeyDown}>
        <Controlled />
      </div>,
    );

    await user.type(getByRole('searchbox'), 'a');

    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it('forwards its refs', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const formRef = React.createRef<HTMLFormElement>();
    const { getByRole } = render(
      <SearchForm ref={formRef}>
        <Searchbar ref={inputRef} name="search" onClear={() => {}}>
          Search
        </Searchbar>
      </SearchForm>,
    );

    expect(inputRef.current).toBe(getByRole('searchbox'));
    expect(formRef.current).toBe(getByRole('search'));
  });
});
