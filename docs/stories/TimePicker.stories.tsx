import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Flex, Button } from '@strapi/design-system';

const meta: Meta<typeof TimePicker> = {
  title: 'Design System/Components/TimePicker',
  component: TimePicker,
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Base = {
  render: () => {
    const [error, toggleError] = React.useState<string>();
    const [disabled, toggleDisabled] = React.useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <TimePicker label="Lunchtime" error={error} disabled={disabled} />
        <Flex gap={2} justifyContent="center">
          <Button
            variant="danger-light"
            onClick={() => toggleError((s) => (s ? undefined : "That's not a lunchtime!"))}
          >
            {`${error ? 'Hide' : 'Show'} the error state`}
          </Button>
          <Button variant="tertiary" onClick={() => toggleDisabled((s) => !s)}>
            {`${disabled ? 'Hide' : 'Show'} the disabled state`}
          </Button>
        </Flex>
      </Flex>
    );
  },

  name: 'base',
} satisfies Story;

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState();

    return <TimePicker label="Lunchtime" onClear={() => setValue(undefined)} onChange={setValue} value={value} />;
  },

  name: 'controlled',
} satisfies Story;

export const Steps = {
  render: () => {
    const [value, setValue] = React.useState();
    return <TimePicker step={60} label="Lunch hour" onChange={setValue} value={value} />;
  },

  name: 'steps',
} satisfies Story;

export const Sizing = {
  render: () => {
    const [size, setSize] = React.useState('S');

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <TimePicker required size={size} label={size === 'S' ? 'Small date picker' : 'Medium date picker'} />
        <Flex justifyContent="center">
          <Button variant="primary" onClick={() => setSize((s) => (s === 'S' ? 'M' : 'S'))}>
            {size === 'S' ? `Show medium size` : `Show small size`}
          </Button>
        </Flex>
      </Flex>
    );
  },

  name: 'sizing',
} satisfies Story;
