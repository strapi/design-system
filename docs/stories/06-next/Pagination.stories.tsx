import { Meta, StoryObj } from '@storybook/react-vite';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const PAGE_COUNT = 26;

const Example = ({ activePage }: { activePage: number }) => (
  <Pagination activePage={activePage} pageCount={PAGE_COUNT}>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href={`#${activePage - 1}`} />
      </PaginationItem>
      {[1, 2].map((number) => (
        <PaginationItem key={number}>
          <PaginationLink number={number} href={`#${number}`}>
            Go to page {number}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationEllipsis>And 22 other pages</PaginationEllipsis>
      </PaginationItem>
      {[25, 26].map((number) => (
        <PaginationItem key={number}>
          <PaginationLink number={number} href={`#${number}`}>
            Go to page {number}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext href={`#${activePage + 1}`} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

const meta: Meta<typeof Pagination> = {
  title: 'Next/Pagination',
  component: Pagination,
  args: {
    activePage: 1,
    pageCount: PAGE_COUNT,
    label: 'Pagination',
  },
  argTypes: {
    activePage: {
      control: { type: 'number', min: 1, max: PAGE_COUNT },
      description: 'The current page, 1-based.',
    },
    pageCount: { control: false, description: 'The number of pages.' },
    label: {
      description: 'The accessible name of the navigation landmark.',
      table: { defaultValue: { summary: 'Pagination' } },
    },
  },
  render: ({ activePage }) => <Example activePage={activePage} />,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base = {
  name: 'base',
} satisfies Story;

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      <Example activePage={1} />
      <Example activePage={2} />
      <Example activePage={PAGE_COUNT} />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'first, middle and last page',
} satisfies Story;
