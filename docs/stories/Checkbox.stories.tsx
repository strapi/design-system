import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@strapi/design-system';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Base = {
  render: () => {
    const [val, setValue] = useState(false);
    return (
      <Checkbox name="default" onValueChange={(value) => setValue(value)} value={val}>
        Label
      </Checkbox>
    );
  },

  name: 'base',

  parameters: {
    docs: {
      source: {
        code: '<Checkbox>Label</Checkbox>',
      },
    },
  },
} satisfies Story;

export const Indeterminate = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState([true, false]);
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
      <ul>
        <li>
          <Checkbox
            id="parent"
            name="parent"
            indeterminate={isIndeterminate}
            onValueChange={(value) => setCheckedItems([value, value])}
            value={allChecked}
          >
            Parent
          </Checkbox>
        </li>
        <li>
          <ul>
            <li>
              <Checkbox
                id="child1"
                name="child1"
                onValueChange={(value) => setCheckedItems([value, checkedItems[1]])}
                value={checkedItems[0]}
              >
                Child 1
              </Checkbox>
            </li>
            <li>
              <Checkbox
                id="child2"
                name="child2"
                onValueChange={(value) => setCheckedItems([checkedItems[0], value])}
                value={checkedItems[1]}
              >
                Child 2
              </Checkbox>
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
    const [val, setValue] = useState(false);

    return (
      <Checkbox disabled name="default" onValueChange={(value) => setValue(value)} value={val}>
        Label
      </Checkbox>
    );
  },

  name: 'disabled',

  parameters: {
    docs: {
      source: {
        code: '<Checkbox disabled>Label</Checkbox>',
      },
    },
  },
} satisfies Story;

export const Hint = {
  render: () => {
    const [val, setValue] = useState(false);

    return (
      <Checkbox
        hint="Description line lorem ipsum"
        name="default"
        onValueChange={(value) => setValue(value)}
        value={val}
      >
        Label
      </Checkbox>
    );
  },

  name: 'hint',

  parameters: {
    docs: {
      source: {
        code: '<Checkbox hint="Description line lorem ipsum">Label</Checkbox>',
      },
    },
  },
} satisfies Story;

export const Error = {
  render: () => {
    const [val, setValue] = useState(false);

    return (
      <Checkbox
        error="Description line lorem ipsum"
        name="default"
        onValueChange={(value) => setValue(value)}
        value={val}
      >
        Label
      </Checkbox>
    );
  },

  name: 'error',

  parameters: {
    docs: {
      source: {
        code: '<Checkbox error="Description line lorem ipsum">Label</Checkbox>',
      },
    },
  },
} satisfies Story;
