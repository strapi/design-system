import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '@strapi/design-system';
import { Search, Cross, Earth } from '@strapi/icons';
import { outdent } from 'outdent';

interface Props
  extends
    Field.Props,
    Pick<Field.InputProps, 'type' | 'placeholder' | 'startAction' | 'endAction'>,
    Pick<Field.LabelProps, 'action'> {
  label: string;
}

const meta: Meta<Props> = {
  title: 'Components/Field',
  render: ({ label, placeholder, type, startAction, endAction, action, ...props }) => {
    return (
      <Field.Root {...props}>
        <Field.Label action={action}>{label}</Field.Label>
        <Field.Input type={type} placeholder={placeholder} startAction={startAction} endAction={endAction} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  },
  args: {
    error: false,
    hint: null,
    label: 'First Name',
    name: 'firstname',
    placeholder: 'Ted Lasso',
    required: false,
    type: 'text',
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<Props>;

export const Base = {
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root>
        <Field.Label>First Name</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const Input = {
  name: 'input',
  args: {
    type: 'password',
    label: 'New password',
    placeholder: 'Enter a new password',
    required: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root>
        <Field.Label>New password</Field.Label>
        <Field.Input type="password" placeholder="Enter a new password" />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const Error = {
  name: 'error',
  args: {
    error: 'This field is required',
    action: (
      <button aria-label="i18n" type="button">
        <Earth aria-hidden />
      </button>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root error="This field is required">
        <Field.Label>First Name</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" />
        <Field.Error />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const Hint = {
  name: 'hint',
  args: {
    hint: 'Your full legal name with any middle names',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root hint="Your full legal name with any middle names">
        <Field.Label>First Name</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" />
        <Field.Hint />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const Counter = {
  name: 'counter',
  args: {
    label: 'Title',
    hint: 'max. 60 characters',
    counter: '12 of 60 characters',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root hint="max. 60 characters" counter="12 of 60 characters">
        <Field.Label>Title</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const CounterWithError = {
  name: 'counter with error',
  args: {
    label: 'Title',
    hint: 'max. 60 characters',
    error: 'The value is too long (max: 60).',
    counter: '72 of 60 characters',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      <Field.Root hint="max. 60 characters" error="The value is too long (max: 60)." counter="72 of 60 characters">
        <Field.Label>Title</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

const MAX_LENGTH = 60;

const LiveCounter = () => {
  const [value, setValue] = React.useState('');
  const isTooLong = value.length > MAX_LENGTH;

  return (
    <Field.Root
      hint={`max. ${MAX_LENGTH} characters`}
      error={isTooLong ? `The value is too long (max: ${MAX_LENGTH}).` : false}
      counter={`${value.length} of ${MAX_LENGTH} characters`}
    >
      <Field.Label>Title</Field.Label>
      <Field.Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  );
};

export const CounterWhileTyping = {
  name: 'counter while typing',
  render: () => <LiveCounter />,
  parameters: {
    docs: {
      source: {
        code: outdent`
      const [value, setValue] = React.useState('');
      const isTooLong = value.length > 60;

      <Field.Root
        hint="max. 60 characters"
        error={isTooLong ? 'The value is too long (max: 60).' : false}
        counter={\`\${value.length} of 60 characters\`}
      >
        <Field.Label>Title</Field.Label>
        <Field.Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const WithStartAction = {
  name: 'with start action',
  args: {
    startAction: <Search />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      import { Search } from '@strapi/icons';

      <Field.Root>
        <Field.Label>First Name</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" startAction={<Search />}/>
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;

export const WithEndAction = {
  name: 'with end action',
  args: {
    endAction: <Cross />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
      import { Cross } from '@strapi/icons';

      <Field.Root>
        <Field.Label>First Name</Field.Label>
        <Field.Input type="text" placeholder="Ted Lasso" endAction={<Cross />}/>
      </Field.Root>
    `,
      },
    },
  },
} satisfies Story;
