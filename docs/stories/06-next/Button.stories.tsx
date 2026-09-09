import { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@strapi/design-system';
import { Button, buttonVariants } from '@strapi/design-system/next';

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

const Check = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden>
    <path d="m29.061 10.061-16 16a1.5 1.5 0 0 1-2.125 0l-7-7a1.504 1.504 0 0 1 2.125-2.125L12 22.875 26.939 7.939a1.502 1.502 0 1 1 2.125 2.125z" />
  </svg>
);

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
    size: 'default',
    variant: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
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
    <Box>
      <div style={{ display: 'grid', gap: '1.6rem', justifyItems: 'start' }}>
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
            {TEXT_SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant} {size}
              </Button>
            ))}
            {ICON_SIZES.map((size) => (
              <Button key={size} variant={variant} size={size} aria-label={`${variant} ${size}`}>
                <Check />
              </Button>
            ))}
          </div>
        ))}
      </div>
    </Box>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'all variants and sizes',
} satisfies Story;
