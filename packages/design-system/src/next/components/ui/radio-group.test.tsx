import * as React from 'react';

import { render } from '@test/utils';

import { RadioGroup, RadioGroupItem } from './radio-group';

/**
 * Base UI forwards a click to its hidden input as a `PointerEvent`. The mock in `test/env-setup.js` extends
 * `Event`, and jsdom only toggles a checkbox for a `MouseEvent`, so these tests use a `MouseEvent` instead
 */
const OriginalPointerEvent = window.PointerEvent;

beforeAll(() => {
  window.PointerEvent = class extends MouseEvent {} as typeof PointerEvent;
});

afterAll(() => {
  window.PointerEvent = OriginalPointerEvent;
});

describe('RadioGroup', () => {
  it('selects the radio of the defaultValue', () => {
    const { getByRole } = render(
      <RadioGroup defaultValue="pizza" aria-label="Food">
        <RadioGroupItem value="pizza">Pizza</RadioGroupItem>
        <RadioGroupItem value="bagel">Bagel</RadioGroupItem>
      </RadioGroup>,
    );

    expect(getByRole('radiogroup', { name: 'Food' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Pizza' })).toBeChecked();
    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
  });

  it('keeps every radio unselected without a value', () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="pizza">Pizza</RadioGroupItem>
        <RadioGroupItem value="bagel">Bagel</RadioGroupItem>
      </RadioGroup>,
    );

    expect(getByRole('radio', { name: 'Pizza' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
  });

  it('calls onValueChange when a radio or its label is clicked', async () => {
    const onValueChange = jest.fn();
    const { getByRole, getByText, user } = render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="pizza">Pizza</RadioGroupItem>
        <RadioGroupItem value="bagel">Bagel</RadioGroupItem>
      </RadioGroup>,
    );

    await user.click(getByRole('radio', { name: 'Pizza' }));

    expect(onValueChange).toHaveBeenLastCalledWith('pizza', expect.anything());

    await user.click(getByText('Bagel'));

    expect(onValueChange).toHaveBeenLastCalledWith('bagel', expect.anything());
  });

  it('moves the selection with the arrow keys', async () => {
    const { getByRole, user } = render(
      <RadioGroup defaultValue="pizza">
        <RadioGroupItem value="pizza">Pizza</RadioGroupItem>
        <RadioGroupItem value="bagel">Bagel</RadioGroupItem>
      </RadioGroup>,
    );

    await user.tab();
    await user.keyboard('{ArrowDown}');

    expect(getByRole('radio', { name: 'Bagel' })).toBeChecked();
    expect(getByRole('radio', { name: 'Bagel' })).toHaveFocus();
  });

  it('forwards its refs', () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLElement>();
    const { getByRole } = render(
      <RadioGroup ref={groupRef}>
        <RadioGroupItem ref={itemRef} value="pizza">
          Pizza
        </RadioGroupItem>
      </RadioGroup>,
    );

    expect(groupRef.current).toBe(getByRole('radiogroup'));
    expect(itemRef.current).toBe(getByRole('radio'));
  });
});
