import type * as React from 'react';
import { type CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  TEXT_COLOR_CLASSES,
  Typography,
  type TypographyFontWeight,
  type TypographyVariant,
} from '@strapi/design-system/next';

const keysOf = <Key extends string>(record: Record<Key, unknown>): Key[] => Object.keys(record) as Key[];

// `cva` does not expose its variants, so these records list them. A missing or extra key fails the type check
const VARIANT_TAGS = {
  alpha: 'h1',
  beta: 'h2',
  delta: 'h3',
  epsilon: 'p',
  omega: 'p',
  pi: 'p',
  sigma: 'p',
} satisfies Record<TypographyVariant, keyof React.JSX.IntrinsicElements>;

const FONT_WEIGHT_KEYS = {
  regular: true,
  semiBold: true,
  bold: true,
} satisfies Record<TypographyFontWeight, true>;

const VARIANTS = keysOf(VARIANT_TAGS);
const FONT_WEIGHTS = keysOf(FONT_WEIGHT_KEYS);
const TEXT_COLORS = keysOf(TEXT_COLOR_CLASSES);

const toUnionSummary = (keys: string[]) => keys.map((key) => `'${key}'`).join(' | ');

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const COLUMN_STYLE = { display: 'flex', flexDirection: 'column', gap: '1.6rem' } satisfies CSSProperties;

const meta: Meta<typeof Typography> = {
  title: 'Next/Typography',
  component: Typography,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    ellipsis: false,
    tag: 'span',
    textColor: 'neutral800',
    variant: 'omega',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'The text style of the legacy system.',
      table: { type: { summary: toUnionSummary(VARIANTS) }, defaultValue: { summary: 'omega' } },
    },
    textColor: {
      control: 'select',
      options: TEXT_COLORS,
      description: 'A legacy colour token.',
      table: { type: { summary: 'TextColor' }, defaultValue: { summary: 'currentcolor' } },
    },
    fontWeight: {
      control: 'select',
      options: FONT_WEIGHTS,
      description: 'Overrides the weight of the variant.',
      table: { type: { summary: toUnionSummary(FONT_WEIGHTS) } },
    },
    ellipsis: {
      description: 'Cuts the text to one line with an ellipsis.',
    },
    tag: {
      control: 'text',
      description: 'The HTML element to render.',
      table: { defaultValue: { summary: 'span' } },
    },
  },
  render: (args) => <Typography {...args} />,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Ellipsis = {
  args: {
    ellipsis: true,
    children:
      'A very long text that does not fit in its container, so it is cut with an ellipsis instead of wrapping on several lines',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem' }}>
        <Story />
      </div>
    ),
  ],
  name: 'ellipsis',
} satisfies Story;

export const AllVariants = {
  render: () => (
    <div style={COLUMN_STYLE}>
      {VARIANTS.map((variant) => (
        <Typography key={variant} tag={VARIANT_TAGS[variant]} variant={variant} textColor="neutral800">
          {variant}: The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants',
} satisfies Story;

export const FontWeights = {
  render: () => (
    <div style={COLUMN_STYLE}>
      {FONT_WEIGHTS.map((fontWeight) => (
        <Typography key={fontWeight} fontWeight={fontWeight} textColor="neutral800">
          {fontWeight}: The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'font weights',
} satisfies Story;

export const TextColors = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gap: '0.8rem 1.6rem' }}>
      {TEXT_COLORS.filter((color) => color !== 'currentcolor' && color !== 'inherit').map((color) => (
        <Typography key={color} textColor={color} variant="pi" fontWeight="bold">
          {color}
        </Typography>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'text colors',
} satisfies Story;
