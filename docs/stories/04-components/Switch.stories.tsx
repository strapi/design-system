import { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, SwitchProps, composeEventHandlers } from '@strapi/design-system';
import { outdent } from 'outdent';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

interface SwitchArgs extends SwitchProps {}

const meta: Meta<SwitchArgs> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
          <Switch />
        `,
      },
    },
  },
  args: {
    checked: true,
    disabled: false,
    required: false,
    onCheckedChange: fn(),
  },
  render: ({ onCheckedChange, ...args }) => {
    const [, updateArgs] = useArgs();

    const handleCheckedChange = (checked: boolean) => {
      updateArgs({ checked });
    };

    return <Switch onCheckedChange={composeEventHandlers(onCheckedChange, handleCheckedChange)} {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Checked = {
  name: 'checked',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Switch checked />
        `,
      },
    },
  },
} satisfies Story;

export const Unchecked = {
  args: {
    checked: false,
  },
  name: 'unchecked',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Switch checked={false} />
        `,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Switch disabled />
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const WithVisibleLabels = {
  args: {
    visibleLabels: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Switch visibleLabels />
        `,
      },
    },
  },
  name: 'with visible labels',
} satisfies Story;
