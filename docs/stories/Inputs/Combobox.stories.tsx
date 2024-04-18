import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  CreatableCombobox,
  ComboboxOption,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Field,
  FieldHint,
  FieldError,
} from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Combobox> = {
  title: 'Design System/Inputs/Combobox',
  component: ({ ...props }) => {
    const [value, setValue] = React.useState('');

    return (
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onClear={() => setValue('')}
        {...props}
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
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Basic = {
  name: 'basic',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Combobox
            placeholder="My favourite fruit is..."
            value={value}
            onChange={setValue}
            onClear={() => setValue('')}
            {...props}
          >
            <ComboboxOption value="apple">Apple</ComboboxOption>
            <ComboboxOption value="avocado">Avocado</ComboboxOption>
            <ComboboxOption value="banana">Banana</ComboboxOption>
            <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
            <ComboboxOption value="mango">Mango</ComboboxOption>
            <ComboboxOption value="orange">Orange</ComboboxOption>
            <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
          </Combobox>
        `,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Combobox
          placeholder="My favourite fruit is..."
          disabled
        >
          <ComboboxOption value="apple">Apple</ComboboxOption>
          <ComboboxOption value="avocado">Avocado</ComboboxOption>
          <ComboboxOption value="banana">Banana</ComboboxOption>
          <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
          <ComboboxOption value="mango">Mango</ComboboxOption>
          <ComboboxOption value="orange">Orange</ComboboxOption>
          <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
        </Combobox>
      `,
      },
    },
  },

  name: 'disabled',
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

type Autocomplete = 'none' | 'list' | 'both' | { type: 'list'; filter: 'startsWith' | 'contains' };

export const Autocomplete = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [mode, setMode] = React.useState('both');
    const [autocompleteMode, setAutocompleteMode] = React.useState<Autocomplete>('both');

    const handleChange = (value) => {
      setMode(value);
      if (value === 'list-contains') {
        setAutocompleteMode({ type: 'list', filter: 'contains' });
      } else setAutocompleteMode(value);
    };

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
        <SingleSelect label="Autocomplete Mode" value={mode} onValueChange={handleChange}>
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

export const WithField = {
  render: () => {
    return (
      <Flex direction="column" alignItems="stretch" gap={8}>
        <Field id="with_hint" hint="Description line lorem ipsum">
          <Combobox placeholder="My favourite fruit is...">
            <ComboboxOption value="apple">Apple</ComboboxOption>
            <ComboboxOption value="avocado">Avocado</ComboboxOption>
            <ComboboxOption value="banana">Banana</ComboboxOption>
            <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
            <ComboboxOption value="mango">Mango</ComboboxOption>
            <ComboboxOption value="orange">Orange</ComboboxOption>
            <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
          </Combobox>
          <FieldHint />
        </Field>
        <Field id="with_error" error="Error">
          <Combobox placeholder="My favourite fruit is..." error="error">
            <ComboboxOption value="apple">Apple</ComboboxOption>
            <ComboboxOption value="avocado">Avocado</ComboboxOption>
            <ComboboxOption value="banana">Banana</ComboboxOption>
            <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
            <ComboboxOption value="mango">Mango</ComboboxOption>
            <ComboboxOption value="orange">Orange</ComboboxOption>
            <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
          </Combobox>
          <FieldError />
        </Field>
      </Flex>
    );
  },

  name: 'With field',

  parameters: {
    docs: {
      source: {
        code: outdent`
    import { Combobox, ComboboxOption, Field, FieldHint, FieldError } from '@strapi/design-system';

    export const WithField = () => {
      return (
        <Flex direction="column" alignItems="stretch" gap={8}>
        <Field id="with_hint" hint="Description line lorem ipsum">
          <Combobox placeholder="My favourite fruit is...">
            <ComboboxOption value="apple">Apple</ComboboxOption>
            <ComboboxOption value="avocado">Avocado</ComboboxOption>
            <ComboboxOption value="banana">Banana</ComboboxOption>
            <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
            <ComboboxOption value="mango">Mango</ComboboxOption>
            <ComboboxOption value="orange">Orange</ComboboxOption>
            <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
          </Combobox>
          <FieldHint />
        </Field>
        <Field id="with_error" error="Error">
          <Combobox placeholder="My favourite fruit is..." error="error">
            <ComboboxOption value="apple">Apple</ComboboxOption>
            <ComboboxOption value="avocado">Avocado</ComboboxOption>
            <ComboboxOption value="banana">Banana</ComboboxOption>
            <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
            <ComboboxOption value="mango">Mango</ComboboxOption>
            <ComboboxOption value="orange">Orange</ComboboxOption>
            <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
          </Combobox>
          <FieldError />
        </Field>
      </Flex>
      );
    };
    `,
      },
    },
  },
} satisfies Story;
