import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  MultiSelectNested,
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
  Field,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';
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
  name: 'Base - Single Select',
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
  name: 'Disabled',
} satisfies SingleSelectStory;

export const Controlled = {
  argTypes: {},
  parameters: {
    docs: {
      source: {
        code: outdent`
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
        `,
      },
    },
  },
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

  name: 'Controlled',
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
  name: 'Small Size',
} satisfies SingleSelectStory;

export const StartIcon = {
  args: {
    startIcon: <Plus />,
  },
  render: ({ label, error, hint, ...props }) => {
    const selectRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <Field.Root error={error} hint={hint}>
        <Field.Label onClick={() => selectRef.current?.focus()}>{label}</Field.Label>
        <SingleSelect ref={selectRef} {...props}>
          <SingleSelectOption value="apple" startIcon={<Plus />}>
            Apple
          </SingleSelectOption>
          <SingleSelectOption value="avocado" startIcon={<Plus />}>
            Avocado
          </SingleSelectOption>
          <SingleSelectOption value="banana" startIcon={<Plus />}>
            Banana
          </SingleSelectOption>
        </SingleSelect>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  parameters: {
    docs: {
      code: outdent`
      <Field.Root error={error} hint={hint}>
        <Field.Label onClick={() => selectRef.current?.focus()}>{label}</Field.Label>
        <SingleSelect ref={selectRef} {...props}>
          <SingleSelectOption value="apple" startIcon={<Plus />}>
            Apple
          </SingleSelectOption>
          <SingleSelectOption value="avocado" startIcon={<Plus />}>
            Avocado
          </SingleSelectOption>
          <SingleSelectOption value="banana" startIcon={<Plus />}>
            Banana
          </SingleSelectOption>
        </SingleSelect>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
      `,
    },
  },
};

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

  name: 'Multiple',
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

  name: 'Multiple With Tags',
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

  name: 'Multiple Nested Select',
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

  name: 'Single Select Field',
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

  name: 'Multiple Select Field',
};

export const SingleSelectProps = {
  tags: ['!dev'],
  argTypes: {
    onChange: {
      control: false,
      action: 'value changed',
      description: 'Callback function invoked when the selected value changes. Receives the new value as an argument.',
      type: { name: 'function' },
      table: {
        type: { summary: 'function', detail: '(value: string | number) => void' },
      },
    },
    value: {
      control: 'text',
      description: 'The currently selected value. If `null`, no option is selected.',
      type: { name: 'function' },
      table: {
        type: { summary: 'string | number | null' },
      },
    },
    clearLabel: {
      control: 'text',
      description: 'Label for the clear action button.',
      type: { name: 'string' },
      table: {
        defaultValue: { summary: `'Clear'` },
      },
      defaultValue: 'Clear',
    },
    onClear: {
      control: false,
      action: 'clear triggered',
      description: 'Callback function invoked when the clear action is triggered, allowing for custom clear behavior.',
      table: {
        type: { summary: 'function', detail: '(event: React.MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    'aria-label': {
      control: false,
      description: 'Accessibility label for the select component.',
      type: { name: 'string' },
      table: {},
    },
    'aria-describedby': {
      control: false,
      description:
        'Accessibility description, typically referencing additional descriptive elements like hints or error messages.',
      type: { name: 'string' },
      table: {},
    },
    customizeContent: {
      control: false,
      description:
        'Function to customize the displayed content based on the selected value. If customizeContent is not provided, the component will use the default behavior, which is to convert the value to a string and display it.',
      type: { name: 'function' },
      table: {
        type: { summary: 'function', detail: `(value?: string | number) => string` },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select component when set to `true`, preventing user interaction.',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description:
        'Indicates whether the select component is in an error state, often changing its visual styling to reflect the error.',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
      defaultValue: false,
    },
    id: {
      control: false,
      description: 'The `id` attribute for the select component.',
      type: { name: 'string' },
      table: {},
    },
    name: {
      control: false,
      description: 'The `name` attribute for the select component.',
      type: { name: 'string' },
      table: {},
    },
    onCloseAutoFocus: {
      control: false,
      description:
        'Callback function invoked to handle focus when the select dropdown is closed, useful for managing focus behavior in modals or dialogs.',
      table: {
        type: { summary: 'function', detail: '(event: React.FocusEvent<HTMLDivElement>) => void' },
      },
    },
    onReachEnd: {
      control: false,
      description:
        'Callback function invoked when the end of the select options is reached, useful for implementing infinite scrolling or lazy loading of options.',
      table: {
        type: { summary: 'function', detail: '(entry: IntersectionObserverEntry) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no value is selected',
      type: { name: 'string' },
      table: {},
    },
    required: {
      control: false,
      description: 'Marks the select component as required.',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
      defaultValue: false,
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'Size of the input',
      table: {
        type: { summary: 'enum', detail: "'S' | 'M'" },
        defaultValue: { summary: '"M"' },
      },
    },
    startIcon: {
      control: false,
      description:
        'An optional icon displayed at the start of the select component, enhancing visual context or branding.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: false,
      description:
        'The selectable options rendered within the select dropdown, typically composed of `SingleSelectOption` components.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export const SingleSelectOptionsProps = {
  /**
   * add !dev tag so this story does not appear in the sidebar
   * as it exists solely for documenting the props.
   */
  tags: ['!dev'],
  argTypes: {
    startIcon: {
      control: false,
      description: 'An optional icon to display at the start of the MultiSelectOption.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    value: {
      control: false,
      description: 'The value of the option.',
      type: { required: true },
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export const MultipleSelectProps = {
  tags: ['!dev'],
  argTypes: {
    children: {
      control: false,
      description: 'The children components, typically the options for the MultiSelect.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    clearLabel: {
      control: 'text',
      description: 'Label for the clear button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Clear' },
      },
    },
    customizeContent: {
      control: false,
      description: 'Custom function to render the selected values as a string.',
      table: {
        type: { summary: 'function', detail: '(value?: string[]) => string' },
        defaultValue: { summary: '(value) => value.join(",")' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the MultiSelect component when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Displays error styles when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
      description: 'The id of the component.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'The name of the MultiSelect component for form submissions.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function triggered when the value changes.',
      table: {
        type: { summary: 'function', detail: '(value: string[]) => void' },
      },
    },
    onClear: {
      control: false,
      description: 'Callback function triggered when the clear button is clicked.',
      table: {
        type: { summary: 'function', detail: '() => void' },
      },
    },
    onCloseAutoFocus: {
      control: false,
      description: 'Callback function triggered when the select closes and refocuses.',
      table: {
        type: { summary: 'function', detail: '() => void' },
      },
    },
    onReachEnd: {
      control: false,
      description: 'Callback function triggered when the user scrolls to the end of the options.',
      table: {
        type: { summary: 'function', detail: '(entry: IntersectionObserverEntry) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to display when no values are selected.',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Indicates if the field is required.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the MultiSelect component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    startIcon: {
      control: false,
      description: 'An optional icon to display at the start of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    value: {
      control: false,
      description: 'The selected values of the MultiSelect component.',
      table: {
        type: { summary: 'string[] | null' },
        defaultValue: { summary: 'null' },
      },
    },
    withTags: {
      control: 'boolean',
      description: 'Display the selected values as tags when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export const MultipleSelectOptions = {
  /**
   * add !dev tag so this story does not appear in the sidebar
   * as it exists solely for documenting the props.
   */
  tags: ['!dev'],
  argTypes: {
    startIcon: {
      control: false,
      description: 'An optional icon to display at the start of the MultiSelectOption.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    value: {
      control: 'text',
      description: 'The value of the selected option.',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export const MultipleSelectNestedProps = {
  /**
   * add !dev tag so this story does not appear in the sidebar
   * as it exists solely for documenting the props.
   */
  tags: ['!dev'],
  argTypes: {
    options: {
      control: false,
      description: 'An array of options which can either be standalone options or groups of options.',
      table: {
        type: {
          required: true,
          summary: 'Array<MulitSelectNestedOption | MulitSelectNestedGroup>',
          detail: `
          MulitSelectNestedOption {
            value: string | number;
            label: string;
            startIcon?: React.ReactNode;
          }

          MulitSelectNestedGroup {
            label: string;
            children: Array<MulitSelectNestedOption>;
          }
        `,
        },
        defaultValue: { summary: '[]' },
      },
    },

    value: {
      control: false,
      description: 'The selected values for the MultiSelect component.',
      table: {
        type: { summary: 'string[] | null' },
        defaultValue: { summary: 'null' },
      },
    },

    onChange: {
      control: false,
      description: 'Callback function triggered when the selection changes.',
      table: {
        type: { summary: 'function', detail: '(value: string[]) => void' },
      },
    },

    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no values are selected.',
      table: {
        type: { summary: 'string' },
      },
    },

    disabled: {
      control: 'boolean',
      description: 'Disables the MultiSelect component when set to true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    withTags: {
      control: 'boolean',
      description: 'Displays the selected values as tags when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the MultiSelect component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },

    clearLabel: {
      control: false,
      description: 'Label for the clear button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Clear' },
      },
    },

    startIcon: {
      control: false,
      description: 'Optional icon to display at the start of the MultiSelect.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },

    onClear: {
      control: false,
      description: 'Callback function triggered when the clear button is clicked.',
      table: {
        type: { summary: 'function', detail: '() => void' },
      },
    },

    onReachEnd: {
      control: false,
      description: 'Callback function triggered when the user scrolls to the end of the options.',
      table: {
        type: { summary: 'function', detail: '(entry: IntersectionObserverEntry) => void' },
      },
    },
  },
};
