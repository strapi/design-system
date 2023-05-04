import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { ToggleCheckbox } from '@strapi/design-system';

const meta: Meta<typeof ToggleCheckbox> = {
  title: 'Design System/Components/ToggleCheckbox',
  component: ToggleCheckbox,
};

export default meta;

type Story = StoryObj<typeof ToggleCheckbox>;

export const Base = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <ToggleCheckbox onLabel="True" offLabel="False" checked={checked} onChange={() => setChecked((prev) => !prev)}>
        The field is required?
      </ToggleCheckbox>
    );
  },

  name: 'base',
} satisfies Story;

export const SizeS = {
  render: () => (
    <ToggleCheckbox size="S" onLabel="True" offLabel="False" checked={false}>
      The field is required?
    </ToggleCheckbox>
  ),

  name: 'size S',
} satisfies Story;

export const NullValue = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <ToggleCheckbox onLabel="True" offLabel="False" checked={checked} onChange={() => setChecked((prev) => !prev)}>
        The field is required?
      </ToggleCheckbox>
    );
  },

  name: 'null-value',
} satisfies Story;

export const Disabled = {
  render: () => (
    <ToggleCheckbox disabled onLabel="True" offLabel="False" checked>
      The field is required?
    </ToggleCheckbox>
  ),
  name: 'disabled',
} satisfies Story;
