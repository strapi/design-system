import { Fragment, type ComponentProps, type CSSProperties, type ReactNode } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, buttonVariants } from '@strapi/design-system/next';
import { fn } from 'storybook/test';

import type { VariantProps } from 'class-variance-authority';

type Variant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
type Size = NonNullable<VariantProps<typeof buttonVariants>['size']>;

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// `cva` does not expose its variants, so these records list them. A missing or extra key fails the type check
const VARIANT_KEYS = {
  default: true,
  outline: true,
  secondary: true,
  ghost: true,
  destructive: true,
  link: true,
} satisfies Record<Variant, true>;

const SIZE_KINDS = {
  default: 'text',
  xs: 'text',
  sm: 'text',
  lg: 'text',
  icon: 'icon',
  'icon-xs': 'icon',
  'icon-sm': 'icon',
  'icon-lg': 'icon',
} satisfies Record<Size, 'text' | 'icon'>;

const VARIANTS = keysOf(VARIANT_KEYS);
const SIZES = keysOf(SIZE_KINDS);

const TEXT_SIZES = SIZES.filter((size) => SIZE_KINDS[size] === 'text');
const ICON_SIZES = SIZES.filter((size) => SIZE_KINDS[size] === 'icon');

const Check = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
    <path d="m29.061 10.061-16 16a1.5 1.5 0 0 1-2.125 0l-7-7a1.504 1.504 0 0 1 2.125-2.125L12 22.875 26.939 7.939a1.502 1.502 0 1 1 2.125 2.125z" />
  </svg>
);

const COLUMNS: Array<{ label: string; render: (variant: Variant) => ReactNode }> = [
  ...TEXT_SIZES.map((size) => ({
    label: size,
    render: (variant: Variant) => (
      <Button variant={variant} size={size}>
        submit
      </Button>
    ),
  })),
  ...ICON_SIZES.map((size) => ({
    label: size,
    render: (variant: Variant) => (
      <Button variant={variant} size={size} aria-label={`${variant} ${size}`}>
        <Check />
      </Button>
    ),
  })),
  {
    label: 'disabled',
    render: (variant) => (
      <Button variant={variant} disabled>
        submit
      </Button>
    ),
  },
  {
    label: 'icon start',
    render: (variant) => (
      <Button variant={variant}>
        <Check data-icon="inline-start" />
        submit
      </Button>
    ),
  },
  {
    label: 'icon end',
    render: (variant) => (
      <Button variant={variant}>
        submit
        <Check data-icon="inline-end" />
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
    children: 'submit',
    disabled: false,
    onClick: fn(),
    size: 'default',
    variant: 'default',
  },
  argTypes: {
    children: {
      description:
        'The label. To add an icon, put an SVG with `data-icon="inline-start"` or `data-icon="inline-end"` next to the text.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      description: 'If true, the Button ignores clicks and looks dimmed.',
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'The height and padding of the Button. An `icon` size makes a square Button for one icon.',
      table: {
        type: { summary: toUnionSummary(SIZES) },
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The colour and border of the Button.',
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
