import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { BaseCheckbox } from '@strapi/design-system';

const meta: Meta<typeof BaseCheckbox> = {
  title: 'Design System/Technical Components/BaseCheckbox',
  component: BaseCheckbox,
};

export default meta;

type Story = StoryObj<typeof BaseCheckbox>;

export const Base = {
  render: () => {
    const [val, setValue] = useState(false);

    return (
      <BaseCheckbox
        aria-label="Simple checkbox"
        name="default"
        onValueChange={(value: boolean) => setValue(value)}
        value={val}
      />
    );
  },

  name: 'base',
} satisfies Story;

export const Indeterminate = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState([true, false]);
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
      <ul>
        <li>
          <BaseCheckbox
            id="parent"
            name="parent"
            indeterminate={isIndeterminate}
            onValueChange={(value: boolean) => setCheckedItems([value, value])}
            value={allChecked}
          />
          <label htmlFor="parent">Parent</label>
        </li>
        <li>
          <ul>
            <li>
              <BaseCheckbox
                id="child1"
                name="child1"
                onValueChange={(value: boolean) => setCheckedItems([value, checkedItems[1]])}
                value={checkedItems[0]}
              />
              <label htmlFor="child1">Child 1</label>
            </li>
            <li>
              <BaseCheckbox
                id="child2"
                name="child2"
                onValueChange={(value: boolean) => setCheckedItems([checkedItems[0], value])}
                value={checkedItems[1]}
              />
              <label htmlFor="child2">Child 2</label>
            </li>
          </ul>
        </li>
      </ul>
    );
  },

  name: 'indeterminate',
} satisfies Story;

export const Disabled = {
  render: () => {
    return (
      <>
        <BaseCheckbox name="disabled-unchecked" disabled aria-label="First checkbox" />
        <BaseCheckbox name="disabled-indeterminate" disabled indeterminate aria-label="Second checkbox" />
        <BaseCheckbox name="disabled-checked" disabled value aria-label="Last checkbox" />
      </>
    );
  },

  name: 'disabled',
} satisfies Story;
