import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Checkbox, Flex } from '@strapi/design-system';
import { default as outdent } from 'outdent';
import { fn } from 'storybook/test';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <Flex justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  args: {
    children: 'Remember me',
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: {
      control: 'radio',
      options: [true, false, 'indeterminate'],
      description: 'The controlled checked state of the checkbox',
      table: {
        type: {
          summary: 'enum',
          detail: 'true | false | indeterminate',
        },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: false,
      description: 'The default checked state when initially rendered',
      type: { name: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onCheckedChange: {
      control: false,
      action: 'checked changed',
      description: 'Event handler called when the checked state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the checkbox',
      type: { name: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: false,
      description: 'When true, indicates that the user must check the checkbox before the owning form can be submitted',
      type: { name: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    name: {
      control: false,
      description: 'The name of the checkbox. Submitted with its owning form as part of a name/value pair',
      type: { name: 'string' },
    },
    value: {
      control: false,
      description: 'The value given as data when submitted with a name',
      type: { name: 'string' },
    },
    children: {
      control: 'text',
      description: 'The label of the checkbox',
      type: { name: 'string' },
    },
  },

  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return <Checkbox {...args} />;
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Base = {
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Checkbox value={checked} onChange={handleChange}>
          {label}
        </Checkbox>`,
      },
    },
  },
  name: 'Basic checkbox',
};

export const Indeterminate = {
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
  },
  args: {
    checked: 'indeterminate',
  },
  name: 'Indeterminate',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
    checked: true,
  },
  name: 'Disabled',
  parameters: {
    docs: {
      source: {
        code: '<Checkbox disabled checked>Remember me</Checkbox>',
      },
    },
  },
} satisfies Story;

export const WithoutLabel = {
  args: {
    children: null,
    ['aria-label']: 'Select row 1',
  },
  name: 'Without label',
} satisfies Story;

export const WithNameAndValue = {
  args: {
    name: 'rememberMe',
    value: 'yes',
    onSubmit: fn(),
  },
  render: ({ onSubmit, ...args }) => {
    return (
      <Flex
        tag="form"
        direction="column"
        gap={4}
        alignItems="flex-start"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) {
            const data = new FormData(e.target as HTMLFormElement);
            // @ts-expect-error – We're demonstrating `value` and `name` here.
            onSubmit(data.get('rememberMe'));
          }
        }}
      >
        <Checkbox {...args} />
        <Button type="submit">Submit</Button>
      </Flex>
    );
  },
  name: 'With name and Value',
} satisfies Story;
