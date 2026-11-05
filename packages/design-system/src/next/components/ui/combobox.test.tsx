import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from './combobox';

const FRUITS = ['Apple', 'Banana', 'Cherry'];

const Example = ({ onValueChange }: { onValueChange: (value: string | null) => void }) => (
  <Combobox items={FRUITS} onValueChange={onValueChange}>
    <ComboboxInput aria-label="Fruit" placeholder="Pick a fruit" />
    <ComboboxTrigger aria-label="Open" />
    <ComboboxContent>
      <ComboboxEmpty>No fruit found</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
);

describe('Combobox', () => {
  it('opens and selects an item', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(<Example onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    await user.click(await screen.findByRole('option', { name: 'Banana' }));

    expect(onValueChange).toHaveBeenCalledWith('Banana', expect.anything());
  });

  it('filters the list from the input', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(<Example onValueChange={onValueChange} />);

    await user.type(screen.getByLabelText('Fruit'), 'Cher');

    expect(await screen.findByRole('option', { name: 'Cherry' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
  });
});
