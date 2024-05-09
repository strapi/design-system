import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton, Accordion, Typography, Field } from '@strapi/design-system';
import { Duplicate, Trash, User } from '@strapi/icons';
import { outdent } from 'outdent';

const meta: Meta = {
  title: 'Components/Accordion',
  render: ({ caretPosition, description, title, ...args }) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger description={description} caretPosition={caretPosition}>
              {title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<Accordion.Props & Pick<Accordion.TriggerProps, 'caretPosition' | 'description' | 'title'>>;

export const Base = {
  argTypes: {
    caretPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    size: {
      control: 'radio',
      options: ['S', 'M'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    caretPosition: 'left',
    description: 'Your personal information',
    disabled: false,
    onValueChange: fn(),
    size: 'S',
    title: 'User information',
    variant: 'primary',
  },
  name: 'base',
} satisfies Story;

export const Secondary = {
  ...Base,
  args: {
    ...Base.args,
    variant: 'secondary',
  },
  name: 'secondary variant',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root variant="secondary">
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  ...Base,
  args: {
    ...Base.args,
    disabled: true,
  },
  name: 'disabled',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root disabled>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const Expanded = {
  ...Base,
  args: {
    ...Base.args,
    defaultValue: 'acc-01',
  },
  name: 'expanded',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root defaultValue="acc-01">
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const SizeMedium = {
  ...Base,
  args: {
    ...Base.args,
    size: 'M',
  },
  name: 'medium size',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root size="M">
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const RightAlignedCaret = {
  ...Base,
  args: {
    ...Base.args,
    caretPosition: 'right',
  },
  name: 'caret right aligned',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information" caretPosition="right">
                User information
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const WithIcon = {
  ...Base,
  render: ({ caretPosition, description, title, ...args }) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger icon={User} description={description} caretPosition={caretPosition}>
              {title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },
  name: 'with icon',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger icon={User} description={description} caretPosition={caretPosition}>
                {title}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies Story;

export const WithActions = {
  ...Base,
  args: {
    ...Base.args,
    duplicateOnClick: fn(),
    deleteOnClick: fn(),
  },
  render: ({ caretPosition, description, title, duplicateOnClick, deleteOnClick, ...args }) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger description={description} caretPosition={caretPosition}>
              {title}
            </Accordion.Trigger>
            <Accordion.Actions>
              <IconButton aria-label="Duplicate record" onClick={duplicateOnClick}>
                <Duplicate />
              </IconButton>
              <IconButton aria-label="Delete record" onClick={deleteOnClick}>
                <Trash />
              </IconButton>
            </Accordion.Actions>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },
  name: 'with actions',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger description="Your personal information">
                User information
              </Accordion.Trigger>
              <Accordion.Actions>
                <IconButton aria-label="Duplicate record" onClick={duplicateOnClick}>
                  <Duplicate />
                </IconButton>
                <IconButton aria-label="Delete record" onClick={deleteOnClick}>
                  <Trash />
                </IconButton>
              </Accordion.Actions>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies StoryObj<
  Accordion.Props &
    Pick<Accordion.TriggerProps, 'caretPosition' | 'description' | 'title'> & {
      duplicateOnClick: () => void;
      deleteOnClick: () => void;
    }
>;

export const Group = {
  ...Base,
  render: ({ ...args }) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger>Ted Lasso</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              My name is Ted Lasso
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="acc-02">
          <Accordion.Header>
            <Accordion.Trigger>Coach Beard</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              My name is Coach.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="acc-03">
          <Accordion.Header>
            <Accordion.Trigger>Jamie Tart</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              My name is Jamie Tart
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="acc-04">
          <Accordion.Header>
            <Accordion.Trigger>Nate</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              My name is Nate
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },
  name: 'group',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Accordion.Root>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger>Ted Lasso</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Ted Lasso
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="acc-02">
            <Accordion.Header>
              <Accordion.Trigger>Coach Beard</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Coach.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="acc-03">
            <Accordion.Header>
              <Accordion.Trigger>Jamie Tart</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Jamie Tart
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="acc-04">
            <Accordion.Header>
              <Accordion.Trigger>Nate</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Nate
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>`,
      },
    },
  },
} satisfies StoryObj;

export const WithLabel = {
  ...Base,
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field.Label>Coaches</Field.Label>
        <Accordion.Root {...args}>
          <Accordion.Item value="acc-01">
            <Accordion.Header>
              <Accordion.Trigger>Ted Lasso</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Ted Lasso
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="acc-02">
            <Accordion.Header>
              <Accordion.Trigger>Coach Beard</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Typography display="block" padding={4}>
                My name is Coach.
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </Field.Root>
    );
  },
  name: 'with label',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Field.Root>
            <Field.Label>Coaches</Field.Label>
            <Accordion.Root>
              <Accordion.Item value="acc-01">
                <Accordion.Header>
                  <Accordion.Trigger>Ted Lasso</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Typography display="block" padding={4}>
                    My name is Ted Lasso
                  </Typography>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="acc-02">
                <Accordion.Header>
                  <Accordion.Trigger>Coach Beard</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Typography display="block" padding={4}>
                    My name is Coach.
                  </Typography>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Field.Root>
        `,
      },
    },
  },
} satisfies StoryObj;
