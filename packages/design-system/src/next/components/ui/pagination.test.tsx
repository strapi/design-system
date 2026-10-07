import * as React from 'react';

import { render, screen } from '@test/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

const renderPagination = (activePage: number, pageCount = 10) =>
  render(
    <Pagination activePage={activePage} pageCount={pageCount}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/${activePage - 1}`} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink number={1} href="/1">
            Go to page 1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink number={2} href="/2">
            Go to page 2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis>And 7 other pages</PaginationEllipsis>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink number={10} href="/10">
            Go to page 10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`/${activePage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  );

describe('Pagination', () => {
  it('renders a labelled navigation with a list of links', () => {
    renderPagination(2);

    const nav = screen.getByRole('navigation', { name: 'Pagination' });

    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.getByRole('link', { name: 'Go to page 1' })).toHaveAttribute('href', '/1');
    expect(screen.getByText('And 7 other pages')).toBeInTheDocument();
  });

  it('marks the active page', () => {
    renderPagination(2);

    expect(screen.getByRole('link', { name: 'Go to page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Go to page 1' })).not.toHaveAttribute('aria-current');
  });

  it('disables the previous link on the first page', () => {
    renderPagination(1);

    const previous = screen.getByRole('link', { name: 'Go to previous page' });

    expect(previous).toHaveAttribute('aria-disabled', 'true');
    expect(previous).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('link', { name: 'Go to next page' })).not.toHaveAttribute('aria-disabled');
  });

  it('disables the next link on the last page', () => {
    renderPagination(10);

    expect(screen.getByRole('link', { name: 'Go to next page' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Go to previous page' })).not.toHaveAttribute('aria-disabled');
  });

  it('takes a custom label and renders a custom link element', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'> & { to: string }>(
      ({ to, ...props }, ref) => <a ref={ref} href={`#${to}`} {...props} />,
    );
    const ref = React.createRef<HTMLAnchorElement>();

    render(
      <Pagination activePage={1} pageCount={2} label="Pages of results">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink ref={ref} number={2} render={<RouterLink to="/2" />}>
              Go to page 2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation', { name: 'Pages of results' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to page 2' })).toHaveAttribute('href', '#/2');
    expect(ref.current).toBe(screen.getByRole('link', { name: 'Go to page 2' }));
  });
});
