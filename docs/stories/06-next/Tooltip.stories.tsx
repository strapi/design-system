import { Meta, StoryObj } from '@storybook/react-vite';
import { Information } from '@strapi/icons';

import {
  Button,
  SimpleTooltip,
  type SimpleTooltipProps,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

const ICON_TRIGGER_STYLE = {
  display: 'inline-flex',
  padding: '0.4rem',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
} as const;

type TooltipArgs = Pick<SimpleTooltipProps, 'label' | 'side' | 'delay' | 'open'>;

const meta: Meta<TooltipArgs> = {
  title: 'Next/Tooltip',
  args: {
    label: 'Delete the entry',
    side: 'top',
    delay: 500,
  },
  argTypes: {
    label: { description: 'The text of the tooltip. Without it, only the trigger renders.' },
    side: {
      control: 'select',
      options: SIDES,
      description: 'The side of the trigger the tooltip shows on.',
      table: { defaultValue: { summary: 'top' } },
    },
    delay: {
      description: 'How long the pointer rests on the trigger before the tooltip opens, in ms.',
      table: { defaultValue: { summary: '500' } },
    },
  },
  render: (args) => (
    <div style={{ padding: '6rem' }}>
      <SimpleTooltip {...args}>
        <Button variant="tertiary">Hover me</Button>
      </SimpleTooltip>
    </div>
  ),
};

export default meta;

type Story = StoryObj<TooltipArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Parts = {
  render: () => (
    <div style={{ padding: '6rem' }}>
      <Tooltip>
        <TooltipTrigger aria-label="More information" style={ICON_TRIGGER_STYLE}>
          <Information aria-hidden />
        </TooltipTrigger>
        <TooltipContent side="right">The slug is the URL of the entry</TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: { controls: { disable: true } },
  name: 'parts',
} satisfies Story;

/**
 * Open on load, for the visual tests.
 */
export const Open = {
  render: () => (
    <div style={{ display: 'flex', gap: '20rem', padding: '6rem 12rem' }}>
      {SIDES.map((side) => (
        <SimpleTooltip key={side} label={`On the ${side}`} side={side} open>
          <Button variant="tertiary">{side}</Button>
        </SimpleTooltip>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;
