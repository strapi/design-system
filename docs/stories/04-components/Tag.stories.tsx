import { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '@strapi/design-system';
import { Information, Cross } from '@strapi/icons';
import { outdent } from 'outdent';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Base = {
  render: () => <Tag icon={<Information aria-hidden />}>Hello world</Tag>,
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tag icon={<Information aria-hidden />}>Hello world</Tag>
        `,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  render: () => (
    <Tag icon={<Information aria-hidden />} disabled>
      Hello world
    </Tag>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tag icon={<Information aria-hidden />} disabled>
          Hello world
        </Tag>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const Filter = {
  render: () => (
    <Tag label="remove filter" icon={<Cross aria-hidden />} onClick={() => console.log('filter removed')}>
      date is null
    </Tag>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tag label="remove filter" icon={<Cross aria-hidden />} onClick={() => console.log('filter removed')}>
          date is null
        </Tag>
        `,
      },
    },
  },
  name: 'filter',
} satisfies Story;
