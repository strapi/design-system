import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, Flex, Button } from '@strapi/design-system';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Design System/Components/DateTimePicker',
  component: DateTimePicker,
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

export const Base = {
  render: () => {
    const [error, toggleError] = useState<string>();
    const [disabled, toggleDisabled] = useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <DateTimePicker label="Publish at" locale="en-GB" error={error} disabled={disabled} />
        <Flex gap={2} justifyContent="center">
          <Button variant="danger-light" onClick={() => toggleError((s) => (s ? undefined : "That's not a birthday!"))}>
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
    const [value, setValue] = useState();

    return (
      <DateTimePicker
        label="Publish at"
        locale="en-GB"
        value={value}
        onChange={setValue}
        onClear={() => setValue(undefined)}
      />
    );
  },

  name: 'controlled',
} satisfies Story;

export const InitialData = {
  render: () => {
    return <DateTimePicker label="Publish at" initialDate={new Date('1994-12-18T15:00:00.000Z')} />;
  },

  name: 'initial data',
} satisfies Story;
