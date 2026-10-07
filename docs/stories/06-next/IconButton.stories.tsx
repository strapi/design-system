import { Fragment, type CSSProperties, type ReactNode } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type ButtonVariant, IconButton, IconButtonGroup, type IconButtonProps } from '@strapi/design-system/next';
import { Duplicate, More, Pencil, Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

type IconButtonSize = NonNullable<IconButtonProps['size']>;

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
  XS: true,
  S: true,
  M: true,
  L: true,
} satisfies Record<IconButtonSize, true>;

const VARIANTS = keysOf(VARIANT_KEYS);
const SIZES = keysOf(SIZE_KEYS);

const COLUMNS: Array<{ label: string; render: (variant: ButtonVariant) => ReactNode }> = [
  ...SIZES.map((size) => ({
    label: size,
    render: (variant: ButtonVariant) => (
      <IconButton variant={variant} size={size} label={`${variant} ${size}`} withTooltip={false}>
        <More />
      </IconButton>
    ),
  })),
  {
    label: 'disabled',
    render: (variant) => (
      <IconButton variant={variant} label={`${variant} disabled`} disabled withTooltip={false}>
        <More />
      </IconButton>
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

const meta: Meta<typeof IconButton> = {
  title: 'Next/IconButton',
  component: IconButton,
  args: {
    disabled: false,
    label: 'More actions',
    onClick: fn(),
    size: 'S',
    variant: 'tertiary',
    withTooltip: true,
  },
  argTypes: {
    label: {
      description: 'The accessible name. It is not shown, except in the tooltip.',
    },
    disabled: {
      description: 'If true, the IconButton ignores clicks but stays focusable, with `aria-disabled="true"`.',
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'The padding around the icon.',
      table: { type: { summary: toUnionSummary(SIZES) }, defaultValue: { summary: 'S' } },
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The colours, the same as the Button.',
      table: { type: { summary: toUnionSummary(VARIANTS) }, defaultValue: { summary: 'tertiary' } },
    },
    withTooltip: {
      description: 'Shows the label in a tooltip on hover and focus.',
    },
  },
  render: (args) => (
    <IconButton {...args}>
      <More />
    </IconButton>
  ),
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Group = {
  render: () => (
    <IconButtonGroup>
      <IconButton label="Edit">
        <Pencil />
      </IconButton>
      <IconButton label="Clone">
        <Duplicate />
      </IconButton>
      <IconButton label="Delete" variant="danger">
        <Trash />
      </IconButton>
    </IconButtonGroup>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'group',
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
