import { Meta, StoryObj } from '@storybook/react';
import { Tooltip, IconButton } from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import { outdent } from 'outdent';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    label: 'Delete all items',
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <IconButton withTooltip={false} label="delete">
          <Trash />
        </IconButton>
      </Tooltip>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Tooltip label="Delete all items">
            <button aria-label="delete">
              <Trash aria-hidden focusable={false} />
            </button>
          </Tooltip>
        `,
      },
    },
    /* this will never show the component without interaction, so we never want it snapshot. */
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Positioned = {
  name: 'positioned',
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
  args: {
    align: 'center',
    open: true,
    side: 'right',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Tooltip label="Delete all items" align="center" side="right">
            <button aria-label="delete">
              <Trash aria-hidden focusable={false} />
            </button>
          </Tooltip>
        `,
      },
    },
    chromatic: { disableSnapshot: false },
  },
} satisfies Story;
