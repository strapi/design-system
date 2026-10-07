'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { More as MoreHorizontalIcon } from '@strapi/icons';

import { DropdownMenu, DropdownMenuContent } from './dropdown-menu';

/* -------------------------------------------------------------------------------------------------
 * Root & list
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * The accessible name of the navigation landmark (the legacy `label` prop).
   * @default 'breadcrumb'
   */
  'aria-label'?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, 'aria-label': ariaLabel = 'breadcrumb', ...props }, ref) => {
    return <nav ref={ref} aria-label={ariaLabel} data-slot="breadcrumb" className={className} {...props} />;
  },
);

Breadcrumb.displayName = 'Breadcrumb';

/**
 * The `<ol>` of the crumbs. The first crumb moves left by its inner padding, so the text lines up with the
 * content under the breadcrumb.
 */
const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        data-slot="breadcrumb-list"
        className={cn('m-0 flex list-none flex-wrap items-center p-0 [&>li:first-child]:-ml-2', className)}
        {...props}
      />
    );
  },
);

BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => {
    return (
      <li ref={ref} data-slot="breadcrumb-item" className={cn('inline-flex items-center', className)} {...props} />
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

/* -------------------------------------------------------------------------------------------------
 * Link (CrumbLink)
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbLinkProps extends Omit<useRender.ComponentProps<'a'>, 'ref'> {}

/**
 * A link crumb. Renders an `<a>`, pass `render={<NavLink to="/" />}` to use a router link (the legacy `tag` prop).
 */
const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, render, ...props }, ref) => {
    return useRender({
      defaultTagName: 'a',
      ref,
      render,
      props: mergeProps<'a'>(
        {
          className: cn(
            'rounded-md px-2 py-1 text-xs leading-snug text-neutral-600 no-underline hover:bg-neutral-200 hover:text-neutral-700 focus:bg-neutral-200 focus:text-neutral-700',
            className,
          ),
        },
        { ...props, 'data-slot': 'breadcrumb-link' } as React.ComponentPropsWithoutRef<'a'>,
      ),
    });
  },
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

/* -------------------------------------------------------------------------------------------------
 * Page (Crumb)
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * Whether the crumb is the current page. A current crumb is bold and has `aria-current="page"`.
   * @default true
   */
  current?: boolean;
}

/**
 * A text crumb (the legacy `Crumb`). By default it is the current page.
 */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, current = true, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="breadcrumb-page"
        aria-current={current ? 'page' : undefined}
        className={cn('block px-2 py-1 text-xs text-neutral-800', current ? 'font-semibold' : 'font-normal', className)}
        {...props}
      />
    );
  },
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -----------------------------------------------------------------------------------------------*/

/**
 * The `/` between two crumbs. It is hidden from assistive technologies, so the list counts the crumbs only.
 */
const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="breadcrumb-separator"
        role="presentation"
        aria-hidden="true"
        className={cn('inline-flex px-1 text-xs text-neutral-500', className)}
        {...props}
      >
        {children ?? '/'}
      </li>
    );
  },
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/* -------------------------------------------------------------------------------------------------
 * Ellipsis
 * -----------------------------------------------------------------------------------------------*/

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="breadcrumb-ellipsis"
        role="presentation"
        aria-hidden="true"
        className={cn('flex size-6 items-center justify-center text-neutral-500 [&>svg]:size-4', className)}
        {...props}
      >
        <MoreHorizontalIcon />
        <span className="sr-only">More</span>
      </span>
    );
  },
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

/* -------------------------------------------------------------------------------------------------
 * Menu (CrumbSimpleMenu)
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbMenuProps extends Omit<MenuPrimitive.Trigger.Props, 'children'> {
  /**
   * The accessible name of the trigger.
   */
  'aria-label': string;
  /**
   * The menu items, `DropdownMenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * An icon after the label. The legacy CrumbSimpleMenu had none.
   */
  endIcon?: React.ReactNode;
  /**
   * An icon before the label.
   */
  icon?: React.ReactNode;
  /**
   * The content of the trigger.
   */
  label?: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  /**
   * Props of the `DropdownMenu` root, e.g. `open` and `onOpenChange`.
   */
  menuProps?: React.ComponentProps<typeof DropdownMenu>;
  /**
   * Props of the `DropdownMenuContent`, e.g. `align` or `className`.
   */
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>;
}

/**
 * A crumb that opens a menu (the legacy `CrumbSimpleMenu`), e.g. to jump to a sibling page.
 */
const BreadcrumbMenu = React.forwardRef<HTMLButtonElement, BreadcrumbMenuProps>(
  ({ children, className, contentProps, endIcon, icon, label, menuProps, onClose, onOpen, ...props }, ref) => {
    const handleOpenChange: NonNullable<MenuPrimitive.Root.Props['onOpenChange']> = (open, eventDetails) => {
      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }

      menuProps?.onOpenChange?.(open, eventDetails);
    };

    return (
      <DropdownMenu {...menuProps} onOpenChange={handleOpenChange}>
        <MenuPrimitive.Trigger
          ref={ref}
          data-slot="breadcrumb-menu-trigger"
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent px-2 py-1 text-xs font-semibold text-neutral-800 hover:bg-neutral-200 focus:bg-neutral-200 data-popup-open:bg-neutral-200 [&_svg]:size-3 [&_svg]:text-neutral-500',
            className,
          )}
          {...props}
        >
          {icon ? (
            <span aria-hidden className="flex">
              {icon}
            </span>
          ) : null}
          {label}
          {endIcon ? (
            <span aria-hidden className="flex">
              {endIcon}
            </span>
          ) : null}
        </MenuPrimitive.Trigger>
        <DropdownMenuContent {...contentProps}>{children}</DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

BreadcrumbMenu.displayName = 'BreadcrumbMenu';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbMenu,
};
export type { BreadcrumbProps, BreadcrumbLinkProps, BreadcrumbPageProps, BreadcrumbMenuProps };
