import { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeft, ArrowRight } from '@strapi/icons';

import { Link, TEXT_COLOR_CLASSES } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Link> = {
  title: 'Next/Link',
  component: Link,
  args: {
    children: 'Strapi',
    color: 'primary600',
    disabled: false,
    href: 'https://strapi.io',
    isExternal: false,
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(TEXT_COLOR_CLASSES),
      description: 'The text and icon colour, as a legacy colour token.',
      table: { type: { summary: 'TextColor' }, defaultValue: { summary: 'primary600' } },
    },
    disabled: {
      description: 'Takes the link out of the tab order and greys it out.',
    },
    isExternal: {
      description: 'Opens the link in a new tab and adds the external icon, unless there is an `endIcon`.',
    },
    startIcon: { control: false, table: { type: { summary: 'ReactNode' } } },
    endIcon: { control: false, table: { type: { summary: 'ReactNode' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Base = {
  name: 'base',
} satisfies Story;

export const External = {
  args: {
    isExternal: true,
  },
  name: 'external',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>
      <Link href="#">A link</Link>
      <Link href="https://strapi.io" isExternal>
        An external link
      </Link>
      <Link href="#" startIcon={<ArrowLeft />}>
        Back
      </Link>
      <Link href="#" endIcon={<ArrowRight />}>
        Next
      </Link>
      <Link href="#" color="danger600">
        A danger link
      </Link>
      <Link href="#" disabled startIcon={<ArrowLeft />}>
        A disabled link
      </Link>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
