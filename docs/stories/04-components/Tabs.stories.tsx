import { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Tabs, Typography } from '@strapi/design-system';
import { outdent } from 'outdent';
import { fn } from 'storybook/test';

interface TabsArgs extends Tabs.Props {}

const meta: Meta<TabsArgs> = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['regular', 'simple'],
    },
  },
  args: {
    onValueChange: fn(),
    variant: 'regular',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">
                The default settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">
                The advanced settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return (
      <Tabs.Root {...args} defaultValue="base">
        <Tabs.List aria-label="Manage your attribute">
          <Tabs.Trigger value="base">Base</Tabs.Trigger>
          <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="base">
          <Box padding={4}>
            <Typography tag="p">The default settings for your attribute</Typography>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="advanced">
          <Box padding={4}>
            <Typography tag="p">The advanced settings for your attribute</Typography>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
};

export default meta;

type Story = StoryObj<TabsArgs>;

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
        <Tabs.Root disabled defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">
                The default settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">
                The advanced settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const Controlled = {
  argTypes: {
    value: {
      control: 'radio',
      options: ['base', 'advanced'],
    },
  },
  args: {
    value: 'advanced',
  },
  name: 'controlled',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root value="advanced" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">
                The default settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">
                The advanced settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
} satisfies Story;

export const SimpleVariant = {
  args: {
    variant: 'simple',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root variant="simple" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">
                The default settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">
                The advanced settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'simple variant',
} satisfies Story;

export const Error = {
  args: {
    hasError: 'advanced',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root hasError="advanced" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">
                The default settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">
                The advanced settings for your attribute
              </Typography>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'has error',
} satisfies Story;
