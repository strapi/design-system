import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioGroup, Radio } from '..';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Radio/RadioGroup', () => {
  it('selects a Radio button when a value is passed in to RadioGroup', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ThemeProvider theme={lightTheme}>
        <p id="food">Food choices</p>
        <RadioGroup labelledBy="food" onChange={onChangeMock} value="pizza" name="meal">
          <Radio value="pizza">Pizza</Radio>
          <Radio value="bagel">Bagel</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Pizza' })).toBeChecked();
  });

  it('keeps all radio buttons unselected when value passed into RadioGroup is empty', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ThemeProvider theme={lightTheme}>
        <p id="food">Food choices</p>
        <RadioGroup labelledBy="food" onChange={onChangeMock} value="" name="meal">
          <Radio value="pizza">Pizza</Radio>
          <Radio value="bagel">Bagel</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Pizza' })).not.toBeChecked();
  });

  it('calls onChange prop when Radio button is clicked', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ThemeProvider theme={lightTheme}>
        <p id="food">Food choices</p>
        <RadioGroup labelledBy="food" onChange={onChangeMock} value="" name="meal">
          <Radio value="pizza">Pizza</Radio>
          <Radio value="bagel">Bagel</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    fireEvent.click(getByRole('radio', { name: 'Pizza' }));

    expect(onChangeMock.mock.calls[0][0].target.value).toBe('pizza');
  });
});
