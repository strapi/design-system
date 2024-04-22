import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Field, FieldHint, FieldError, Button } from '@strapi/design-system';
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
  render: ({ error, label }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <Checkbox id="checkbox">{label}</Checkbox>
        <FieldError />
        <FieldHint />
        <Button variant="danger-light" onClick={() => updateArgs({ error: !error })}>
          {`${error ? 'Hide' : 'Show'} the error state`}
        </Button>
      </Field>
    );
  },
  args: {
    ...Disabled.args,
    error: false,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          error={error ? 'Error' : undefined}
          hint={error ? undefined : 'Description line lorem ipsum'}
        >
          <Checkbox id="checkbox">{label}</Checkbox>
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
};
