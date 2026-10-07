import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type ButtonVariant, LinkButton } from '@strapi/design-system/next';
import { ArrowLeft, ExternalLink } from '@strapi/icons';

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// A missing or extra key fails the type check
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

const VARIANTS = keysOf(VARIANT_KEYS);
const SIZES = ['S', 'M', 'L'] as const;

const ROW_STYLE = { display: 'flex', flexWrap: 'wrap', gap: '1.6rem', alignItems: 'center' } satisfies CSSProperties;

const toUnionSummary = (keys: readonly string[]) => keys.map((key) => `'${key}'`).join(' | ');

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof LinkButton> = {
  title: 'Next/LinkButton',
  component: LinkButton,
  args: {
    children: 'Back to the list',
    disabled: false,
    href: 'https://strapi.io',
    isExternal: false,
    loading: false,
    size: 'S',
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The colours, the same as the Button.',
      table: { type: { summary: toUnionSummary(VARIANTS) }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      table: { type: { summary: toUnionSummary(SIZES) }, defaultValue: { summary: 'S' } },
    },
    disabled: {
      description: 'Takes the link out of the tab order and greys it out.',
    },
    isExternal: {
      description: 'Opens the link in a new tab.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Base = {
  name: 'base',
} satisfies Story;

export const WithIcons = {
  args: {
    startIcon: <ArrowLeft />,
    variant: 'tertiary',
  },
  name: 'with icons',
} satisfies Story;

export const External = {
  args: {
    children: 'Read the documentation',
    endIcon: <ExternalLink />,
    isExternal: true,
    variant: 'secondary',
  },
  name: 'external',
} satisfies Story;

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={ROW_STYLE}>
          {SIZES.map((size) => (
            <LinkButton key={size} href="#" variant={variant} size={size}>
              {variant} {size}
            </LinkButton>
          ))}
          <LinkButton href="#" variant={variant} disabled>
            disabled
          </LinkButton>
        </div>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants',
} satisfies Story;
