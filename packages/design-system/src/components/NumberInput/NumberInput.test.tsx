import * as React from 'react';

import { render, screen } from '@test/utils';

import { NumberInput } from './NumberInput';

const ControlledNumberInput = ({ initialValue }: { initialValue?: number }) => {
  const [value, setValue] = React.useState<number | undefined>(initialValue);

  return (
    <>
      <NumberInput aria-label="number" value={value} onValueChange={setValue} />
      <button type="button" onClick={() => setValue(10)}>
        Set to 10
      </button>
    </>
  );
};

describe('NumberInput', () => {
  it('should render the formatted value', () => {
    render(<ControlledNumberInput initialValue={1000} />);

    expect(screen.getByRole('textbox')).toHaveValue('1,000');
  });

  it('should keep a partial value while the user is typing', async () => {
    const { user } = render(<ControlledNumberInput />);

    await user.type(screen.getByRole('textbox'), '-');
    expect(screen.getByRole('textbox')).toHaveValue('-');

    await user.type(screen.getByRole('textbox'), '1.');
    expect(screen.getByRole('textbox')).toHaveValue('-1.');

    await user.type(screen.getByRole('textbox'), '0');
    expect(screen.getByRole('textbox')).toHaveValue('-1.0');
  });

  it('should reflect a value changed from the outside after the user has typed', async () => {
    const { user } = render(<ControlledNumberInput initialValue={5} />);

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '3');
    expect(screen.getByRole('textbox')).toHaveValue('3');

    await user.click(screen.getByRole('button', { name: 'Set to 10' }));

    expect(screen.getByRole('textbox')).toHaveValue('10');
  });
});
