import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  CreatableCombobox,
  ComboboxOption,
  Flex,
  Button,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';

const meta: Meta<typeof Combobox> = {
  title: 'Design System/Components/Combobox',
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Basic = {
  render: () => {
    const [error, toggleError] = React.useState<string>();
    const [disabled, toggleDisabled] = React.useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <Combobox placeholder="My favourite fruit is..." label="Fruits" error={error} disabled={disabled}>
          <ComboboxOption value="apple">Apple</ComboboxOption>
          <ComboboxOption value="avocado">Avocado</ComboboxOption>
          <ComboboxOption value="banana">Banana</ComboboxOption>
          <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
          <ComboboxOption value="mango">Mango</ComboboxOption>
          <ComboboxOption value="orange">Orange</ComboboxOption>
          <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
        </Combobox>
        <Flex gap={2} justifyContent="center">
          <Button
            variant="danger-light"
            onClick={() => toggleError((s) => (s ? undefined : 'Oh no, the fruits have gone mouldy!'))}
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

  name: 'basic',
} satisfies Story;

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <Combobox placeholder="My favourite fruit is..." value={value} onChange={setValue} onClear={() => setValue('')}>
        <ComboboxOption value="apple">Apple</ComboboxOption>
        <ComboboxOption value="avocado">Avocado</ComboboxOption>
        <ComboboxOption value="banana">Banana</ComboboxOption>
        <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
        <ComboboxOption value="mango">Mango</ComboboxOption>
        <ComboboxOption value="orange">Orange</ComboboxOption>
        <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
      </Combobox>
    );
  },

  name: 'controlled',
} satisfies Story;

export const Loading = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLoadMore = () => setIsLoading(true);

    React.useEffect(() => {
      if (isLoading) {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, [isLoading]);

    return (
      <Combobox placeholder="My favourite fruit is..." loading={isLoading} onLoadMore={handleLoadMore} hasMoreItems>
        <ComboboxOption value="apple">Apple</ComboboxOption>
        <ComboboxOption value="avocado">Avocado</ComboboxOption>
        <ComboboxOption value="banana">Banana</ComboboxOption>
        <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
        <ComboboxOption value="mango">Mango</ComboboxOption>
        <ComboboxOption value="orange">Orange</ComboboxOption>
        <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
      </Combobox>
    );
  },

  name: 'loading',
} satisfies Story;

export const Creatable = {
  render: () => {
    const [value, setValue] = React.useState('');

    const [options, setOptions] = React.useState([
      {
        name: 'Apple',
        value: 'apple',
      },
      {
        name: 'Avocado',
        value: 'avocado',
      },
      {
        name: 'Banana',
        value: 'banana',
      },
      {
        name: 'Kiwi',
        value: 'kiwi',
      },
      {
        name: 'Mango',
        value: 'mango',
      },
      {
        name: 'Orange',
        value: 'orange',
      },
      {
        name: 'Strawberry',
        value: 'strawberry',
      },
    ]);

    const onCreateOption = (value) => {
      setOptions((opt) => [
        ...opt,
        {
          name: value,
          value,
        },
      ]);

      setValue(value);
    };

    return (
      <CreatableCombobox
        aria-describedby="creatable component description"
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </CreatableCombobox>
    );
  },

  name: 'creatable',
} satisfies Story;

export const Autocomplete = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [autocompleteMode, setAutocompleteMode] = React.useState('both');

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <Combobox
          placeholder="My favourite fruit is..."
          value={value}
          onChange={setValue}
          autocomplete={autocompleteMode}
          onClear={() => setValue('')}
        >
          <ComboboxOption value="apple">Apple</ComboboxOption>
          <ComboboxOption value="avocado">Avocado</ComboboxOption>
          <ComboboxOption value="banana">Banana</ComboboxOption>
          <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
          <ComboboxOption value="mango">Mango</ComboboxOption>
          <ComboboxOption value="orange">Orange</ComboboxOption>
          <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
        </Combobox>
        <SingleSelect label="Autocomplete Mode" value={autocompleteMode} onValueChange={setAutocompleteMode}>
          <SingleSelectOption value="both">both</SingleSelectOption>
          <SingleSelectOption value="list">list</SingleSelectOption>
          <SingleSelectOption value="none">none</SingleSelectOption>
        </SingleSelect>
      </Flex>
    );
  },

  name: 'autocomplete',
} satisfies Story;
