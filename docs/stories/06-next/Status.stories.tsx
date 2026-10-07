import { Fragment, type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Status, type StatusProps } from '@strapi/design-system/next';

type Variant = NonNullable<StatusProps['variant']>;
type Size = NonNullable<StatusProps['size']>;

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// `cva` does not expose its variants, so these records list them. A missing or extra key fails the type check
const VARIANT_KEYS = {
  primary: true,
  secondary: true,
  alternative: true,
  neutral: true,
  success: true,
  warning: true,
  danger: true,
} satisfies Record<Variant, true>;

const SIZE_KEYS = { default: true, sm: true, xs: true } satisfies Record<Size, true>;

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
const TEXT_STYLE = { fontSize: '1.4rem' } satisfies CSSProperties;
const BOLD_STYLE = { fontSize: '1.2rem', fontWeight: 600 } satisfies CSSProperties;

const toUnionSummary = (keys: string[]) => keys.map((key) => `'${key}'`).join(' | ');

const meta: Meta<typeof Status> = {
  title: 'Next/Status',
  component: Status,
  args: {
    variant: 'success',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      table: { type: { summary: toUnionSummary(VARIANTS) }, defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'The padding: 20px by 16px for `default`, 8px by 4px for `sm`, 6px by 2px for `xs`.',
      table: { type: { summary: toUnionSummary(SIZES) }, defaultValue: { summary: 'default' } },
    },
  },
  render: (args) => (
    <Status {...args}>
      <span style={TEXT_STYLE}>
        Hello world <b>thing happens</b>
      </span>
    </Status>
  ),
};

export default meta;

type Story = StoryObj<typeof Status>;

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
      {SIZES.map((size) => (
        <span key={size} style={HEADER_STYLE}>
          {size}
        </span>
      ))}
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span style={TEXT_STYLE}>{variant}</span>
          {SIZES.map((size) => (
            <Status key={size} variant={variant} size={size}>
              <span style={BOLD_STYLE}>Published</span>
            </Status>
          ))}
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
