import { Meta, StoryObj } from '@storybook/react';
import { Pagination, PreviousLink, NextLink, PageLink, Dots } from '@strapi/design-system/v2';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Components/v2/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base = {
  render: () => (
    <Pagination activePage={1} pageCount={26}>
      <PreviousLink href="/1">Go to previous page</PreviousLink>
      <PageLink number={1} href="/1">
        Go to page 1
      </PageLink>
      <PageLink number={2} href="/2">
        Go to page 2
      </PageLink>
      <Dots>And 23 other links</Dots>
      <PageLink number={25} href="/25">
        Go to page 3
      </PageLink>
      <PageLink number={26} href="/26">
        Go to page 26
      </PageLink>
      <NextLink href="/3">Go to next page</NextLink>
    </Pagination>
  ),

  name: 'base',
} satisfies Story;
