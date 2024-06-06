import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  MultiSelectNested,
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
  Field,
} from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof SingleSelect> = {
  title: 'Inputs/Select',
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
        <SingleSelect {...props}>
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
  },
  args: {
    disabled: false,
    placeholder: 'My favourite fruit is...',
    size: 'M',
  },
  render: ({ ...props }) => {
    return (
      <SingleSelect {...props}>
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
};

export default meta;

type SingleSelectStory = StoryObj<typeof SingleSelect>;

export const Base = {
  name: 'basic',
} satisfies SingleSelectStory;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <SingleSelect {...props} disabled>
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies SingleSelectStory;

export const Controlled = {
  render: ({ ...props }) => {
    const [value, setValue] = React.useState<string | number>();

    return (
      <SingleSelect
        {...props}
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

export const Size = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <SingleSelect {...props} size="S">
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        `,
      },
    },
  },
  name: 'small size',
} satisfies SingleSelectStory;

type MultipleSelectStory = StoryObj<typeof MultiSelect>;

export const Multiple = {
  render: ({ ...props }) => {
    const [values, setValues] = React.useState<string[]>([]);

    return (
      <MultiSelect
        {...props}
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
  args: {
    withTags: true,
  },
  render: ({ ...props }) => {
    const [values, setValues] = React.useState<string[]>([]);

    return (
      <MultiSelect
        {...props}
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

  name: 'multiple with tags',
} satisfies MultipleSelectStory;

type MultipleSelectNestedStory = StoryObj<typeof MultiSelectNested>;

export const MultipleNestedSelect = {
  render: ({ ...props }) => {
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

    const [values, setValues] = React.useState<Array<string>>([]);

    return (
      <MultiSelectNested
        {...props}
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

export const SingleSelectField = {
  args: {
    label: 'Fruits',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ label, error, hint, ...props }) => {
    const selectRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <Field.Root error={error} hint={hint}>
        <Field.Label onClick={() => selectRef.current?.focus()}>{label}</Field.Label>
        <SingleSelect ref={selectRef} {...props}>
          <SingleSelectOption value="apple">Apple</SingleSelectOption>
          <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
          <SingleSelectOption value="banana">Banana</SingleSelectOption>
          <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
          <SingleSelectOption value="mango">Mango</SingleSelectOption>
          <SingleSelectOption value="orange">Orange</SingleSelectOption>
          <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
        </SingleSelect>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        render: ({ label, error, hint, ...props }) => {
          const selectRef = React.useRef<HTMLDivElement | null>(null);
      
          return (
            <Field.Root error={error} hint={hint}>
              <Field.Label>{label}</Field.Label>
              <SingleSelect ref={selectRef} placeholder="My favourite fruit is..." error={error}>
                <SingleSelectOption value="apple">Apple</SingleSelectOption>
                <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
                <SingleSelectOption value="banana">Banana</SingleSelectOption>
                <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
                <SingleSelectOption value="mango">Mango</SingleSelectOption>
                <SingleSelectOption value="orange">Orange</SingleSelectOption>
                <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
              </SingleSelect>
              <Field.Error />
              <Field.Hint />
            </Field.Root>
          );
        },
        `,
      },
    },
  },

  name: 'single select field',
};

export const MultiSelectField = {
  args: {
    label: 'Fruits',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ label, error, hint, ...props }) => {
    const multiSelectRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <Field.Root error={error} hint={hint}>
        <Field.Label onClick={() => multiSelectRef.current?.focus()}>{label}</Field.Label>
        <MultiSelect {...props} withTags ref={multiSelectRef}>
          <MultiSelectOption value="apple">Apple</MultiSelectOption>
          <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
          <MultiSelectOption value="banana">Banana</MultiSelectOption>
          <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
          <MultiSelectOption value="mango">Mango</MultiSelectOption>
          <MultiSelectOption value="orange">Orange</MultiSelectOption>
          <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
        </MultiSelect>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        render: ({ label, error, hint, ...props }) => {
          const multiSelectRef = React.useRef<HTMLDivElement | null>(null);
          return (
            <Field.Root error={error} hint={hint}>
              <Field.Label onClick={() => multiSelectRef.current?.focus()}>{label}</Field.Label>
              <MultiSelect ref={multiSelectRef} placeholder="My favourite fruit is..." error={error}>
                <MultiSelectOption value="apple">Apple</MultiSelectOption>
                <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
                <MultiSelectOption value="banana">Banana</MultiSelectOption>
                <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
                <MultiSelectOption value="mango">Mango</MultiSelectOption>
                <MultiSelectOption value="orange">Orange</MultiSelectOption>
                <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
              </MultiSelect>
              <Field.Error />
              <Field.Hint />
            </Field.Root>
          );
        },
        `,
      },
    },
  },

  name: 'multiple select field',
};
