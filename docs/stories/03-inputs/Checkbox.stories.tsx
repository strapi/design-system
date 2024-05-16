import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, Checkbox, Flex } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <Flex justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  args: {
    children: 'Remember me',
    onCheckedChange: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return <Checkbox {...args} />;
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Base = {
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
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
  },
  args: {
    checked: 'indeterminate',
  },
  name: 'indeterminate',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  name: 'disabled',
  parameters: {
    docs: {
      source: {
        code: '<Checkbox disabled>Remember me</Checkbox>',
      },
    },
  },
} satisfies Story;

export const WithoutLabel = {
  args: {
    children: null,
    ['aria-label']: 'Select row 1',
  },
  name: 'without label',
} satisfies Story;

export const WithNameAndValue = {
  args: {
    name: 'rememberMe',
    value: 'yes',
    onSubmit: fn(),
  },
  render: ({ onSubmit, ...args }) => {
    return (
      <Flex
        tag="form"
        direction="column"
        gap={4}
        alignItems="flex-start"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) {
            const data = new FormData(e.target as HTMLFormElement);
            // @ts-expect-error – We're demonstrating `value` and `name` here.
            onSubmit(data.get('rememberMe'));
          }
        }}
      >
        <Checkbox {...args} />
        <Button type="submit">Submit</Button>
      </Flex>
    );
  },
  name: 'with name and value',
} satisfies Story;
