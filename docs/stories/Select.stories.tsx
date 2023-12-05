import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Flex,
  Button,
  MultiSelectNested,
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
} from '@strapi/design-system';

const meta: Meta = {
  title: 'Design System/Components/Select',
};

export default meta;

type SingleSelectStory = StoryObj<typeof SingleSelect>;

export const Basic = {
  render: () => {
    const [error, toggleError] = React.useState<string>();
    const [disabled, toggleDisabled] = React.useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <SingleSelect
          label="Fruits"
          required
          placeholder="My favourite fruit is..."
          hint="Fruits are not vegetables"
          error={error}
          disabled={disabled}
        >
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
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
} satisfies SingleSelectStory;

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState();

    return (
      <SingleSelect
        label="Fruits"
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValue(undefined);
        }}
        value={value}
        onChange={setValue}
      >
        <SingleSelectOption value="apple">Apple</SingleSelectOption>
        <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
        <SingleSelectOption value="banana">Banana</SingleSelectOption>
        <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
        <SingleSelectOption value="mango">Mango</SingleSelectOption>
        <SingleSelectOption value="orange">Orange</SingleSelectOption>
        <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
      </SingleSelect>
    );
  },

  name: 'controlled',
} satisfies SingleSelectStory;

type MultipleSelectStory = StoryObj<typeof MultiSelect>;

export const Multiple = {
  render: () => {
    const [values, setValues] = React.useState([]);

    return (
      <MultiSelect
        label="Fruits"
        required
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
      >
        <MultiSelectOption value="apple">Apple</MultiSelectOption>
        <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
        <MultiSelectOption value="banana">Banana</MultiSelectOption>
        <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
        <MultiSelectOption value="mango">Mango</MultiSelectOption>
        <MultiSelectOption value="orange">Orange</MultiSelectOption>
        <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
      </MultiSelect>
    );
  },

  name: 'multiple',
} satisfies MultipleSelectStory;

export const MultipleWithTags = {
  render: () => {
    const [values, setValues] = React.useState([]);

    return (
      <MultiSelect
        label="Fruits"
        required
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
        withTags
      >
        <MultiSelectOption value="apple">Apple</MultiSelectOption>
        <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
        <MultiSelectOption value="banana">Banana</MultiSelectOption>
        <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
        <MultiSelectOption value="mango">Mango</MultiSelectOption>
        <MultiSelectOption value="orange">Orange</MultiSelectOption>
        <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
      </MultiSelect>
    );
  },

  name: 'multiple with tags',
} satisfies MultipleSelectStory;

type MultipleSelectNestedStory = StoryObj<typeof MultiSelectNested>;

export const MultipleNestedSelect = {
  render: () => {
    const options = [
      {
        label: 'Banana',
        value: 'banana',
      },
      {
        label: 'Green fruits',

        children: [
          {
            label: 'Apple',
            value: 'apple',
          },
          {
            label: 'Avocado',
            value: 'avocado',
          },
          {
            label: 'Kiwi',
            value: 'kiwi',
          },
        ],
      },
      {
        label: 'Orange fruits',

        children: [
          {
            label: 'Mango',
            value: 'mango',
          },
          {
            label: 'Orange',
            value: 'orange',
          },
        ],
      },
      {
        label: 'Strawberry',
        value: 'strawberry',
      },
    ];

    const [values, setValues] = React.useState([]);

    return (
      <MultiSelectNested
        label="Fruits"
        required
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
        options={options}
      />
    );
  },

  name: 'multiple nested select',
} satisfies MultipleSelectNestedStory;
