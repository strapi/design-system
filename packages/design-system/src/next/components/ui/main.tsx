import * as React from 'react';

import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Main
 * -----------------------------------------------------------------------------------------------*/

interface MainProps extends React.ComponentPropsWithoutRef<'main'> {
  /**
   * The id of the element that names the landmark (usually the page title).
   * @default 'main-content-title'
   */
  labelledBy?: string;
}

/**
 * The `<main>` landmark of a page. It is the target of `SkipToContent`, so it has the id `main-content`
 * and is focusable by script (`tabIndex={-1}`) without showing the focus outline.
 */
const Main = React.forwardRef<HTMLElement, MainProps>(
  ({ className, labelledBy = 'main-content-title', ...props }, ref) => {
    return (
      <main
        ref={ref}
        data-slot="main"
        aria-labelledby={labelledBy}
        id="main-content"
        tabIndex={-1}
        className={cn('focus-visible:outline-none', className)}
        {...props}
      />
    );
  },
);

Main.displayName = 'Main';

/* -------------------------------------------------------------------------------------------------
 * SkipToContent
 * -----------------------------------------------------------------------------------------------*/

interface SkipToContentProps extends React.ComponentPropsWithoutRef<'a'> {}

/**
 * A link, hidden off screen until it gets the keyboard focus, that jumps to `<Main>`.
 */
const SkipToContent = React.forwardRef<HTMLAnchorElement, SkipToContentProps>(
  ({ className, href = '#main-content', ...props }, ref) => {
    return (
      <a
        ref={ref}
        data-slot="skip-to-content"
        href={href}
        className={cn(
          'absolute -top-full -left-full z-9999 rounded-md bg-primary-600 p-3 text-neutral-0 no-underline focus:top-3 focus:left-3',
          className,
        )}
        {...props}
      />
    );
  },
);

SkipToContent.displayName = 'SkipToContent';

export { Main, SkipToContent };
export type { MainProps, SkipToContentProps };
