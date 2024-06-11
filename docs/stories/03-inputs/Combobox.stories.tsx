import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxOption, Field } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof Combobox> = {
  title: 'Inputs/Combobox',
  component: Combobox,
  args: {
    disabled: false,
    placeholder: 'My favourite fruit is...',
    size: 'M',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
  },
  render: ({ ...props }) => {
    return (
      <Combobox {...props}>
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
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
            <Combobox {...props}>
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
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Combobox {...props} disabled>
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

export const Size = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Combobox {...props} size="S">
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
  name: 'small size',
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
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Combobox {...props} loading>
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
  name: 'loading',
} satisfies Story;

export const Creatable = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('');

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

    const onCreateOption = (value: string) => {
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
      <Combobox
        aria-describedby="creatable component description"
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },

  name: 'creatable',
} satisfies Story;

type Autocomplete = 'none' | 'list' | 'both' | { type: 'list'; filter: 'startsWith' | 'contains' };

export const Autocomplete = {
  args: {
    autocompleteMode: 'both' as Autocomplete,
  },
  argTypes: {
    autocompleteMode: { type: 'select', options: ['none', 'list', 'both', 'list-contains'] },
  },

  render: ({ autocompleteMode: mode, ...props }) => {
    const [value, setValue] = React.useState<string | undefined>('');
    const [autocompleteMode, setAutocompleteMode] = React.useState<Autocomplete>(mode);

    React.useEffect(() => {
      if (mode === 'list-contains') {
        setAutocompleteMode({ type: 'list', filter: 'contains' });
      } else setAutocompleteMode(mode);
    }, [mode]);

    return (
      <Combobox
        value={value}
        onChange={setValue}
        autocomplete={autocompleteMode}
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

  name: 'autocomplete',
};

export const WithField = {
  args: {
    label: 'Fruits',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ error, hint, label, ...props }) => {
    const [value, setValue] = React.useState<string | undefined>('');

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <Combobox value={value} onChange={setValue} onClear={() => setValue('')} {...props}>
          <ComboboxOption value="apple">Apple</ComboboxOption>
          <ComboboxOption value="avocado">Avocado</ComboboxOption>
          <ComboboxOption value="banana">Banana</ComboboxOption>
          <ComboboxOption value="kiwi">Kiwi</ComboboxOption>
          <ComboboxOption value="mango">Mango</ComboboxOption>
          <ComboboxOption value="orange">Orange</ComboboxOption>
          <ComboboxOption value="strawberry">Strawberry</ComboboxOption>
        </Combobox>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field.Root id="with_field" error={error} hint={hint}>
          <Field.Label>{label}</Field.Label>
          <Combobox
            id="with_field"
            value={value}
            onChange={setValue}
            onClear={() => setValue('')}
            error={error}
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
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        `,
      },
    },
  },

  name: 'with field',
};
