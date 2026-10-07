import * as React from 'react';

import { cn } from '@/lib/utils';
import { Cross, Search } from '@strapi/icons';

import { Field, FieldLabel } from './field';
import { Input, type InputProps } from './input';

/* -------------------------------------------------------------------------------------------------
 * SearchForm
 * -----------------------------------------------------------------------------------------------*/

type SearchFormProps = Omit<React.ComponentPropsWithoutRef<'form'>, 'role'>;

/**
 * A `<form>` with the `search` landmark role, to wrap a `Searchbar`.
 */
const SearchForm = React.forwardRef<HTMLFormElement, SearchFormProps>((props, ref) => (
  <form ref={ref} data-slot="search-form" {...props} role="search" />
));

SearchForm.displayName = 'SearchForm';

/* -------------------------------------------------------------------------------------------------
 * Searchbar
 * -----------------------------------------------------------------------------------------------*/

interface SearchbarProps extends Omit<InputProps, 'size' | 'type' | 'startAction' | 'endAction' | 'children'> {
  /**
   * The label of the input. It stays visually hidden.
   */
  children: React.ReactNode;
  name: string;
  value?: string;
  /**
   * Called by the clear button and by the Escape key, when the input has a value.
   */
  onClear: (event: React.SyntheticEvent) => void;
  /**
   * The accessible name of the clear button.
   * @default "Clear"
   */
  clearLabel?: string;
}

/**
 * A small search input with a visually hidden label, a search icon and a clear button.
 * `className` styles the outer box, the `ref` points at the `<input>`.
 */
const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  ({ name, children, value = '', onClear, clearLabel = 'Clear', className, onKeyDown, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isCompleting = value.length > 0;

    const ref = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const handleClear = (event: React.SyntheticEvent) => {
      onClear(event);
      inputRef.current?.focus();
    };

    return (
      <div
        data-slot="searchbar"
        className={cn('group/searchbar rounded-md border border-solid border-neutral-150', className)}
      >
        <Field name={name}>
          <div className="sr-only">
            <FieldLabel>{children}</FieldLabel>
          </div>
          <Input
            ref={ref}
            size="S"
            type="search"
            value={value}
            className="border-neutral-150 ps-2 text-neutral-800 [&>input::-webkit-search-cancel-button]:hidden [&>input::-webkit-search-decoration]:hidden [&>input::-webkit-search-results-button]:hidden [&>input::-webkit-search-results-decoration]:hidden"
            startAction={
              <Search aria-hidden className="shrink-0 text-neutral-500 group-focus-within/searchbar:text-primary-600" />
            }
            onKeyDown={(event) => {
              onKeyDown?.(event);
              event.stopPropagation();

              if (event.key === 'Escape' && isCompleting) {
                handleClear(event);
              }
            }}
            endAction={
              isCompleting ? (
                <button
                  type="button"
                  data-slot="searchbar-clear"
                  onClick={handleClear}
                  onMouseDown={(event) => {
                    // Keep the focus in the input
                    event.preventDefault();
                  }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md border border-solid border-transparent bg-transparent size-8 text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:bg-neutral-150 medium:p-0.5"
                >
                  <Cross aria-hidden focusable="false" />
                  <span className="sr-only">{clearLabel}</span>
                </button>
              ) : undefined
            }
            {...props}
          />
        </Field>
      </div>
    );
  },
);

Searchbar.displayName = 'Searchbar';

export { Searchbar, SearchForm };
export type { SearchbarProps, SearchFormProps };
