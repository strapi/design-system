import { Meta, StoryObj } from '@storybook/react-vite';

import { BaseLink } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof BaseLink> = {
  title: 'Next/BaseLink',
  component: BaseLink,
  args: {
    children: 'Strapi',
    disabled: false,
    href: 'https://strapi.io',
    isExternal: false,
  },
  argTypes: {
    disabled: {
      description: 'Takes the link out of the tab order, sets `aria-disabled` and ignores the pointer.',
    },
    isExternal: {
      description: 'Opens the link in a new tab, with `rel="noreferrer noopener"`.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseLink>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem', fontSize: '1.4rem' }}
    >
      <BaseLink href="#">A link</BaseLink>
      <BaseLink href="https://strapi.io" isExternal>
        An external link
      </BaseLink>
      <BaseLink href="#" disabled>
        A disabled link
      </BaseLink>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'states',
} satisfies Story;
