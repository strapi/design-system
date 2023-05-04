import { Meta, StoryObj } from '@storybook/react';
import { JSONInput } from '@strapi/design-system';

const meta: Meta<typeof JSONInput> = {
  title: 'Design System/Components/JSONInput',
  component: JSONInput,
};

export default meta;

type Story = StoryObj<typeof JSONInput>;

export const Base = {
  render: () => (
    <JSONInput disabled value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'} />
  ),

  name: 'base',
} satisfies Story;

export const Editable = {
  render: () => (
    <JSONInput
      value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]'}
      label="JSON"
      hint="Description Text"
      minHeight="235px"
    />
  ),

  name: 'editable',
} satisfies Story;

export const WithError = {
  render: () => (
    <JSONInput
      value={'[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6,\n   }\n]'}
      disabled
      error="This does not match the JSON format"
    />
  ),

  name: 'withError',
} satisfies Story;
