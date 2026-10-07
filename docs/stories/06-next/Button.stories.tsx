import { Fragment, type CSSProperties, type ReactNode } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonSize, type ButtonVariant } from '@strapi/design-system/next';
import { Check, Plus, Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// `cva` does not expose its variants, so these records list them. A missing or extra key fails the type check
const VARIANT_KEYS = {
  default: true,
  secondary: true,
  tertiary: true,
  success: true,
  'success-light': true,
  danger: true,
  'danger-light': true,
  ghost: true,
} satisfies Record<ButtonVariant, true>;

const SIZE_KEYS = {
  S: true,
  M: true,
  L: true,
} satisfies Record<ButtonSize, true>;

const VARIANTS = keysOf(VARIANT_KEYS);
const SIZES = keysOf(SIZE_KEYS);

const COLUMNS: Array<{ label: string; render: (variant: ButtonVariant) => ReactNode }> = [
  ...SIZES.map((size) => ({
    label: size,
    render: (variant: ButtonVariant) => (
      <Button variant={variant} size={size}>
        Submit
      </Button>
    ),
  })),
  {
    label: 'disabled',
    render: (variant) => (
      <Button variant={variant} disabled>
        Submit
      </Button>
    ),
  },
  {
    label: 'loading',
    render: (variant) => (
      <Button variant={variant} loading>
        Submit
      </Button>
    ),
  },
  {
    label: 'start icon',
    render: (variant) => (
      <Button variant={variant} startIcon={<Plus />}>
        Submit
      </Button>
    ),
  },
  {
    label: 'end icon',
    render: (variant) => (
      <Button variant={variant} endIcon={<Check />}>
        Submit
      </Button>
    ),
  },
];

const HEADER_STYLE = { fontSize: '1.1rem', fontWeight: 600, whiteSpace: 'nowrap' } satisfies CSSProperties;
const VARIANT_STYLE = { fontSize: '1.4rem' } satisfies CSSProperties;

const toUnionSummary = (keys: string[]) => keys.map((key) => `'${key}'`).join(' | ');

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Button> = {
  title: 'Next/Button',
  component: Button,
  args: {
    children: 'Submit',
    disabled: false,
    fullWidth: false,
    loading: false,
    onClick: fn(),
    size: 'S',
    variant: 'default',
  },
  argTypes: {
    children: {
      description: 'The label.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      description: 'If true, the Button ignores clicks and looks greyed out.',
    },
    endIcon: {
      control: false,
      description: 'An icon after the label. It is hidden from assistive technologies.',
      table: { type: { summary: 'ReactNode' } },
    },
    fullWidth: {
      description: 'If true, the Button takes the full width of its container.',
    },
    loading: {
      description: 'If true, a spinning loader replaces the start icon and the Button is disabled.',
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'The height of the Button. It is taller on small screens, like the legacy Button.',
      table: {
        type: { summary: toUnionSummary(SIZES) },
        defaultValue: { summary: 'S' },
      },
    },
    startIcon: {
      control: false,
      description: 'An icon before the label. It is hidden from assistive technologies.',
      table: { type: { summary: 'ReactNode' } },
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The colours of the Button.',
      table: {
        type: { summary: toUnionSummary(VARIANTS) },
        defaultValue: { summary: 'default' },
      },
    },
  },
  render: (args) => <Button {...args} />,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithIcons = {
  args: {
    startIcon: <Trash />,
    variant: 'danger-light',
    children: 'Delete',
  },
  name: 'with icons',
} satisfies Story;

export const FullWidth = {
  args: {
    fullWidth: true,
  },
  name: 'full width',
} satisfies Story;

export const AllVariantsAndSizes = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${1 + COLUMNS.length}, auto)`,
        gap: '1.6rem',
        alignItems: 'center',
        justifyContent: 'start',
        justifyItems: 'start',
      }}
    >
      <span style={HEADER_STYLE}>variant</span>
      {COLUMNS.map(({ label }) => (
        <span key={label} style={HEADER_STYLE}>
          {label}
        </span>
      ))}
      {VARIANTS.map((variant) => [
        <span key={variant} style={VARIANT_STYLE}>
          {variant}
        </span>,
        ...COLUMNS.map(({ label, render }) => <Fragment key={`${variant}-${label}`}>{render(variant)}</Fragment>),
      ])}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants and sizes',
} satisfies Story;
