'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronLeft, ChevronRight } from '@strapi/icons';

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface PaginationContextValue {
  activePage: number;
  pageCount: number;
}

const PaginationContext = React.createContext<PaginationContextValue>({ activePage: 1, pageCount: 1 });

const usePagination = () => React.useContext(PaginationContext);

/* -------------------------------------------------------------------------------------------------
 * Pagination
 * -----------------------------------------------------------------------------------------------*/

interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * The current page, 1-based. It sets the active link and disables the previous or next link at the edges
   */
  activePage: number;
  /**
   * The number of pages
   */
  pageCount: number;
  /**
   * The accessible name of the navigation landmark
   * @default 'Pagination'
   */
  label?: string;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ activePage, pageCount, label = 'Pagination', className, ...props }, ref) => {
    const context = React.useMemo(() => ({ activePage, pageCount }), [activePage, pageCount]);

    return (
      <PaginationContext.Provider value={context}>
        <nav ref={ref} aria-label={label} data-slot="pagination" className={cn('flex', className)} {...props} />
      </PaginationContext.Provider>
    );
  },
);

Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      data-slot="pagination-content"
      className={cn('m-0 flex list-none items-center gap-1 p-0', className)}
      {...props}
    />
  ),
);

PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>((props, ref) => (
  <li ref={ref} data-slot="pagination-item" {...props} />
));

PaginationItem.displayName = 'PaginationItem';

/* -------------------------------------------------------------------------------------------------
 * Links
 * -----------------------------------------------------------------------------------------------*/

/*
 * The legacy `focus` mixin: a 2px ring 5px outside the link, drawn by `::after`
 */
const LINK =
  'relative flex rounded-md p-3 no-underline outline-none after:absolute after:-inset-1 after:rounded-xl after:border-2 after:border-transparent after:transition-all after:duration-200 focus-visible:after:-inset-1.5 focus-visible:after:border-primary-600';

type PaginationLinkBaseProps = useRender.ComponentProps<'a'>;

interface PaginationLinkProps extends PaginationLinkBaseProps {
  /**
   * The page this link goes to. It is the visible text, and the link is active when it equals `activePage`
   */
  number: number;
  /**
   * Overrides the active state that `number` and `activePage` compute
   */
  isActive?: boolean;
  /**
   * The accessible name, such as "Go to page 2". It is visually hidden
   */
  children?: React.ReactNode;
}

/**
 * A link to one page. Pass `render={<Link to="/2" />}` to render your router link
 */
const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ number, isActive: isActiveProp, children, className, render, ...props }, ref) => {
    const { activePage } = usePagination();
    const isActive = isActiveProp ?? activePage === number;

    return useRender({
      defaultTagName: 'a',
      ref,
      render,
      state: { slot: 'pagination-link', active: isActive },
      props: mergeProps<'a'>(
        {
          'aria-current': isActive ? 'page' : undefined,
          className: cn(
            LINK,
            'text-neutral-800 hover:shadow-filter data-active:bg-neutral-0 data-active:text-primary-700 data-active:shadow-filter',
            className,
          ),
          children: (
            <>
              <span className="sr-only">{children}</span>
              <span aria-hidden className={cn('text-xs', isActive && 'font-semibold')}>
                {number}
              </span>
            </>
          ),
        },
        props,
      ),
    });
  },
);

PaginationLink.displayName = 'PaginationLink';

interface PaginationStepLinkProps extends PaginationLinkBaseProps {
  /**
   * Disables the link. It defaults to true on the first page for the previous link and on the last page for the next
   * link
   */
  disabled?: boolean;
}

const ACTION_LINK =
  'text-2xs text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 [&_svg]:fill-current aria-disabled:pointer-events-none aria-disabled:text-neutral-300';

const createStepLink = (
  displayName: string,
  slot: string,
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  defaultLabel: string,
  isDisabled: (context: PaginationContextValue) => boolean,
) => {
  const StepLink = React.forwardRef<HTMLAnchorElement, PaginationStepLinkProps>(
    ({ disabled: disabledProp, children = defaultLabel, className, render, ...props }, ref) => {
      const context = usePagination();
      const disabled = disabledProp ?? isDisabled(context);

      return useRender({
        defaultTagName: 'a',
        ref,
        render,
        state: { slot, disabled },
        props: mergeProps<'a'>(
          {
            'aria-disabled': disabled || undefined,
            tabIndex: disabled ? -1 : undefined,
            className: cn(LINK, ACTION_LINK, className),
            children: (
              <>
                <span className="sr-only">{children}</span>
                <Icon aria-hidden />
              </>
            ),
          },
          props,
        ),
      });
    },
  );

  StepLink.displayName = displayName;

  return StepLink;
};

/**
 * The link to the previous page. Its children are the accessible name, "Go to previous page" by default
 */
const PaginationPrevious = createStepLink(
  'PaginationPrevious',
  'pagination-previous',
  ChevronLeft,
  'Go to previous page',
  ({ activePage }) => activePage <= 1,
);

/**
 * The link to the next page. Its children are the accessible name, "Go to next page" by default
 */
const PaginationNext = createStepLink(
  'PaginationNext',
  'pagination-next',
  ChevronRight,
  'Go to next page',
  ({ activePage, pageCount }) => activePage >= pageCount,
);

/* -------------------------------------------------------------------------------------------------
 * PaginationEllipsis
 * -----------------------------------------------------------------------------------------------*/

/**
 * Stands for the pages that are not listed. Its children are the accessible name, such as "And 23 other pages"
 */
const PaginationEllipsis = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} data-slot="pagination-ellipsis" className={cn('text-neutral-800', className)} {...props}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="text-xs">
        …
      </span>
    </div>
  ),
);

PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  usePagination,
};
export type { PaginationProps, PaginationLinkProps, PaginationStepLinkProps, PaginationContextValue };
