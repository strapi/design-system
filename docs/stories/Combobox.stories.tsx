import { useState, useEffect } from 'react';

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
    const [error, toggleError] = useState<string>();
    const [disabled, toggleDisabled] = useState(false);

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
    const [value, setValue] = useState('');

    return (
      <Combobox
        placeholder="My favourite fruit is..."
        label="Fruits"
        value={value}
        onChange={setValue}
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
    );
  },

  name: 'controlled',
} satisfies Story;

export const Loading = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleLoadMore = () => setIsLoading(true);

    useEffect(() => {
      if (isLoading) {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, [isLoading]);

    return (
      <Combobox
        label="Async Fruits"
        placeholder="My favourite fruit is..."
        loading={isLoading}
        onLoadMore={handleLoadMore}
        hasMoreItems
      >
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
    const [value, setValue] = useState('');

    const [options, setOptions] = useState([
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
        label="Fruits"
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

type TAutocomplete = 'none' | 'list' | 'both' | { type: 'list'; filter: 'startsWith' | 'contains' };

export const Autocomplete = {
  render: () => {
    const [value, setValue] = useState('');
    const [autocompleteMode, setAutocompleteMode] = useState<TAutocomplete>('both');

    const handleChange = (value) => {
      if (value === 'list-contains') {
        setAutocompleteMode({ type: 'list', filter: 'contains' });
      } else setAutocompleteMode(value);
    };

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <Combobox
          placeholder="My favourite fruit is..."
          label="Fruits"
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
        <SingleSelect label="Autocomplete Mode" value={autocompleteMode} onValueChange={handleChange}>
          <SingleSelectOption value="both">both</SingleSelectOption>
          <SingleSelectOption value="list">list (filter: startsWith)</SingleSelectOption>
          <SingleSelectOption value="list-contains">list (filter: contains)</SingleSelectOption>
          <SingleSelectOption value="none">none</SingleSelectOption>
        </SingleSelect>
      </Flex>
    );
  },

  name: 'autocomplete',
} satisfies Story;
