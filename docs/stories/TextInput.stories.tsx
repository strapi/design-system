import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@strapi/design-system';
import { Information } from '@strapi/icons';

const meta: Meta<typeof TextInput> = {
  title: 'Design System/Components/TextInput',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Base = {
  render: () => {
    const [content, setContent] = React.useState('');

    return (
      <TextInput
        placeholder="This is a content placeholder"
        label="Content"
        name="content"
        hint="Description line"
        error={content.length > 5 ? 'Content is too long' : undefined}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        labelAction={<Information aria-hidden />}
      />
    );
  },

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => (
    <TextInput
      placeholder="This is a content placeholder"
      label="Content"
      name="content"
      hint="Description line"
      value="Disabled ontent"
      disabled
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'disabled',
} satisfies Story;

export const SizeS = {
  render: () => (
    <TextInput
      placeholder="This is a content placeholder"
      label="Content"
      name="content"
      hint="Description line"
      value="size S input"
      size="S"
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'size S',
} satisfies Story;

export const WithError = {
  render: () => (
    <TextInput
      placeholder="This is a content placeholder"
      label="Content"
      name="content"
      hint="Description line"
      error="Content is too long"
      value="content"
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'with error',
} satisfies Story;

export const Required = {
  render: () => (
    <TextInput
      placeholder="This is a content placeholder"
      label="Content"
      name="content"
      hint="Description line"
      value="content"
      required
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'required',
} satisfies Story;

export const Password = {
  render: () => (
    <TextInput
      placeholder="This is a password placeholder"
      type="password"
      label="Password"
      name="password"
      hint="Description line"
      value="content"
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'password',
} satisfies Story;

export const WithoutLabel = {
  render: () => (
    <TextInput
      placeholder="This is a password placeholder"
      type="password"
      aria-label="Password"
      name="password"
      hint="Description line"
      value="content"
      labelAction={<Information aria-hidden />}
    />
  ),

  name: 'withoutLabel',
} satisfies Story;
