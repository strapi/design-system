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
        name="content"
        error={content.length > 5 ? 'Content is too long' : undefined}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
    );
  },

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => (
    <TextInput placeholder="This is a content placeholder" name="content" value="Disabled ontent" disabled />
  ),

  name: 'disabled',
} satisfies Story;

export const SizeS = {
  render: () => <TextInput placeholder="This is a content placeholder" name="content" value="size S input" size="S" />,

  name: 'size S',
} satisfies Story;

//TODO: fix FieldInput to accept error prop without using Field wrapper
export const WithError = {
  render: () => (
    <TextInput placeholder="This is a content placeholder" name="content" error="Content is too long" value="content" />
  ),

  name: 'with error',
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
