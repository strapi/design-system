import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Field, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

const Template: Story = {
  render: ({ children, checked, ...props }) => {
    const [, updateArgs] = useArgs();

    const handleChange = () => {
      updateArgs({ checked: !checked });
    };

    return (
      <Checkbox {...props} value={checked} onChange={handleChange}>
        {children}
      </Checkbox>
    );
  },
};

export const Base = {
  ...Template,
  args: {
    children: 'Label',
    checked: false,
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Checkbox value={checked} onChange={handleChange}>
          {label}
        </Checkbox>`,
      },
    },
  },
  name: 'base',
};

export const CheckboxGroup = {
  render: () => {
    const [fruitsChecked, setFruitsChecked] = React.useState([true, false]);
    const [veggiesChecked, setVeggiesChecked] = React.useState([true, true]);
    const [sweetsChecked, setSweetsChecked] = React.useState([false, false]);
    const allFruitsChecked = fruitsChecked.every(Boolean);
    const allVeggiesChecked = veggiesChecked.every(Boolean);
    const allSweetsChecked = sweetsChecked.every(Boolean);
    const isFruitsIndeterminate = fruitsChecked.some(Boolean) && !allFruitsChecked;
    const isVeggiesIndeterminate = veggiesChecked.some(Boolean) && !allVeggiesChecked;
    const isSweetsIndeterminate = sweetsChecked.some(Boolean) && !allSweetsChecked;

    return (
      <ul>
        <li>
          <Checkbox
            id="fruits"
            name="fruits"
            indeterminate={isFruitsIndeterminate}
            onValueChange={(value) => setFruitsChecked([value, value])}
            value={allFruitsChecked}
          >
            Fruits
          </Checkbox>
        </li>
        <li>
          <ul style={{ paddingLeft: '24px' }}>
            <li>
              <Checkbox
                id="apple"
                name="apple"
                onValueChange={(value) => setFruitsChecked([value, fruitsChecked[1]])}
                value={fruitsChecked[0]}
              >
                Apple
              </Checkbox>
            </li>
            <li>
              <Checkbox
                id="banana"
                name="banana"
                onValueChange={(value) => setFruitsChecked([fruitsChecked[0], value])}
                value={fruitsChecked[1]}
              >
                Banana
              </Checkbox>
            </li>
          </ul>
        </li>
        <li>
          <Checkbox
            id="vegetables"
            name="vegetables"
            indeterminate={isVeggiesIndeterminate}
            onValueChange={(value) => setVeggiesChecked([value, value])}
            value={allVeggiesChecked}
          >
            Vegetables
          </Checkbox>
        </li>
        <li>
          <ul style={{ paddingLeft: '24px' }}>
            <li>
              <Checkbox
                id="beans"
                name="beans"
                onValueChange={(value) => setVeggiesChecked([value, veggiesChecked[1]])}
                value={veggiesChecked[0]}
              >
                Beans
              </Checkbox>
            </li>
            <li>
              <Checkbox
                id="pumpkin"
                name="pumpkin"
                onValueChange={(value) => setVeggiesChecked([veggiesChecked[0], value])}
                value={veggiesChecked[1]}
              >
                Pumpkin
              </Checkbox>
            </li>
          </ul>
        </li>
        <li>
          <Checkbox
            id="sweets"
            name="sweets"
            indeterminate={isSweetsIndeterminate}
            onValueChange={(value) => setSweetsChecked([value, value])}
            value={allSweetsChecked}
          >
            Sweets
          </Checkbox>
        </li>
        <li>
          <ul style={{ paddingLeft: '24px' }}>
            <li>
              <Checkbox
                id="chocolate"
                name="chocolate"
                onValueChange={(value) => setSweetsChecked([value, sweetsChecked[1]])}
                value={sweetsChecked[0]}
              >
                Chocolate
              </Checkbox>
            </li>
            <li>
              <Checkbox
                id="candy"
                name="candy"
                onValueChange={(value) => setSweetsChecked([sweetsChecked[0], value])}
                value={sweetsChecked[1]}
              >
                Candy
              </Checkbox>
            </li>
          </ul>
        </li>
      </ul>
    );
  },

  name: 'checkbox group',
} satisfies Story;

export const Disabled = {
  ...Template,
  args: {
    ...Base.args,
    disabled: true,
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

export const WithField = {
  render: ({ checked, error, hint, children }) => {
    const [, updateArgs] = useArgs();

    const handleChange = () => {
      updateArgs({ checked: !checked });
    };

    return (
      <Field id="with_field" error={error} hint={hint}>
        <Checkbox value={checked} onChange={handleChange}>
          {children}
        </Checkbox>
        <FieldError />
        <FieldHint />
      </Field>
    );
  },
  args: {
    ...Base.args,
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field id="with_field" error={error} hint={hint}>
          <Checkbox value={checked} onChange={handleChange}>
            {children}
          </Checkbox>
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },
  name: 'with field',
};
