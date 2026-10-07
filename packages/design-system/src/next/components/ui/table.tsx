'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  RawTable,
  RawTbody,
  RawTd,
  RawTh,
  RawThead,
  RawTr,
  type RawTableProps,
  type RawTbodyProps,
  type RawTdProps,
  type RawTheadProps,
  type RawThProps,
  type RawTrProps,
} from './raw-table';

/* -------------------------------------------------------------------------------------------------
 * Table
 * -----------------------------------------------------------------------------------------------*/

type TableOverflow = 'both' | 'left' | 'right';

const getOverflow = (element: HTMLElement): TableOverflow | undefined => {
  const maxScrollLeft = element.scrollWidth - element.clientWidth;

  if (maxScrollLeft <= 0) return undefined;

  if (element.scrollLeft <= 0) return 'right';

  if (element.scrollLeft >= maxScrollLeft) return 'left';

  return 'both';
};

/*
 * The legacy gradient has no token. It stays the same in the dark theme, as in the legacy Table
 */
const EDGE_SHADOW =
  'pointer-events-none absolute inset-y-0 z-1 w-2 from-neutral-300 to-transparent opacity-20 shadow-table';

interface TableProps extends RawTableProps {
  /**
   * Content under the rows, inside the frame of the table, such as a `TableFooter`
   */
  footer?: React.ReactNode;
  /**
   * The class of the frame around the table. `className` goes to the `<table>` element
   */
  containerClassName?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, footer, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [overflowing, setOverflowing] = React.useState<TableOverflow>();

    React.useEffect(() => {
      const element = scrollRef.current;

      if (!element) return undefined;

      setOverflowing(getOverflow(element));

      if (typeof ResizeObserver === 'undefined') return undefined;

      const observer = new ResizeObserver(() => setOverflowing(getOverflow(element)));
      observer.observe(element);

      return () => observer.disconnect();
    }, []);

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
      setOverflowing(getOverflow(event.currentTarget));
    };

    return (
      <div
        data-slot="table-container"
        className={cn(
          'overflow-hidden rounded-md border border-neutral-150 bg-neutral-0 shadow-table',
          containerClassName,
        )}
      >
        <div className="relative" data-overflowing={overflowing}>
          {overflowing === 'left' || overflowing === 'both' ? (
            <div aria-hidden data-slot="table-shadow-start" className={cn(EDGE_SHADOW, 'left-0 bg-linear-to-r')} />
          ) : null}
          <div ref={scrollRef} onScroll={handleScroll} className="overflow-x-auto px-6">
            <RawTable
              ref={ref}
              data-slot="table"
              className={cn('w-full border-collapse border-spacing-0 whitespace-nowrap', className)}
              {...props}
            />
          </div>
          {overflowing === 'right' || overflowing === 'both' ? (
            <div aria-hidden data-slot="table-shadow-end" className={cn(EDGE_SHADOW, 'right-0 bg-linear-to-l')} />
          ) : null}
        </div>
        {footer}
      </div>
    );
  },
);

Table.displayName = 'Table';

/* -------------------------------------------------------------------------------------------------
 * TableHeader / TableBody / TableRow
 * -----------------------------------------------------------------------------------------------*/

const TableHeader = React.forwardRef<HTMLTableSectionElement, RawTheadProps>(({ className, ...props }, ref) => (
  <RawThead ref={ref} data-slot="table-header" className={cn('border-b border-neutral-150', className)} {...props} />
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, RawTbodyProps>(({ className, ...props }, ref) => (
  <RawTbody ref={ref} data-slot="table-body" className={cn('[&>tr:last-of-type]:border-b-0', className)} {...props} />
));

TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<HTMLTableRowElement, RawTrProps>(({ className, ...props }, ref) => (
  <RawTr ref={ref} data-slot="table-row" className={cn('border-b border-neutral-150', className)} {...props} />
));

TableRow.displayName = 'TableRow';

/* -------------------------------------------------------------------------------------------------
 * TableHead / TableCell
 * -----------------------------------------------------------------------------------------------*/

const CELL = 'text-left align-middle -outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary-600';

const TableHead = React.forwardRef<HTMLTableCellElement, RawThProps>(({ className, children, ...props }, ref) => (
  <RawTh
    ref={ref}
    data-slot="table-head"
    className={cn(
      CELL,
      // The legacy `sigma` text style, which the legacy column titles use
      'h-14 px-4 py-0 text-2xs font-semibold text-neutral-600 uppercase first:px-1',
      className,
    )}
    {...props}
  >
    <div className="flex items-center">{children}</div>
  </RawTh>
));

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, RawTdProps>(({ className, ...props }, ref) => (
  <RawTd
    ref={ref}
    data-slot="table-cell"
    className={cn(CELL, 'p-4 text-sm text-neutral-800 first:px-1 first:py-0', className)}
    {...props}
  />
));

TableCell.displayName = 'TableCell';

/* -------------------------------------------------------------------------------------------------
 * TableCaption
 * -----------------------------------------------------------------------------------------------*/

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<'caption'>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn('caption-bottom py-4 text-xs text-neutral-600', className)}
      {...props}
    />
  ),
);

TableCaption.displayName = 'TableCaption';

/* -------------------------------------------------------------------------------------------------
 * TableFooter
 * -----------------------------------------------------------------------------------------------*/

interface TableFooterProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * The icon in the circle before the label, usually `<Plus />`
   */
  icon: React.ReactNode;
}

/**
 * The full-width action under the rows, such as "Add another field". Pass it to the `footer` prop of Table
 */
const TableFooter = React.forwardRef<HTMLButtonElement, TableFooterProps>(
  ({ className, icon, children, type = 'button', ...props }, ref) => (
    <div data-slot="table-footer">
      <hr className="m-0 h-px border-0 bg-neutral-150" />
      <button
        ref={ref}
        type={type}
        className={cn(
          'block w-full cursor-pointer rounded-b-md border-0 bg-primary-100 p-5 text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        <span className="flex items-center">
          <span
            aria-hidden
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-200 text-primary-600 [&_svg]:size-2.5 [&_svg_path]:fill-primary-600"
          >
            {icon}
          </span>
          <span className="pl-3 text-xs font-semibold text-primary-600">{children}</span>
        </span>
      </button>
    </div>
  ),
);

TableFooter.displayName = 'TableFooter';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter };
export type { TableProps, TableFooterProps, TableOverflow };
