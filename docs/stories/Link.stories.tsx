import { Meta, StoryObj } from '@storybook/react';
import { Flex, Link } from '@strapi/design-system';
import { Strapi } from '@strapi/icons/symbols';

const meta: Meta<typeof Link> = {
  title: 'Design System/Components/Link',
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <Link isExternal href="https://strapi.io/">
        External link
      </Link>
    </Flex>
  ),

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <Link isExternal href="https://strapi.io/" disabled>
        Disabled link
      </Link>
    </Flex>
  ),

  name: 'disabled',
} satisfies Story;

export const Icons = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <div>
        <Link isExternal href="https://strapi.io/" startIcon={<Strapi />}>
          Strapi
        </Link>
      </div>
      <div>
        <Link isExternal href="https://strapi.io/" endIcon={<Strapi />}>
          Strapi
        </Link>
      </div>
    </Flex>
  ),

  name: 'icons',
} satisfies Story;
