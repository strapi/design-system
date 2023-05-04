import { Meta, StoryObj } from '@storybook/react';
import { Link, Flex } from '@strapi/design-system';
import { ChevronRight, ArrowLeft } from '@strapi/icons';

const meta: Meta<typeof Link> = {
  title: 'Design System/Components/Link',
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="center" gap={5}>
      <div>
        <Link href="https://strapi.io/" isExternal>
          External link
        </Link>
      </div>
      <div>
        <Link to="/somewhere-internal" startIcon={<ArrowLeft />}>
          Internal link
        </Link>
      </div>
      <div>
        <Link isExternal href="http://strapi.io" disabled>
          External disabled link
        </Link>
      </div>
      <div>
        <Link to="/somewhere-internal" disabled startIcon={<ArrowLeft />} endIcon={<ChevronRight />}>
          Internal disabled link
        </Link>
      </div>
    </Flex>
  ),

  name: 'base',
} satisfies Story;
