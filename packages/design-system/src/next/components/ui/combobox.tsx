import * as React from 'react';

import { cn } from '@/lib/utils';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { useVirtualizer } from '@tanstack/react-virtual';

import {
  CaretDownIcon,
  PickerClearButton,
  PickerLoader,
  getNodeText,
  pickerFrameVariants,
  pickerOptionClassName,
  pickerPopupClassName,
  pickerTextClassName,
  useControllable,
  useReachEnd,
  type PickerSize,
} from './picker-internals';
import { useFieldControl } from './field';

/* -------------------------------------------------------------------------------------------------
 * Filtering
 * -----------------------------------------------------------------------------------------------*/

type ComboboxAutocomplete =
  | 'none'
  | 'list'
  | 'both'
  | { type: 'list'; filter: 'contains' | 'startsWith' }
  | { type: 'both'; filter: 'startsWith' };

const resolveAutocomplete = (autocomplete: ComboboxAutocomplete) => {
  if (typeof autocomplete === 'string') {
    return { type: autocomplete, filter: autocomplete === 'none' ? undefined : ('startsWith' as const) };
  }

  return autocomplete;
};

/** Case- and accent-insensitive matching, like the legacy `useFilter(locale, { sensitivity: 'base' })` */
const useFilter = () => {
  const collator = React.useMemo(() => new Intl.Collator(undefined, { usage: 'search', sensitivity: 'base' }), []);

  return React.useMemo(() => {
    const startsWith = (string: string, substring: string) => {
      if (substring.length === 0) {
        return true;
      }

      const normalizedString = string.normalize('NFC');
      const normalizedSubstring = substring.normalize('NFC');

      return collator.compare(normalizedString.slice(0, normalizedSubstring.length), normalizedSubstring) === 0;
    };

    const contains = (string: string, substring: string) => {
      if (substring.length === 0) {
        return true;
      }

      const normalizedString = string.normalize('NFC');
      const normalizedSubstring = substring.normalize('NFC');

      for (let index = 0; index + normalizedSubstring.length <= normalizedString.length; index += 1) {
        const slice = normalizedString.slice(index, index + normalizedSubstring.length);

        if (collator.compare(slice, normalizedSubstring) === 0) {
          return true;
        }
      }

      return false;
    };

    return { startsWith, contains };
  }, [collator]);
};

/* -------------------------------------------------------------------------------------------------
 * Options
 * -----------------------------------------------------------------------------------------------*/

interface ComboboxOptionProps extends Omit<ComboboxPrimitive.Item.Props, 'value' | 'children'> {
  children: React.ReactNode;
  /**
   * The text that the input shows, and that filtering matches, when the children are not plain text
   */
  textValue?: string;
  value: string;
}

/** The creatable item. A unique object, so it cannot collide with an option value */
const CREATE_ITEM = { __comboboxCreate: true } as const;

type ComboboxItemValue = string | typeof CREATE_ITEM;

interface CollectedOption {
  disabled: boolean;
  element: React.ReactElement<ComboboxOptionProps>;
  label: string;
  value: string;
}

const collectOptions = (children: React.ReactNode, options: CollectedOption[] = []): CollectedOption[] => {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<ComboboxOptionProps & { children?: React.ReactNode }>(child)) {
      return;
    }

    if (child.type === ComboboxOption) {
      options.push({
        disabled: Boolean(child.props.disabled),
        element: child,
        label: child.props.textValue ?? getNodeText(child.props.children).trim(),
        value: child.props.value,
      });

      return;
    }

    // Fragments and wrappers: look for the options inside
    if (child.props.children) {
      collectOptions(child.props.children, options);
    }
  });

  return options;
};

const comboboxOptionClassName = cn(
  pickerOptionClassName,
  'whitespace-normal',
  'data-selected:bg-primary-100 data-selected:font-bold data-selected:text-primary-600',
  'data-highlighted:font-bold data-highlighted:text-primary-600',
);

const ComboboxOption = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
  ({ children, className, textValue: _textValue, value, ...props }, ref) => (
    <ComboboxPrimitive.Item
      ref={ref}
      data-slot="combobox-option"
      value={value}
      className={cn(comboboxOptionClassName, className)}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  ),
);
ComboboxOption.displayName = 'ComboboxOption';

/* -------------------------------------------------------------------------------------------------
 * Combobox
 * -----------------------------------------------------------------------------------------------*/

const AUTO_VIRTUALIZE_THRESHOLD = 100;

interface ComboboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'value' | 'defaultValue' | 'onChange' | 'size' | 'children' | 'required' | 'disabled'
  > {
  /**
   * Keeps a typed text that matches no option as the value
   * @default false
   */
  allowCustomValue?: boolean;
  /**
   * How typing filters the options and completes the text. `both` completes the text inline
   * @default "both", or "list" for a creatable combobox
   */
  autocomplete?: ComboboxAutocomplete;
  /** `ComboboxOption` elements */
  children?: React.ReactNode;
  /**
   * The label of the clear button
   * @default "Clear"
   */
  clearLabel?: string;
  /**
   * Adds a "create" option for a text that matches no option. `visible` always shows it
   * @default false
   */
  creatable?: boolean | 'visible';
  /** @default false */
  creatableDisabled?: boolean;
  creatableStartIcon?: React.ReactNode;
  /** @default (value) => `Create "${value}"` */
  createMessage?: (value: string) => string;
  defaultFilterValue?: string;
  /** @default false */
  defaultOpen?: boolean;
  defaultTextValue?: string;
  defaultValue?: string;
  /** @default false */
  disabled?: boolean;
  filterValue?: string;
  /**
   * Allows `onLoadMore` to fire when the end of the list shows
   * @default false
   */
  hasMoreItems?: boolean;
  /**
   * Whether a typed character can complete the text inline
   */
  isPrintableCharacter?: (character: string) => boolean;
  /**
   * Shows a loader in the field and at the end of the list
   * @default false
   */
  loading?: boolean;
  /** @default "Loading content..." */
  loadingMessage?: string;
  /** @default () => "No results found" */
  noOptionsMessage?: (value: string) => string;
  /**
   * Shows a clear button while there is a text. It clears the text, not the value: leaving the
   * field then clears the value, like the legacy combobox
   */
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called with the typed text, or without it for a `visible` creatable */
  onCreateOption?: (value?: string) => void;
  onFilterValueChange?: (value: string) => void;
  /** The `change` event of the input, on every keystroke */
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Called when the end of the list shows and `hasMoreItems` is true */
  onLoadMore?: (entry: IntersectionObserverEntry) => void;
  onOpenChange?: (open: boolean) => void;
  onTextValueChange?: (textValue: string) => void;
  /** Called when the value changes, with `undefined` when it is cleared */
  onValueChange?: (value: string | undefined) => void;
  open?: boolean;
  /** @default "Select or enter a value" */
  placeholder?: string;
  /** @default false */
  required?: boolean;
  /** @default "M" */
  size?: PickerSize;
  startIcon?: React.ReactNode;
  textValue?: string;
  value?: string | null;
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      allowCustomValue = false,
      autocomplete,
      children,
      className,
      clearLabel = 'Clear',
      creatable = false,
      creatableDisabled = false,
      creatableStartIcon,
      createMessage = (text) => `Create "${text}"`,
      defaultFilterValue,
      defaultOpen = false,
      defaultTextValue,
      defaultValue,
      disabled = false,
      filterValue: filterValueProp,
      hasMoreItems = false,
      id: idProp,
      isPrintableCharacter,
      loading = false,
      loadingMessage = 'Loading content...',
      name: nameProp,
      noOptionsMessage = () => 'No results found',
      onBlur,
      onClear,
      onCreateOption,
      onFilterValueChange,
      onInputChange,
      onKeyDown,
      onLoadMore,
      onOpenChange,
      onTextValueChange,
      onValueChange,
      open: openProp,
      placeholder = 'Select or enter a value',
      required: requiredProp,
      size = 'M',
      startIcon,
      textValue: textValueProp,
      value: valueProp,
      'aria-describedby': describedByProp,
      'aria-invalid': ariaInvalidProp,
      ...inputProps
    },
    forwardedRef,
  ) => {
    // A surrounding `Field` provides the id, the name, the required flag, the error and the description
    const {
      id,
      name,
      required,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: idProp,
      name: nameProp,
      required: requiredProp,
      hasError: ariaInvalidProp === true || ariaInvalidProp === 'true',
      'aria-describedby': describedByProp,
    });
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const setInputRef = React.useCallback(
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

    const options = React.useMemo(() => collectOptions(children), [children]);
    const getLabel = React.useCallback(
      (optionValue: string | undefined | null) => options.find((option) => option.value === optionValue)?.label,
      [options],
    );

    const allowsCustomValue = Boolean(creatable) || allowCustomValue;
    const { type: autocompleteType, filter: filterMode } = resolveAutocomplete(
      autocomplete ?? (creatable === true ? 'list' : 'both'),
    );
    const { startsWith, contains } = useFilter();

    /* ---------------------------------------------------------------------------------------------
     * State
     * -------------------------------------------------------------------------------------------*/

    const [value, setValue] = useControllable<string | undefined>(
      valueProp === null ? undefined : valueProp,
      defaultValue,
      onValueChange,
    );
    // A controlled `null` is "no value", which `useControllable` would read as uncontrolled
    const currentValue = valueProp === null ? undefined : value;

    const initialText = (() => {
      if (defaultTextValue !== undefined) {
        return defaultTextValue;
      }

      const initialValue = valueProp ?? defaultValue;

      if (!initialValue) {
        return '';
      }

      return getLabel(initialValue) ?? (allowsCustomValue ? initialValue : '');
    })();

    const [textValue, setTextValue] = useControllable<string>(textValueProp, initialText, onTextValueChange);
    const [filterValue, setFilterValue] = useControllable<string>(
      filterValueProp,
      defaultFilterValue ?? '',
      onFilterValueChange,
    );
    const [open, setOpen] = useControllable<boolean>(openProp, defaultOpen, onOpenChange);

    /*
     * A controlled value shows the label of its option, like the legacy combobox. Only when the value
     * changes, so the text a user types stays
     */
    const previousValueRef = React.useRef(currentValue);
    React.useEffect(() => {
      if (Object.is(previousValueRef.current, currentValue)) {
        return;
      }

      previousValueRef.current = currentValue;

      if (textValueProp !== undefined) {
        return;
      }

      if (currentValue === undefined) {
        return;
      }

      const label = getLabel(currentValue);

      if (label !== undefined) {
        setTextValue(label);
      } else if (allowsCustomValue) {
        setTextValue(currentValue);
      }
    }, [allowsCustomValue, currentValue, getLabel, setTextValue, textValueProp]);

    /* ---------------------------------------------------------------------------------------------
     * Filtering
     * -------------------------------------------------------------------------------------------*/

    const query = autocompleteType === 'both' ? filterValue : textValue;

    const matchingOptions = React.useMemo(() => {
      if (autocompleteType === 'none' || !query) {
        return options;
      }

      const matches = filterMode === 'contains' ? contains : startsWith;

      return options.filter((option) => matches(option.label, query));
    }, [autocompleteType, contains, filterMode, options, query, startsWith]);

    const showCreateItem =
      creatable === 'visible' ||
      (creatable === true && Boolean(textValue) && !options.some((option) => option.label === textValue));
    const showNoOptions = creatable !== true && !loading && matchingOptions.length === 0;

    const isFiltering = Boolean(textValue) || Boolean(filterValue);
    const shouldVirtualize = !isFiltering && options.length > AUTO_VIRTUALIZE_THRESHOLD;

    const items = React.useMemo<ComboboxItemValue[]>(
      () => [...options.map((option) => option.value), ...(creatable ? [CREATE_ITEM] : [])],
      [creatable, options],
    );
    const filteredItems = React.useMemo<ComboboxItemValue[]>(
      () => [...matchingOptions.map((option) => option.value), ...(showCreateItem ? [CREATE_ITEM] : [])],
      [matchingOptions, showCreateItem],
    );

    /* ---------------------------------------------------------------------------------------------
     * Inline completion: the input shows the first match, with the completed part selected
     * -------------------------------------------------------------------------------------------*/

    const pendingSelectionRef = React.useRef<[number, number] | null>(null);

    React.useLayoutEffect(() => {
      const selection = pendingSelectionRef.current;

      if (selection && inputRef.current && document.activeElement === inputRef.current) {
        inputRef.current.setSelectionRange(selection[0], selection[1]);
      }

      pendingSelectionRef.current = null;
    });

    /* ---------------------------------------------------------------------------------------------
     * Handlers
     * -------------------------------------------------------------------------------------------*/

    const highlightedRef = React.useRef<ComboboxItemValue | undefined>(undefined);
    const escapePressedRef = React.useRef(false);
    const ignoreNextTextChangeRef = React.useRef(false);

    const handleCreate = () => {
      if (creatableDisabled) {
        return;
      }

      if (textValue) {
        setValue(textValue);
      }

      if (creatable === 'visible') {
        onCreateOption?.();
      } else if (textValue) {
        onCreateOption?.(textValue);
      }

      setOpen(false);
    };

    const handleValueChange = (
      next: ComboboxItemValue | null,
      eventDetails: ComboboxPrimitive.Root.ChangeEventDetails,
    ) => {
      if (next === CREATE_ITEM) {
        ignoreNextTextChangeRef.current = true;
        handleCreate();

        return;
      }

      // Erasing the text does not clear the value: leaving the field does, like the legacy combobox
      if (eventDetails.reason === 'input-clear') {
        return;
      }

      setValue(typeof next === 'string' ? next : undefined);

      if (autocompleteType === 'both') {
        setFilterValue('');
      }
    };

    const handleInputValueChange = (next: string, eventDetails: ComboboxPrimitive.Root.ChangeEventDetails) => {
      if (ignoreNextTextChangeRef.current) {
        ignoreNextTextChangeRef.current = false;

        return;
      }

      if (eventDetails.reason !== 'input-change') {
        // Escape only closes the list: the text stays, like the legacy combobox. A second escape clears it
        if (escapePressedRef.current) {
          return;
        }

        setTextValue(next);

        return;
      }

      if (autocompleteType === 'both') {
        setFilterValue(next);
      }

      const nativeEvent = eventDetails.event as InputEvent | undefined;
      const inputType = nativeEvent?.inputType ?? '';
      const insertedText = nativeEvent?.data ?? '';
      const isDeletion = inputType.startsWith('delete');
      const canComplete =
        autocompleteType === 'both' &&
        next.length > 0 &&
        !isDeletion &&
        (!isPrintableCharacter || isPrintableCharacter(insertedText || next.slice(-1)));

      if (canComplete) {
        const completion = options.find((option) => !option.disabled && startsWith(option.label, next));

        if (completion && completion.label.length > next.length) {
          pendingSelectionRef.current = [next.length, completion.label.length];
          setTextValue(completion.label);

          return;
        }
      }

      setTextValue(next);
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      setTextValue('');
      setFilterValue('');
      onClear?.(event);
      inputRef.current?.focus();
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      const exactMatch = options.find((option) => option.label === textValue && !option.disabled);

      if (exactMatch) {
        setValue(exactMatch.value);

        return;
      }

      if (allowsCustomValue) {
        setValue(textValue || undefined);

        return;
      }

      const previous = getLabel(currentValue);

      if (previous !== undefined && textValue !== '') {
        setTextValue(previous);

        return;
      }

      setValue(undefined);
      setTextValue('');
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      if (event.key === 'Escape') {
        // Base UI resets the text when it closes the list on escape, which this combobox does not want
        escapePressedRef.current = true;
        setTimeout(() => {
          escapePressedRef.current = false;
        });
      }

      if (event.key === 'Escape' && !open) {
        // A second escape clears the field, like the legacy combobox
        setValue(undefined);
        setTextValue('');
        setFilterValue('');

        return;
      }

      if (event.key === 'Enter' && highlightedRef.current === undefined) {
        const exactMatch = options.find((option) => option.label === textValue && !option.disabled);

        if (exactMatch) {
          event.preventDefault();
          setValue(exactMatch.value);
          setOpen(false);
        }
      }
    };

    /* ---------------------------------------------------------------------------------------------
     * Load more
     * -------------------------------------------------------------------------------------------*/

    const [scroller, setScroller] = React.useState<HTMLDivElement | null>(null);
    const [sentinel, setSentinel] = React.useState<HTMLDivElement | null>(null);

    useReachEnd(
      scroller,
      sentinel,
      (entry) => {
        if (onLoadMore && hasMoreItems && !loading) {
          onLoadMore(entry);
        }
      },
      open && Boolean(onLoadMore),
    );

    /* ---------------------------------------------------------------------------------------------
     * Render
     * -------------------------------------------------------------------------------------------*/

    const showClear = Boolean(textValue) && Boolean(onClear);

    const renderOption = (option: CollectedOption, index?: number) =>
      React.cloneElement(option.element, { key: option.value, ...(index !== undefined ? { index } : {}) });

    const listFooter = (
      <>
        {showNoOptions ? (
          <div data-slot="combobox-empty" className={cn(pickerOptionClassName, 'cursor-default hover:bg-neutral-0')}>
            {noOptionsMessage(textValue ?? '')}
          </div>
        ) : null}
        {loading ? (
          <div data-slot="combobox-loading" className="flex items-center justify-center py-2">
            <PickerLoader>{loadingMessage}</PickerLoader>
          </div>
        ) : null}
      </>
    );

    const createItem = showCreateItem ? (
      <ComboboxPrimitive.Item
        value={CREATE_ITEM}
        index={shouldVirtualize ? matchingOptions.length : undefined}
        disabled={creatableDisabled}
        data-slot="combobox-create"
        className={cn(
          'group/create sticky bottom-0 left-0 -mx-1 -mb-1 block cursor-pointer border-0 border-t border-solid border-neutral-150 bg-neutral-0 p-1 outline-none',
          'data-disabled:cursor-not-allowed data-disabled:text-neutral-600',
          shouldVirtualize && 'static m-0',
        )}
      >
        <span
          className={cn(
            'flex items-center gap-2 rounded-md px-4 py-2 text-base medium:text-sm',
            'group-hover/create:bg-primary-100 group-data-highlighted/create:bg-primary-100',
            'group-data-disabled/create:bg-neutral-0 group-data-disabled/create:[&_svg]:fill-neutral-300',
          )}
        >
          {creatableStartIcon ? (
            <span aria-hidden className="inline-flex">
              {creatableStartIcon}
            </span>
          ) : null}
          {createMessage(textValue ?? '')}
        </span>
      </ComboboxPrimitive.Item>
    ) : null;

    return (
      <ComboboxPrimitive.Root<ComboboxItemValue>
        items={items}
        filteredItems={filteredItems}
        itemToStringLabel={(item) => {
          if (item === CREATE_ITEM) {
            return textValue ?? '';
          }

          // A custom value has no option, so it is its own label
          return getLabel(item as string) ?? (allowsCustomValue ? (item as string) : '');
        }}
        value={currentValue ?? null}
        onValueChange={handleValueChange}
        inputValue={textValue}
        onInputValueChange={handleInputValueChange}
        open={open}
        onOpenChange={(nextOpen) => setOpen(nextOpen)}
        onItemHighlighted={(item) => {
          highlightedRef.current = item;
        }}
        autoHighlight={autocompleteType === 'both'}
        virtualized={shouldVirtualize}
        disabled={disabled}
        required={required}
        name={name}
      >
        <ComboboxPrimitive.InputGroup
          // Not a group: the legacy trigger had no role, and a DateTimePicker already is the group
          role="presentation"
          data-slot="combobox-control"
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
          className={cn(pickerFrameVariants({ size, compact: showClear }), 'gap-4', className)}
          onMouseDown={(event) => {
            // A press on the padding of the field focuses the input, like the legacy trigger
            if (event.target === event.currentTarget) {
              event.preventDefault();
              inputRef.current?.focus();
            }
          }}
        >
          <span className="flex min-w-0 flex-1 items-center gap-3">
            {startIcon ? (
              <span aria-hidden className="flex flex-none basis-4">
                {startIcon}
              </span>
            ) : null}
            <ComboboxPrimitive.Input
              ref={setInputRef}
              id={id}
              data-slot="combobox-input"
              placeholder={placeholder}
              required={required}
              aria-disabled={disabled || undefined}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={cn(
                'w-full min-w-0 truncate border-none bg-transparent p-0 text-neutral-800 outline-none focus:outline-none placeholder:text-neutral-600 placeholder:opacity-100 disabled:cursor-not-allowed',
                pickerTextClassName,
              )}
              onChange={onInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              {...inputProps}
            />
          </span>
          <span className="flex shrink-0 items-center gap-3">
            {showClear ? (
              <PickerClearButton
                label={clearLabel}
                disabled={disabled}
                onClick={handleClear}
                onMouseDown={(event) => event.preventDefault()}
              />
            ) : null}
            {loading ? (
              <PickerLoader>Loading</PickerLoader>
            ) : (
              <ComboboxPrimitive.Trigger
                data-slot="combobox-icon"
                aria-hidden
                tabIndex={-1}
                className="flex cursor-pointer border-none bg-transparent p-0 text-neutral-500 disabled:cursor-not-allowed"
              >
                <CaretDownIcon />
              </ComboboxPrimitive.Trigger>
            )}
          </span>
        </ComboboxPrimitive.InputGroup>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner side="bottom" align="start" sideOffset={4} className="z-500 outline-none">
            <ComboboxPrimitive.Popup
              data-slot="combobox-content"
              className={cn(
                pickerPopupClassName,
                'flex max-h-[min(35.5rem,var(--available-height))] w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
              )}
            >
              {shouldVirtualize ? (
                <ComboboxPrimitive.List data-slot="combobox-list" className="flex min-h-0 flex-1 flex-col">
                  <VirtualizedOptions
                    open={open}
                    options={matchingOptions}
                    renderOption={renderOption}
                    scrollerRef={setScroller}
                  >
                    {listFooter}
                    <div ref={setSentinel} aria-hidden className="h-px w-full" />
                  </VirtualizedOptions>
                  {createItem}
                </ComboboxPrimitive.List>
              ) : (
                <ComboboxPrimitive.List
                  ref={setScroller}
                  data-slot="combobox-list"
                  className="min-h-0 flex-1 overflow-y-auto p-1"
                >
                  {matchingOptions.map((option) => renderOption(option))}
                  {listFooter}
                  <div ref={setSentinel} aria-hidden className="h-px w-full" />
                  {createItem}
                </ComboboxPrimitive.List>
              )}
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    );
  },
);
Combobox.displayName = 'Combobox';

/* -------------------------------------------------------------------------------------------------
 * VirtualizedOptions
 *
 * A long list (more than 100 options, not filtered) renders only the visible options.
 * -----------------------------------------------------------------------------------------------*/

interface VirtualizedOptionsProps {
  children?: React.ReactNode;
  open: boolean;
  options: CollectedOption[];
  renderOption: (option: CollectedOption, index?: number) => React.ReactNode;
  scrollerRef: (node: HTMLDivElement | null) => void;
}

const ESTIMATED_OPTION_SIZE = 36;

const VirtualizedOptions = ({ children, open, options, renderOption, scrollerRef }: VirtualizedOptionsProps) => {
  const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    enabled: open,
    count: options.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => ESTIMATED_OPTION_SIZE,
    overscan: 10,
    paddingStart: 4,
    paddingEnd: 4,
  });

  const setScrollElement = React.useCallback(
    (node: HTMLDivElement | null) => {
      scrollElementRef.current = node;
      scrollerRef(node);

      if (node) {
        virtualizer.measure();
      }
    },
    [scrollerRef, virtualizer],
  );

  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      ref={setScrollElement}
      role="presentation"
      data-testid="virtualized-list"
      className="max-h-88 min-h-0 flex-1 overflow-y-auto px-1"
    >
      <div role="presentation" className="relative w-full" style={{ height: totalSize }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const option = options[virtualItem.index];

          if (!option) {
            return null;
          }

          return (
            <div
              key={virtualItem.key}
              role="presentation"
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${virtualItem.start}px)` }}
            >
              {renderOption(option, virtualItem.index)}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export { Combobox, ComboboxOption };
export type { ComboboxAutocomplete, ComboboxOptionProps, ComboboxProps };
