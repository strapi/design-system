import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Field, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Inputs/Checkbox',
  component: ({ label, ...props }) => {
    const [val, setValue] = React.useState(false);
    return (
      <Checkbox name="default" onValueChange={(value) => setValue(value)} value={val} {...props}>
        {label}
      </Checkbox>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Base = {
  name: 'base',
  args: {
    label: 'Label',
  },

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
    const [checkedItems, setCheckedItems] = React.useState([true, false]);
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
  render: () => {
    return (
      <ul>
        <Field as="li" id="with_hint" hint="Description line lorem ipsum">
          <Checkbox id="child1" name="child1">
            Child 1
          </Checkbox>
          <FieldHint />
        </Field>
        <Field as="li" id="with_error" error="Error">
          <Checkbox id="child2" name="child2">
            Child 2
          </Checkbox>
          <FieldError />
        </Field>
      </ul>
    );
  },

  name: 'with field',

  parameters: {
    docs: {
      source: {
        code: outdent`
    import * as React from 'react';
    import { Checkbox, Field, FieldHint, FieldError } from '@strapi/design-system';

    export const WithField = () => {
      const [checkedItems, setCheckedItems] = React.useState([true, false]);

      return (
        <ul>
        <Field as="li" id="with_hint" hint="Description line lorem ipsum">
          <Checkbox id="child1" name="child1">
            Child 1
          </Checkbox>
          <FieldHint />
        </Field>
        <Field as="li" id="with_error" error="Error">
          <Checkbox id="child2" name="child2">
            Child 2
          </Checkbox>
          <FieldError />
        </Field>
      </ul>
      );
    };
    `,
      },
    },
  },
} satisfies Story;
