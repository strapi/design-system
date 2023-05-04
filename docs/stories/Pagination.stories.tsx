import { Meta, StoryObj } from '@storybook/react';
import { Dots, NextLink, PageLink, Pagination, PreviousLink } from '@strapi/design-system';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Components/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base = {
  render: () => (
    <Pagination activePage={1} pageCount={26}>
      <PreviousLink to="/1">Go to previous page</PreviousLink>
      <PageLink number={1} to="/1">
        Go to page 1
      </PageLink>
      <PageLink number={2} to="/2">
        Go to page 2
      </PageLink>
      <Dots>And 23 other links</Dots>
      <PageLink number={25} to="/25">
        Go to page 3
      </PageLink>
      <PageLink number={26} to="/26">
        Go to page 26
      </PageLink>
      <NextLink to="/3">Go to next page</NextLink>
    </Pagination>
  ),

  name: 'base',
} satisfies Story;
