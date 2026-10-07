'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { CaretDown, Cross, Search } from '@strapi/icons';

/* -------------------------------------------------------------------------------------------------
 * SubNav
 * -----------------------------------------------------------------------------------------------*/

/**
 * The secondary navigation column of a page: a sticky, full height, `neutral100` `<nav>` 23.2rem wide.
 */
const SubNav = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(({ className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      data-slot="sub-nav"
      className={cn(
        'sticky top-0 z-1 h-screen w-58 overflow-y-auto border-r border-neutral-200 bg-neutral-100',
        className,
      )}
      {...props}
    />
  );
});

SubNav.displayName = 'SubNav';

/* -------------------------------------------------------------------------------------------------
 * SubNavHeader
 * -----------------------------------------------------------------------------------------------*/

const SubNavHeaderDivider = () => (
  <div data-slot="sub-nav-header-divider" aria-hidden className="h-px w-6 shrink-0 bg-neutral-200" />
);

interface SubNavHeaderProps {
  /**
   * The heading element of the label.
   * @default 'h2'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  /**
   * The id of the search input. The clear button gets an id derived from it.
   */
  id?: string;
  /**
   * The title of the sub navigation.
   */
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  placeholder?: string;
  /**
   * The accessible name of the search button and of the search input.
   * @default ''
   */
  searchLabel?: string;
  /**
   * The accessible name of the clear button.
   * @default 'Clear'
   */
  clearLabel?: string;
  /**
   * Shows a search button that turns the header into a search input.
   * @default false
   */
  searchable?: boolean;
  /**
   * The value of the search input.
   * @default ''
   */
  value?: string;
}

/**
 * The title of the sub navigation, with an optional search. The search button opens a search input that gets the
 * focus; Escape or leaving the input closes it and gives the focus back to the button.
 */
const SubNavHeader = React.forwardRef<HTMLDivElement, SubNavHeaderProps>(
  (
    {
      as: Heading = 'h2',
      className,
      clearLabel = 'Clear',
      id,
      label,
      onChange,
      onClear,
      onSubmit,
      placeholder,
      searchable = false,
      searchLabel = '',
      value = '',
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `sub-nav-search-${generatedId}`;
    const clearButtonId = `${inputId}-clear`;
    const [isSearchOpen, setSearchOpen] = React.useState(false);
    const wasSearchOpen = React.useRef(false);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const searchButtonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (isSearchOpen) {
        searchRef.current?.focus();
      } else if (wasSearchOpen.current) {
        searchButtonRef.current?.focus();
      }

      wasSearchOpen.current = isSearchOpen;
    }, [isSearchOpen]);

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      onClear?.(event);
      searchRef.current?.focus();
    };

    if (isSearchOpen) {
      return (
        <div ref={ref} data-slot="sub-nav-header" className={cn('px-4 pt-5 pb-2', className)}>
          <form role="search" onSubmit={onSubmit}>
            <label htmlFor={inputId} className="sr-only">
              {searchLabel}
            </label>
            <div className="relative flex items-center gap-2 rounded-md border border-neutral-150 bg-neutral-0 pl-4 text-neutral-800 transition duration-200 focus-within:border-primary-600 focus-within:ring-2 ring-primary-600">
              <Search aria-hidden className="size-4 shrink-0 text-neutral-500" />
              <input
                ref={searchRef}
                id={inputId}
                name="searchbar"
                type="search"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={(event) => {
                  if (event.relatedTarget?.id !== clearButtonId) {
                    setSearchOpen(false);
                  }
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();

                  if (event.key === 'Escape') {
                    setSearchOpen(false);
                  }
                }}
                className="block w-full min-w-0 border-0 bg-transparent py-2 pr-4 text-base leading-6 text-neutral-800 outline-none placeholder:text-neutral-600 focus:outline-none medium:py-1 medium:text-sm medium:leading-5.5 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {value.length > 0 ? (
                <button
                  id={clearButtonId}
                  type="button"
                  onClick={handleClear}
                  onMouseDown={(event) => event.preventDefault()}
                  className="mr-2 flex shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-2 text-neutral-500 hover:bg-neutral-100 medium:p-0.5 [&_svg]:size-3"
                >
                  <Cross aria-hidden focusable={false} />
                  <span className="sr-only">{clearLabel}</span>
                </button>
              ) : null}
            </div>
          </form>
          <div className="pt-4 pl-2">
            <SubNavHeaderDivider />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="sub-nav-header"
        className={cn('flex flex-col items-start pt-6 pr-4 pb-2 pl-6', className)}
      >
        <div className="flex w-full items-start justify-between gap-2">
          <Heading className="m-0 text-xl leading-tight font-semibold text-neutral-800 medium:text-lg">{label}</Heading>
          {searchable ? (
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-neutral-0 p-3 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600 active:bg-neutral-150 medium:p-2 [&_svg]:size-4"
            >
              <Search aria-hidden focusable={false} />
              <span className="sr-only">{searchLabel}</span>
            </button>
          ) : null}
        </div>
        <div className="pt-4">
          <SubNavHeaderDivider />
        </div>
      </div>
    );
  },
);

SubNavHeader.displayName = 'SubNavHeader';

/* -------------------------------------------------------------------------------------------------
 * SubNavSections
 * -----------------------------------------------------------------------------------------------*/

// The legacy theme spaces, so `spacing` keeps its meaning
const SPACES = ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px'];

interface SubNavSectionsProps extends React.ComponentPropsWithoutRef<'ol'> {
  /**
   * Lays the sections out in a row.
   * @default false
   */
  horizontal?: boolean;
  /**
   * The gap between the sections, as an index of the legacy spacing scale (2 is 8px).
   * @default 2
   */
  spacing?: number;
}

/**
 * The list of the sections. Each child is put in an `<li>`.
 */
const SubNavSections = React.forwardRef<HTMLOListElement, SubNavSectionsProps>(
  ({ children, className, horizontal = false, spacing = 2, style, ...props }, ref) => {
    return (
      <div className="pt-2 pb-4">
        <ol
          ref={ref}
          data-slot="sub-nav-sections"
          className={cn(
            'm-0 flex list-none p-0',
            horizontal ? 'flex-row items-center' : 'flex-col items-stretch',
            className,
          )}
          style={{ gap: SPACES[spacing] ?? `${spacing * 4}px`, ...style }}
          {...props}
        >
          {React.Children.map(children, (child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>{child}</li>
          ))}
        </ol>
      </div>
    );
  },
);

SubNavSections.displayName = 'SubNavSections';

/* -------------------------------------------------------------------------------------------------
 * SubNavSection
 * -----------------------------------------------------------------------------------------------*/

interface SubNavSectionProps {
  /**
   * A count shown at the end of the label.
   */
  badgeLabel?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Makes the label a button that shows and hides the links.
   * @default false
   */
  collapsable?: boolean;
  /**
   * The id of the list of links.
   */
  id?: string;
  label: string;
}

const sigma = 'text-2xs font-semibold uppercase';

/**
 * A titled group of links. Each child is put in an `<li>`.
 */
const SubNavSection = React.forwardRef<HTMLDivElement, SubNavSectionProps>(
  ({ badgeLabel, children, className, collapsable = false, id, label }, ref) => {
    const [isOpen, setOpen] = React.useState(true);
    const generatedId = React.useId();
    const listId = id ?? `sub-nav-section-${generatedId}`;

    return (
      <div ref={ref} data-slot="sub-nav-section" className={cn('flex flex-col items-stretch gap-1', className)}>
        <div className="pt-2 pr-4 pb-2 pl-6">
          <div className={cn('relative', badgeLabel && 'pr-6')}>
            {collapsable ? (
              <button
                type="button"
                onClick={() => setOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls={listId}
                className="flex cursor-pointer items-center border-0 bg-transparent p-0 text-left"
              >
                <span className={cn('pr-1 text-neutral-600', sigma)}>{label}</span>
                <CaretDown
                  aria-hidden
                  className={cn('size-3 text-neutral-500', !isOpen && '[transform:rotateX(180deg)]')}
                />
              </button>
            ) : (
              <div className="flex items-center">
                <span className={cn('pr-1 text-neutral-600', sigma)}>{label}</span>
              </div>
            )}
            {badgeLabel ? (
              <span
                data-slot="sub-nav-section-badge"
                className="absolute top-1/2 right-0 inline-flex min-w-5 -translate-y-1/2 items-center justify-center rounded-md bg-neutral-150 px-2 py-1"
              >
                <span className={cn('leading-2.5 text-neutral-600', sigma)}>{badgeLabel}</span>
              </span>
            ) : null}
          </div>
        </div>
        {!collapsable || isOpen ? (
          <ol id={listId} className="m-0 list-none p-0">
            {React.Children.map(children, (child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{child}</li>
            ))}
          </ol>
        ) : null}
      </div>
    );
  },
);

SubNavSection.displayName = 'SubNavSection';

/* -------------------------------------------------------------------------------------------------
 * SubNavLinkSection
 * -----------------------------------------------------------------------------------------------*/

interface SubNavLinkSectionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * The id of the list of links.
   */
  id?: string;
  label: string;
}

/**
 * A collapsible group of links inside a section. Give its links `isSubSectionChild`.
 */
const SubNavLinkSection = React.forwardRef<HTMLDivElement, SubNavLinkSectionProps>(
  ({ children, className, id, label }, ref) => {
    const [isOpen, setOpen] = React.useState(true);
    const generatedId = React.useId();
    const listId = id ?? `sub-nav-link-section-${generatedId}`;

    return (
      <div ref={ref} data-slot="sub-nav-link-section" className={className}>
        <div className="flex justify-between pt-2 pr-4 pb-2 pl-7">
          <button
            type="button"
            onClick={() => setOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={listId}
            className="flex cursor-pointer items-center border-0 bg-transparent p-0"
          >
            <CaretDown
              aria-hidden
              className={cn('size-3 text-neutral-700', !isOpen && '[transform:rotateX(180deg)]')}
            />
            <span className="pl-2 text-base font-medium text-neutral-800 medium:text-sm">{label}</span>
          </button>
        </div>
        {isOpen ? (
          <ul id={listId} className="m-0 list-none p-0">
            {React.Children.map(children, (child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{child}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
);

SubNavLinkSection.displayName = 'SubNavLinkSection';

/* -------------------------------------------------------------------------------------------------
 * SubNavLink
 * -----------------------------------------------------------------------------------------------*/

interface SubNavLinkProps extends Omit<useRender.ComponentProps<'a'>, 'ref'> {
  /**
   * Colours the bullet. A link with the `active` class (set by a router `NavLink`) or `aria-current="page"`
   * gets the whole active style.
   */
  active?: boolean;
  /**
   * Replaces the bullet.
   */
  icon?: React.ReactNode;
  /**
   * Indents the link under a `SubNavLinkSection`.
   * @default false
   */
  isSubSectionChild?: boolean;
  /**
   * Shows a bullet at the end of the link.
   * @default false
   */
  withBullet?: boolean;
}

const bullet = 'size-1 shrink-0 rounded-full';

/**
 * A link of the sub navigation. Renders an `<a>`, pass `render={<NavLink to="/" />}` to use a router link
 * (the legacy `tag` prop).
 */
const SubNavLink = React.forwardRef<HTMLAnchorElement, SubNavLinkProps>(
  ({ active, children, className, icon, isSubSectionChild = false, render, withBullet = false, ...props }, ref) => {
    return useRender({
      defaultTagName: 'a',
      ref,
      render,
      props: mergeProps<'a'>(
        {
          className: cn(
            'group/sub-nav-link flex items-center justify-between bg-neutral-100 py-2 text-neutral-800 no-underline focus-visible:-outline-offset-2',
            isSubSectionChild ? 'pl-9' : 'pl-7',
            '[&.active]:border-r-2 [&.active]:border-primary-600 [&.active]:bg-primary-100 [&.active]:font-medium [&.active]:text-primary-700',
            'aria-[current=page]:border-r-2 aria-[current=page]:border-primary-600 aria-[current=page]:bg-primary-100 aria-[current=page]:font-medium aria-[current=page]:text-primary-700',
            className,
          ),
          children: (
            <>
              <span className="flex items-center">
                {icon ? (
                  <span data-slot="sub-nav-link-icon" className="flex text-neutral-600 [&_svg]:size-4">
                    {icon}
                  </span>
                ) : (
                  <span
                    data-slot="sub-nav-link-bullet"
                    className={cn(
                      bullet,
                      active ? 'bg-primary-600' : 'bg-neutral-600',
                      'group-[.active]/sub-nav-link:bg-primary-600 group-aria-[current=page]/sub-nav-link:bg-primary-600',
                    )}
                  />
                )}
                <span className="pl-2 text-base medium:text-sm">{children}</span>
              </span>
              {withBullet ? (
                <span className="flex items-center pr-4">
                  <span data-slot="sub-nav-link-end-bullet" className={cn(bullet, 'bg-primary-600')} />
                </span>
              ) : null}
            </>
          ),
        },
        { ...props, 'data-slot': 'sub-nav-link' } as React.ComponentPropsWithoutRef<'a'>,
      ),
    });
  },
);

SubNavLink.displayName = 'SubNavLink';

export { SubNav, SubNavHeader, SubNavSections, SubNavSection, SubNavLinkSection, SubNavLink };
export type { SubNavHeaderProps, SubNavSectionsProps, SubNavSectionProps, SubNavLinkSectionProps, SubNavLinkProps };
