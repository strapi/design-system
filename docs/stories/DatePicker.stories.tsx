import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { DatePicker, Flex, Button } from '@strapi/design-system';

const meta: Meta<typeof DatePicker> = {
  title: 'Design System/Components/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Base = {
  render: () => {
    const [error, toggleError] = useState<string>();
    const [disabled, toggleDisabled] = useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <DatePicker label="Your birthday" error={error} disabled={disabled} />
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
    const [date, setDate] = useState<undefined | Date>(new Date('1990-01-01'));

    return (
      <DatePicker onChange={setDate} selectedDate={date} label="Your birthday" onClear={() => setDate(undefined)} />
    );
  },

  name: 'controlled',
} satisfies Story;

export const MinMaxDate = {
  render: () => {
    const [date, setDate] = useState();

    return (
      <DatePicker
        onChange={setDate}
        value={date}
        label="Favourite day of 2022"
        minDate={new Date('2022-01-01')}
        maxDate={new Date('2022-12-31')}
        onClear={() => setDate(undefined)}
      />
    );
  },

  name: 'min/max date',
} satisfies Story;

export const Locale = {
  render: () => {
    const [date, setDate] = useState();

    return (
      <DatePicker
        onChange={setDate}
        value={date}
        label="German date picker"
        locale="de-DE"
        onClear={() => setDate(undefined)}
      />
    );
  },

  name: 'locale',
} satisfies Story;

export const Sizing = {
  render: () => {
    const [size, setSize] = useState('S');

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <DatePicker required size={size} label={size === 'S' ? 'Small date picker' : 'Medium date picker'} />
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
