import { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Base = {
  render: () => <Loader>Loading content...</Loader>,
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Loader>Loading content...</Loader>
        `,
      },
    },
  },
} satisfies Story;

export const Small = {
  render: () => <Loader small>Loading content...</Loader>,
  name: 'small',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Loader small>Loading content...</Loader>
        `,
      },
    },
  },
} satisfies Story;
