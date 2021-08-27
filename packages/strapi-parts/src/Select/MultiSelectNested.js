import React, { useState } from 'react';
import { Stack } from '../Stack';
import { Option } from './Option';
import { Select } from './Select';
import { OptGroup } from './OptGroup';

const MultiSelectNested = () => {
  const food = [
    {
      label: 'Pizza',
      children: [
        {
          label: 'Peperroni',
          value: 'peperroni',
        },
        {
          label: 'Marguerita',
          value: 'marguerita',
        },
      ],
    },
    {
      label: 'Hamburger',
      value: 'hamburger',
    },
    {
      label: 'Bagel',
      value: 'bagel',
    },
    {
      label: 'Pasta',
      children: [
        {
          label: 'Tartuffo',
          value: 'tartuffo',
        },
        {
          label: 'Carbonara',
          value: 'carbonara',
        },
      ],
    },
  ];

  const [values, setValues] = useState(['peperroni', 'marguerita', 'bagel', 'tartuffo']);

  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();

  return (
    <Stack size={11}>
      <h2>Current value is {values.join(', ')}</h2>
      <Select
        id="select1"
        label="Choose your meal"
        placeholder="Your example"
        onClear={() => setValues([])}
        hint="Description line"
        clearLabel="Clear the meal"
        error={error}
        onChange={setValues}
        disabled={disabled}
        customizeContent={(values) => `${values.length} currently selected`}
        value={values}
        multi
      >
        {food.map(({ label, value, children }) =>
          children ? (
            <OptGroup key={label} label={label}>
              {children?.map((child) => (
                <Option key={child.value} value={child.value}>
                  {child.label}
                </Option>
              ))}
            </OptGroup>
          ) : (
            <Option key={value} value={value}>
              {label}
            </Option>
          ),
        )}
      </Select>
      <button onClick={() => toggleError((s) => (s ? undefined : 'An error occured'))}>Show the error state</button>
      <button onClick={() => toggleDisabled((s) => !s)}>Show the disabled state</button>
    </Stack>
  );
};

export default MultiSelectNested;
