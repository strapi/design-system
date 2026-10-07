import { Fragment, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, type BadgeProps } from '@strapi/design-system/next';

type Variant = NonNullable<BadgeProps['variant']>;
type Size = NonNullable<BadgeProps['size']>;

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// `cva` does not expose its variants, so these records list them. A missing or extra key fails the type check
const VARIANT_KEYS = {
  default: true,
  neutral: true,
  primary: true,
  secondary: true,
  alternative: true,
  success: true,
  warning: true,
  danger: true,
} satisfies Record<Variant, true>;

const SIZE_KEYS = { default: true, sm: true } satisfies Record<Size, true>;

const VARIANTS = keysOf(VARIANT_KEYS);
const SIZES = keysOf(SIZE_KEYS);

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const HEADER_STYLE = { fontSize: '1.1rem', fontWeight: 600, whiteSpace: 'nowrap' } satisfies CSSProperties;
const VARIANT_STYLE = { fontSize: '1.4rem' } satisfies CSSProperties;

const toUnionSummary = (keys: string[]) => keys.map((key) => `'${key}'`).join(' | ');

const meta: Meta<typeof Badge> = {
  title: 'Next/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'default',
    active: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The colours. `default` is the legacy Badge without a variant.',
      table: { type: { summary: toUnionSummary(VARIANTS) }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      table: { type: { summary: toUnionSummary(SIZES) }, defaultValue: { summary: 'default' } },
    },
    active: {
      description: 'Overrides the colours with `primary200` and `primary600`.',
    },
  },
  render: (args) => <Badge {...args} />,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Base = {
  name: 'base',
} satisfies Story;

export const AllVariantsAndSizes = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: '1.6rem',
        alignItems: 'center',
        justifyContent: 'start',
        justifyItems: 'start',
      }}
    >
      <span style={HEADER_STYLE}>variant</span>
      <span style={HEADER_STYLE}>default</span>
      <span style={HEADER_STYLE}>sm</span>
      <span style={HEADER_STYLE}>active</span>
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span style={VARIANT_STYLE}>{variant}</span>
          <Badge variant={variant}>Badge</Badge>
          <Badge variant={variant} size="sm">
            Badge
          </Badge>
          <Badge variant={variant} active>
            Badge
          </Badge>
        </Fragment>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants and sizes',
} satisfies Story;
