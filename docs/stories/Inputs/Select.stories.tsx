import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import {
  Flex,
  Button,
  MultiSelectNested,
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
} from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta = {
  title: 'Design System/Inputs/Select',
};

export default meta;

type SingleSelectStory = StoryObj<typeof SingleSelect>;

export const Basic = {
  render: () => {
    const [disabled, toggleDisabled] = React.useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <SingleSelect disabled={disabled}>
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        <Flex gap={2} justifyContent="center">
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
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValue(undefined);
        }}
        value={value}
        onChange={setValue}
        aria-label="fruit Label"
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
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
        aria-label="fruit Label"
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
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
        withTags
        aria-label="fruit Label"
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
        placeholder="My favourite fruit is..."
        onClear={() => {
          setValues([]);
        }}
        value={values}
        onChange={setValues}
        options={options}
        aria-label="fruit Label"
      />
    );
  },

  name: 'multiple nested select',
} satisfies MultipleSelectNestedStory;

export const WithField = {
  render: ({ error }) => {
    const [, updateArgs] = useArgs();

    return (
      <Field
        id="with_field"
        error={error ? 'Error' : undefined}
        hint={error ? undefined : 'Description line lorem ipsum'}
      >
        <FieldLabel>Fruits</FieldLabel>
        <SingleSelect
          placeholder="My favourite fruit is..."
          hint="Fruits are not vegetables"
          error={error ? 'Error' : undefined}
        >
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        <FieldError />
        <FieldHint />
        <Button variant="danger-light" onClick={() => updateArgs({ error: !error })}>
          {`${error ? 'Hide' : 'Show'} the error state`}
        </Button>
      </Field>
    );
  },
  args: {
    error: false,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          disabled={disabled}
          error={error ? 'Error' : undefined}
          hint={error ? undefined : 'Description line lorem ipsum'}
        >
          <FieldLabel>Fruits</FieldLabel>
          <SingleSelect
          placeholder="My favourite fruit is..."
          hint="Fruits are not vegetables"
          error={error ? 'Error' : undefined}
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
          <FieldError />
          <FieldHint />
        </Field>
        `,
      },
    },
  },

  name: 'with field',
} satisfies SingleSelectStory;
