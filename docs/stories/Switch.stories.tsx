import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@strapi/design-system';

const meta: Meta<typeof Switch> = {
  title: 'Design System/Components/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Activated = {
  render: () => {
    const [activated, setActivated] = React.useState(true);

    return (
      <Switch
        label="Activate the microphone"
        selected={activated}
        onChange={() => setActivated((s) => !s)}
        visibleLabels
      />
    );
  },

  name: 'activated',
} satisfies Story;

export const NotActivated = {
  render: () => {
    const [activated, setActivated] = React.useState(false);

    return (
      <Switch
        label="Activate the microphone"
        selected={activated}
        onChange={() => setActivated((s) => !s)}
        visibleLabels
      />
    );
  },

  name: 'not-activated',
} satisfies Story;
