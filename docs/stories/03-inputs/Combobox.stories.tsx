import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxOption, Field, Flex, Typography } from '@strapi/design-system';
import { Link as LinkIcon, Plus } from '@strapi/icons';
import { default as outdent } from 'outdent';

const options = [
  { name: 'Apple', value: 'apple' },
  { name: 'Avocado', value: 'avocado' },
  { name: 'Banana', value: 'banana' },
  { name: 'Kiwi', value: 'kiwi' },
  { name: 'Mango', value: 'mango' },
  { name: 'Orange', value: 'orange' },
  { name: 'Strawberry', value: 'strawberry' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Inputs/Combobox',
  component: Combobox,
  args: {
    disabled: false,
    placeholder: 'My favourite fruit is...',
    size: 'M',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, disables the combobox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'If true, the combobox is a required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultTextValue: {
      control: false,
      description: 'Default value of what the user sees and types in the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultOpen: {
      control: false,
      description: 'If true, the combobox dropdown is open by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultFilterValue: {
      control: 'text',
      description: 'The default value used to filter the list of options displayed in the dropdown.',
      table: {
        type: { summary: 'string' },
      },
    },
    filterValue: {
      control: 'text',
      description: 'The current value used to filter the list of options displayed in the dropdown.',
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the combobox dropdown is open',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Indicates if the combobox is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled selected value of the combobox',
      table: {
        type: { summary: 'string' },
      },
    },
    textValue: {
      control: 'text',
      description: 'What the user sees and types in the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    onOpenChange: {
      action: 'open changed',
      description: 'Callback fired when the open state changes',
      table: {
        type: { summary: 'function', detail: '(open: boolean) => void' },
      },
    },
    onFilterValueChange: {
      action: 'filter value changed',
      description: 'Callback fired when the filter value changes',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onTextValueChange: {
      action: 'text value changed',
      description: 'Callback fired when the text value changes',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onChange: {
      action: 'value changed',
      description: 'Callback fired when the selected value changes',
      table: {
        type: { summary: 'function', detail: '((value: string) => void)' },
      },
    },
    onClear: {
      action: 'cleared',
      description: 'Callback fired when the clear button is clicked',
      table: {
        type: { summary: 'function', detail: 'React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>' },
      },
    },
    onCreateOption: {
      action: 'option created',
      description: 'Callback fired when a new option is created',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onLoadMore: {
      action: 'load more',
      description: 'Callback fired to load more items',
      table: {
        type: { summary: 'function', detail: '(entry: IntersectionObserverEntry) => void' },
      },
    },
    onInputChange: {
      action: 'input changed',
      description: 'Callback fired when the input value changes',
      table: {
        type: { summary: 'function', detail: 'React.ChangeEventHandler<HTMLInputElement>' },
      },
    },
    isPrintableCharacter: {
      description: 'A custom function to check if a character is not alphabetical, used to filter input.',
      table: {
        type: { summary: 'function', detail: '(str: string) => boolean' },
      },
    },
    allowCustomValue: {
      control: 'boolean',
      description: 'Allows the user to enter custom values not in the predefined options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autocomplete: {
      control: 'radio',
      options: ['none', 'list', 'both'],
      description: 'Controls the autocomplete behavior of the combobox',
      table: {
        type: { summary: 'enum', detail: "list | none | both | { type: 'list' ; filter: 'startsWith' | 'contains'}" },
        defaultValue: { summary: 'both' },
      },
    },
    creatable: {
      control: 'radio',
      options: [false, true, 'visible'],
      description: 'If true, allows creating new options. If "visible", always shows the create option.',
      table: {
        type: { summary: 'boolean | "visible"' },
        defaultValue: { summary: 'false' },
      },
    },
    creatableDisabled: {
      control: 'boolean',
      description: 'If true, disables the creatable option',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    createMessage: {
      control: false,
      description: 'Controls the text shown to the user when creating a new option',
      table: {
        type: { summary: 'function', detail: '(value: string) => string' },
        defaultValue: { summary: '(value) => `Create "${value}"`' },
      },
    },
    hasMoreItems: {
      control: 'boolean',
      description: 'Indicates if there are more items to load',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message to display while loading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Loading content..."' },
      },
    },
    noOptionsMessage: {
      control: false,
      description: 'Function to generate the no options message',
      table: {
        type: { summary: 'function', detail: '(value: string) => string' },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'Size of the combobox',
      table: {
        type: { summary: 'enum', detail: "'S' | 'M'" },
        defaultValue: { summary: '"M"' },
      },
    },
    startIcon: {
      control: false,
      description: 'Icon to display at the start of the input',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to display when no value is selected',
      table: {
        type: { summary: 'string' },
      },
    },
    clearLabel: {
      description: 'Label for the clear button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"clear"' },
      },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Base: Story = {
  render: (props) => (
    <Combobox {...props}>
      {options.map(({ name, value }) => (
        <ComboboxOption key={value} value={value}>
          {name}
        </ComboboxOption>
      ))}
    </Combobox>
  ),
  parameters: {
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Combobox {...props} disabled>
            {options.map(({ name, value }) => (
              <ComboboxOption key={value} value={value}>{name}</ComboboxOption>
            ))}
          </Combobox>
        `,
      },
    },
  },
};

export const Size: Story = {
  args: {
    size: 'S',
  },
  render: (props) => (
    <Combobox {...props}>
      {options.map(({ name, value }) => (
        <ComboboxOption key={value} value={value}>
          {name}
        </ComboboxOption>
      ))}
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Combobox {...props} size="S">
            {options.map(({ name, value }) => (
              <ComboboxOption key={value} value={value}>{name}</ComboboxOption>
            ))}
          </Combobox>
        `,
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLoadMore = () => setIsLoading(true);

    React.useEffect(() => {
      if (isLoading) {
        const timeout = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timeout);
      }
    }, [isLoading]);

    return (
      <Combobox placeholder="My favourite fruit is..." loading={isLoading} onLoadMore={handleLoadMore} hasMoreItems>
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Combobox placeholder="My favourite fruit is..." loading={isLoading} onLoadMore={handleLoadMore} hasMoreItems>
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
        `,
      },
    },
  },
};

export const Creatable: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('');
    const [dynamicOptions, setDynamicOptions] = React.useState(options);

    const onCreateOption = (newOption?: string) => {
      setDynamicOptions([...dynamicOptions, { name: newOption!, value: newOption! }]);
      setValue(newOption);
    };

    return (
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable
      >
        {dynamicOptions.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
  name: 'Creatable',
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable
      >
        {dynamicOptions.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
        `,
      },
    },
  },
};

export const CreatableVisible: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('');

    const onCreateOption = () => {
      console.log('Created option');
    };

    return (
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable="visible"
        creatableStartIcon={<Plus fill="neutral500" />}
        createMessage={() => 'Create a fruit'}
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            <Flex gap={2} justifyContent="space-between">
              <Flex gap={2}>
                <LinkIcon fill="neutral500" />
                <Typography ellipsis>{name}</Typography>
              </Flex>
            </Flex>
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
  name: 'Creatable Visible',
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable="visible"
        creatableStartIcon={<Plus fill="neutral500" />}
        createMessage={() => 'Create a relation'}
      >
        {dynamicOptions.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
        `,
      },
    },
  },
};

export const CreatableDisabled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('');

    const onCreateOption = () => {
      console.log('Created option');
    };

    return (
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable="visible"
        creatableDisabled
        creatableStartIcon={<Plus fill="neutral500" />}
        createMessage={() => 'Create a fruit'}
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            <Flex gap={2} justifyContent="space-between">
              <Flex gap={2}>
                <LinkIcon fill="neutral500" />
                <Typography ellipsis>{name}</Typography>
              </Flex>
            </Flex>
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
  name: 'Creatable Disabled',
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Combobox
        placeholder="My favourite fruit is..."
        value={value}
        onChange={setValue}
        onCreateOption={onCreateOption}
        creatable="visible"
        creatableDisabled={true}
        creatableStartIcon={<Plus fill="neutral500" />}
        createMessage={() => 'Create a relation'}
      >
        {dynamicOptions.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
        `,
      },
    },
  },
};

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
      } else {
        setAutocompleteMode(mode);
      }
    }, [mode]);

    return (
      <Combobox
        value={value}
        onChange={setValue}
        autocomplete={autocompleteMode}
        onClear={() => setValue('')}
        {...props}
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
  name: 'Autocomplete',
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Combobox
        value={value}
        onChange={setValue}
        autocomplete={autocompleteMode}
        onClear={() => setValue('')}
        {...props}
      >
        {options.map(({ name, value }) => (
          <ComboboxOption key={value} value={value}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>
        `,
      },
    },
  },
};

export const WithField = {
  args: {
    label: 'Fruits',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },
  render: ({ error, hint, label, ...comboboxProps }) => {
    const [value, setValue] = React.useState<string | undefined>('');

    return (
      <Field.Root id="with_field" error={error} hint={hint}>
        <Field.Label>{label}</Field.Label>
        <Combobox value={value} onChange={setValue} onClear={() => setValue('')} {...comboboxProps}>
          {options.map(({ name, value }) => (
            <ComboboxOption key={value} value={value}>
              {name}
            </ComboboxOption>
          ))}
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
            <Combobox {...props}>
              {options.map(({ name, value }) => (
                <ComboboxOption key={value} value={value}>{name}</ComboboxOption>
              ))}
            </Combobox>
            <Field.Error />
            <Field.Hint />
          </Field.Root>
        `,
      },
    },
  },
  name: 'With Field',
};

export const ComboboxProps = {
  /**
   * add !dev tag so this story does not appear in the sidebar
   * as it exists solely for documenting the props.
   */
  tags: ['!dev'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, disables the combobox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: false,
      description: 'If true, the combobox is a required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultTextValue: {
      control: false,
      description: 'Default value of what the user sees and types in the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultOpen: {
      control: false,
      description: 'If true, the combobox dropdown is open by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultFilterValue: {
      control: 'text',
      description: 'The default value used to filter the list of options displayed in the dropdown.',
      table: {
        type: { summary: 'string' },
      },
    },
    filterValue: {
      control: 'text',
      description: 'The current value used to filter the list of options displayed in the dropdown.',
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the combobox dropdown is open',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Indicates if the combobox is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled selected value of the combobox',
      table: {
        type: { summary: 'string' },
      },
    },
    textValue: {
      control: 'text',
      description: 'What the user sees and types in the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    onOpenChange: {
      action: 'open changed',
      description: 'Callback fired when the open state changes',
      table: {
        type: { summary: 'function', detail: '(open: boolean) => void' },
      },
    },
    onFilterValueChange: {
      action: 'filter value changed',
      description: 'Callback fired when the filter value changes',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onTextValueChange: {
      action: 'text value changed',
      description: 'Callback fired when the text value changes',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onChange: {
      action: 'value changed',
      description: 'Callback fired when the selected value changes',
      table: {
        type: { summary: 'function', detail: '((value: string) => void)' },
      },
    },
    onClear: {
      action: 'cleared',
      description: 'Callback fired when the clear button is clicked',
      table: {
        type: { summary: 'function', detail: 'React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>' },
      },
    },
    onCreateOption: {
      action: 'option created',
      description: 'Callback fired when a new option is created',
      table: {
        type: { summary: 'function', detail: '(value: string) => void' },
      },
    },
    onLoadMore: {
      action: 'load more',
      description: 'Callback fired to load more items',
      table: {
        type: { summary: 'function', detail: '(entry: IntersectionObserverEntry) => void' },
      },
    },
    onInputChange: {
      action: 'input changed',
      description: 'Callback fired when the input value changes',
      table: {
        type: { summary: 'function', detail: 'React.ChangeEventHandler<HTMLInputElement>' },
      },
    },
    isPrintableCharacter: {
      description: 'A custom function to check if a character is not alphabetical, used to filter input.',
      table: {
        type: { summary: 'function', detail: '(str: string) => boolean' },
      },
    },
    allowCustomValue: {
      control: 'boolean',
      description: 'Allows the user to enter custom values not in the predefined options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autocomplete: {
      control: 'radio',
      options: ['none', 'list', 'both'],
      description: 'Controls the autocomplete behavior of the combobox',
      table: {
        type: { summary: 'enum', detail: "list | none | both | { type: 'list' ; filter: 'startsWith' | 'contains'}" },
        defaultValue: { summary: 'both' },
      },
    },
    creatable: {
      control: 'radio',
      options: [false, true, 'visible'],
      description: 'If true, allows creating new options. If "visible", always shows the create option.',
      table: {
        type: { summary: 'boolean | "visible"' },
        defaultValue: { summary: 'false' },
      },
    },
    createMessage: {
      control: false,
      description: 'Controls the text shown to the user when creating a new option',
      table: {
        type: { summary: 'function', detail: '(value: string) => string' },
        defaultValue: { summary: '(value) => `Create "${value}"`' },
      },
    },
    hasMoreItems: {
      control: 'boolean',
      description: 'Indicates if there are more items to load',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message to display while loading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Loading content..."' },
      },
    },
    noOptionsMessage: {
      control: false,
      description: 'Function to generate the no options message',
      table: {
        type: { summary: 'function', detail: '(value: string) => string' },
      },
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
      description: 'Size of the combobox',
      table: {
        type: { summary: 'enum', detail: "'S' | 'M'" },
        defaultValue: { summary: '"M"' },
      },
    },
    startIcon: {
      control: false,
      description: 'Icon to display at the start of the input',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to display when no value is selected',
      table: {
        type: { summary: 'string' },
      },
    },
    clearLabel: {
      description: 'Label for the clear button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"clear"' },
      },
    },
  },
};

export const ComboboxOptionProps = {
  /**
   * add !dev tag so this story does not appear in the sidebar
   * as it exists solely for documenting the props.
   */
  tags: ['!dev'],
  argTypes: {
    value: {
      control: false,
      description: 'The value of the option, used to match the selected item.',
      type: { required: true },
      table: {
        type: { summary: 'string | number' },
      },
    },
    textValue: {
      control: false,
      description: 'Alternative text value used for filtering and search. Defaults to the value.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the option if set to true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: false,
      description: 'The content to display inside the option, typically text.',
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};
