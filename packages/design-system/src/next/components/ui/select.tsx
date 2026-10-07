import * as React from 'react';

import { cn } from '@/lib/utils';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import {
  CaretDownIcon,
  CheckIcon,
  CrossIcon,
  MinusIcon,
  PickerClearButton,
  PickerLoader,
  getNodeText,
  pickerFrameVariants,
  pickerOptionClassName,
  pickerPopupClassName,
  pickerTextClassName,
  useReachEnd,
  type PickerSize,
} from './picker-internals';
import { useFieldControl } from './field';

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

type SelectChangeEventDetails = SelectPrimitive.Root.ChangeEventDetails;

/** The value of a `SelectGroupItem`: choosing it selects (or clears) every value of its group */
interface GroupToken {
  readonly __selectGroup: true;
  readonly values: readonly unknown[];
}

const isGroupToken = (value: unknown): value is GroupToken =>
  typeof value === 'object' && value !== null && (value as GroupToken).__selectGroup === true;

interface SelectContextValue {
  disabled: boolean;
  multiple: boolean;
  value: unknown;
  hasValue: boolean;
  /** Clears the value when uncontrolled. A controlled select resets it from its `onClear` */
  clear: () => void;
  /** Removes one value of a multiple select, used by the tags */
  removeValue: (value: unknown) => void;
  getLabel: (value: unknown) => React.ReactNode;
  registerLabel: (value: unknown, label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = (consumerName: string) => {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`Select\``);
  }

  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Select (root)
 * -----------------------------------------------------------------------------------------------*/

type SelectValueType<Value, Multiple extends boolean | undefined> = Multiple extends true ? Value[] : Value;

type SelectProps<Value, Multiple extends boolean | undefined = false> = Omit<
  SelectPrimitive.Root.Props<Value, Multiple>,
  'onValueChange'
> & {
  /**
   * Called when the value changes. `eventDetails` is missing when a tag removes a value.
   */
  onValueChange?: (
    value: SelectValueType<Value, Multiple> | (Multiple extends true ? never : null),
    eventDetails?: SelectChangeEventDetails,
  ) => void;
};

interface CollectedItem {
  value: unknown;
  label: React.ReactNode;
}

/**
 * Walks the children for `SelectItem` elements, so the trigger can show the label of the value
 * before the popup has ever mounted its items.
 */
const collectItems = (children: React.ReactNode, items: CollectedItem[] = []): CollectedItem[] => {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<{ children?: React.ReactNode; value?: unknown }>(child)) {
      return;
    }

    if (child.type === SelectItem) {
      items.push({ value: child.props.value, label: child.props.children });

      return;
    }

    if (child.props.children && typeof child.props.children !== 'function') {
      collectItems(child.props.children, items);
    }
  });

  return items;
};

const isEmptyValue = (value: unknown) =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

function Select<Value, Multiple extends boolean | undefined = false>({
  children,
  defaultValue,
  disabled = false,
  items: itemsProp,
  multiple,
  name: nameProp,
  onValueChange,
  required: requiredProp,
  value: valueProp,
  ...props
}: SelectProps<Value, Multiple>) {
  // A surrounding `Field` provides the name of the form value and the required flag; the trigger takes the rest
  const { name, required } = useFieldControl({ name: nameProp, required: requiredProp });
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<unknown>(defaultValue ?? (multiple ? [] : null));
  const rawValue: unknown = isControlled ? valueProp : uncontrolledValue;
  // The legacy select used an empty string for "no value"
  const value = !multiple && rawValue === '' ? null : rawValue;

  const [registeredLabels, setRegisteredLabels] = React.useState<CollectedItem[]>([]);

  const registerLabel = React.useCallback((itemValue: unknown, label: React.ReactNode) => {
    setRegisteredLabels((prev) => {
      const index = prev.findIndex((item) => Object.is(item.value, itemValue));

      if (index === -1) {
        return [...prev, { value: itemValue, label }];
      }

      if (getNodeText(prev[index].label) === getNodeText(label)) {
        return prev;
      }

      const next = [...prev];
      next[index] = { value: itemValue, label };

      return next;
    });
  }, []);

  const collectedItems = React.useMemo(() => {
    const collected = collectItems(children);

    registeredLabels.forEach((item) => {
      if (!collected.some((collectedItem) => Object.is(collectedItem.value, item.value))) {
        collected.push(item);
      }
    });

    return collected;
  }, [children, registeredLabels]);

  const getLabel = React.useCallback(
    (itemValue: unknown) => {
      if (Array.isArray(itemsProp)) {
        const item = (itemsProp as ReadonlyArray<{ value: unknown; label: React.ReactNode }>).find(
          (entry) => entry && typeof entry === 'object' && 'value' in entry && Object.is(entry.value, itemValue),
        );

        if (item) {
          return item.label;
        }
      } else if (itemsProp && typeof itemsProp === 'object') {
        const label = (itemsProp as Record<string, React.ReactNode>)[String(itemValue)];

        if (label !== undefined) {
          return label;
        }
      }

      const collected = collectedItems.find((item) => Object.is(item.value, itemValue));

      return collected ? collected.label : String(itemValue ?? '');
    },
    [collectedItems, itemsProp],
  );

  const setValue = React.useCallback(
    (next: unknown, eventDetails?: SelectChangeEventDetails) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }

      (onValueChange as ((value: unknown, details?: SelectChangeEventDetails) => void) | undefined)?.(
        next,
        eventDetails,
      );
    },
    [isControlled, onValueChange],
  );

  const handleValueChange = (next: unknown, eventDetails: SelectChangeEventDetails) => {
    if (multiple && Array.isArray(next) && next.some(isGroupToken)) {
      // A group item toggles all of its values: it selects them all, or clears them when they all are
      let nextValues = next.filter((entry) => !isGroupToken(entry));

      next.filter(isGroupToken).forEach((group) => {
        const allSelected = group.values.every((groupValue) => nextValues.includes(groupValue));

        nextValues = allSelected
          ? nextValues.filter((entry) => !group.values.includes(entry))
          : [...nextValues, ...group.values.filter((groupValue) => !nextValues.includes(groupValue))];
      });

      setValue(nextValues, eventDetails);

      return;
    }

    setValue(next, eventDetails);
  };

  const context = React.useMemo<SelectContextValue>(
    () => ({
      disabled,
      multiple: Boolean(multiple),
      value,
      hasValue: !isEmptyValue(value),
      clear: () => {
        if (!isControlled) {
          setUncontrolledValue(multiple ? [] : null);
        }
      },
      removeValue: (toRemove) => {
        if (Array.isArray(value)) {
          setValue(value.filter((entry) => !Object.is(entry, toRemove)));
        }
      },
      getLabel,
      registerLabel,
    }),
    [disabled, getLabel, isControlled, multiple, registerLabel, setValue, value],
  );

  const items = React.useMemo(
    () => itemsProp ?? collectedItems.map((item) => ({ value: item.value, label: item.label })),
    [collectedItems, itemsProp],
  );

  return (
    <SelectContext.Provider value={context}>
      <SelectPrimitive.Root
        disabled={disabled}
        items={items}
        multiple={multiple}
        name={name}
        required={required}
        value={value as SelectPrimitive.Root.Props<Value, Multiple>['value']}
        onValueChange={handleValueChange as SelectPrimitive.Root.Props<Value, Multiple>['onValueChange']}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * -----------------------------------------------------------------------------------------------*/

interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  /**
   * The label of the clear button
   * @default "Clear"
   */
  clearLabel?: string;
  /**
   * Shows a loader in place of the caret
   * @default false
   */
  loading?: boolean;
  /**
   * The text that the loader announces
   * @default "Loading"
   */
  loadingLabel?: string;
  /**
   * Shows a clear button while the select has a value. An uncontrolled select clears itself
   */
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @default "M"
   */
  size?: PickerSize;
  startIcon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      children,
      className,
      clearLabel = 'Clear',
      loading = false,
      loadingLabel = 'Loading',
      onClear,
      size = 'M',
      startIcon,
      id: idProp,
      'aria-describedby': describedByProp,
      'aria-invalid': ariaInvalidProp,
      ...props
    },
    forwardedRef,
  ) => {
    const context = useSelectContext('SelectTrigger');
    // A surrounding `Field` labels the trigger (its id) and describes it (its hint or error)
    const {
      id,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: idProp,
      hasError: ariaInvalidProp === true || ariaInvalidProp === 'true',
      'aria-describedby': describedByProp,
    });
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const showClear = Boolean(onClear) && context.hasValue;

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (context.disabled) {
        return;
      }

      context.clear();
      onClear?.(event);
      triggerRef.current?.focus();
    };

    return (
      <div data-slot="select-control" className="relative w-full">
        <SelectPrimitive.Trigger
          ref={setRefs}
          data-slot="select-trigger"
          data-size={size}
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          data-invalid={invalid || undefined}
          className={cn(
            pickerFrameVariants({ size, compact: showClear }),
            'cursor-pointer data-disabled:text-neutral-500',
            // A multiple select with tags has a tighter padding, so the tags fit the height of the field
            'has-data-with-tags:py-2 has-data-with-tags:pl-2 medium:has-data-with-tags:py-1 medium:has-data-with-tags:pl-1',
            className,
          )}
          {...props}
        >
          <span className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            {startIcon ? (
              <span aria-hidden className="flex shrink-0">
                {startIcon}
              </span>
            ) : null}
            {children ?? <SelectValue />}
          </span>
          <span className="flex shrink-0 items-center gap-3">
            {/* Keeps the room of the clear button, which sits on top of the trigger: a button cannot hold a button */}
            {showClear ? <span aria-hidden className="block size-8 medium:size-6" /> : null}
            {loading ? (
              <PickerLoader>{loadingLabel}</PickerLoader>
            ) : (
              <SelectPrimitive.Icon data-slot="select-icon" className="flex text-neutral-500">
                <CaretDownIcon />
              </SelectPrimitive.Icon>
            )}
          </span>
        </SelectPrimitive.Trigger>
        {showClear ? (
          <PickerClearButton
            label={clearLabel}
            disabled={context.disabled}
            onClick={handleClear}
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              // padding end + border + caret (or loader) + gap
              loading ? 'right-[calc(4.8rem+1px)]' : 'right-[calc(4rem+1px)]',
            )}
          />
        ) : null}
      </div>
    );
  },
);
SelectTrigger.displayName = 'SelectTrigger';

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * -----------------------------------------------------------------------------------------------*/

interface SelectValueProps extends SelectPrimitive.Value.Props {
  /**
   * Renders the values of a multiple select as removable tags
   * @default false
   */
  withTags?: boolean;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ children, className, placeholder, withTags = false, ...props }, ref) => {
    const context = useSelectContext('SelectValue');
    const showTags = withTags && context.multiple && context.hasValue;

    let content = children;

    if (showTags) {
      content = (value: unknown[]) =>
        value.map((entry) => (
          <SelectTag
            key={String(entry)}
            disabled={context.disabled}
            label={context.getLabel(entry)}
            onRemove={() => context.removeValue(entry)}
          />
        ));
    } else if (typeof children === 'function' && placeholder !== undefined) {
      // A render function gets the value even when it is empty, so the placeholder stays
      const render = children as (value: unknown) => React.ReactNode;
      content = (value: unknown) => (isEmptyValue(value) ? placeholder : render(value));
    }

    return (
      <SelectPrimitive.Value
        ref={ref}
        data-slot="select-value"
        data-with-tags={showTags || undefined}
        placeholder={placeholder}
        className={cn(
          'block min-h-6 min-w-0 flex-1 truncate text-neutral-800 data-placeholder:text-neutral-600 medium:min-h-5.5',
          pickerTextClassName,
          showTags && 'flex flex-wrap gap-1 whitespace-normal',
          className,
        )}
        {...props}
      >
        {content}
      </SelectPrimitive.Value>
    );
  },
);
SelectValue.displayName = 'SelectValue';

/* The legacy Tag, as used by the MultiSelect: the remove control is pointer only, like before */
const SelectTag = ({
  disabled,
  label,
  onRemove,
}: {
  disabled: boolean;
  label: React.ReactNode;
  onRemove: () => void;
}) => (
  <span
    data-slot="select-tag"
    data-disabled={disabled || undefined}
    className="inline-flex h-8 items-center rounded-md border border-solid border-primary-200 bg-primary-100 pr-1 pl-3 text-primary-600 data-disabled:border-neutral-300 data-disabled:bg-neutral-200 data-disabled:text-neutral-700"
  >
    <span className="border-0 border-r border-solid border-inherit pr-2 text-xs font-bold">{label}</span>
    <span
      aria-hidden
      data-slot="select-tag-remove"
      className="inline-flex cursor-pointer p-2 text-primary-600 in-data-disabled:cursor-default in-data-disabled:text-neutral-600"
      onPointerDown={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();

        if (!disabled) {
          onRemove();
        }
      }}
    >
      <CrossIcon className="size-3" />
    </span>
  </span>
);

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/

interface SelectContentProps
  extends SelectPrimitive.Popup.Props,
    Pick<SelectPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'> {
  /**
   * Called when the end of the list scrolls into view, to load more options
   */
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = 'start',
      alignItemWithTrigger = false,
      alignOffset = 0,
      children,
      className,
      onReachEnd,
      side = 'bottom',
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const [list, setList] = React.useState<HTMLDivElement | null>(null);
    const [sentinel, setSentinel] = React.useState<HTMLDivElement | null>(null);

    useReachEnd(list, sentinel, onReachEnd, Boolean(onReachEnd));

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          alignItemWithTrigger={alignItemWithTrigger}
          className="z-500 outline-none"
        >
          <SelectPrimitive.Popup
            ref={ref}
            data-slot="select-content"
            className={cn(
              pickerPopupClassName,
              'flex max-h-[min(15.6rem,var(--available-height))] min-w-(--anchor-width) flex-col overflow-hidden',
              className,
            )}
            {...props}
          >
            <SelectPrimitive.List ref={setList} data-slot="select-list" className="min-h-0 flex-1 overflow-y-auto p-1">
              {children}
              <div ref={setSentinel} aria-hidden data-slot="select-end" className="h-px w-full" />
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = 'SelectContent';

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * -----------------------------------------------------------------------------------------------*/

interface SelectItemProps extends SelectPrimitive.Item.Props {
  /**
   * Indents the option, for the options under a `SelectGroupItem`
   * @default false
   */
  inset?: boolean;
  startIcon?: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, inset = false, startIcon, value, ...props }, ref) => {
    const context = useSelectContext('SelectItem');
    const { registerLabel } = context;

    React.useLayoutEffect(() => {
      registerLabel(value, children);
    }, [registerLabel, value, children]);

    return (
      <SelectPrimitive.Item
        ref={ref}
        data-slot="select-item"
        value={value}
        className={cn(pickerOptionClassName, 'group/select-item', inset && 'pl-8', className)}
        {...props}
      >
        {startIcon ? (
          <span aria-hidden className="flex shrink-0">
            {startIcon}
          </span>
        ) : null}
        {context.multiple ? (
          <span
            aria-hidden
            data-slot="select-item-checkbox"
            className="flex size-5 flex-none basis-5 items-center justify-center rounded-md border border-solid border-neutral-300 bg-neutral-0 text-neutral-0 group-data-disabled/select-item:bg-neutral-200 group-data-selected/select-item:border-primary-600 group-data-selected/select-item:bg-primary-600"
          >
            <CheckIcon className="hidden group-data-selected/select-item:block" />
          </span>
        ) : null}
        <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);
SelectItem.displayName = 'SelectItem';

/* -------------------------------------------------------------------------------------------------
 * SelectGroup, SelectLabel, SelectGroupItem, SelectSeparator
 * -----------------------------------------------------------------------------------------------*/

const SelectGroup = React.forwardRef<HTMLDivElement, SelectPrimitive.Group.Props>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group ref={ref} data-slot="select-group" className={cn('flex flex-col', className)} {...props} />
));
SelectGroup.displayName = 'SelectGroup';

/** The heading of a group of options, like the label of an `<optgroup>` */
const SelectLabel = React.forwardRef<HTMLDivElement, SelectPrimitive.GroupLabel.Props>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.GroupLabel
      ref={ref}
      data-slot="select-label"
      className={cn('px-4 pt-2 pb-1 text-2xs font-bold text-neutral-600 uppercase', className)}
      {...props}
    />
  ),
);
SelectLabel.displayName = 'SelectLabel';

interface SelectGroupItemProps extends Omit<SelectPrimitive.Item.Props, 'value'> {
  startIcon?: React.ReactNode;
  /**
   * The values of the options of the group. Choosing the item selects them all, or clears them when
   * they all are selected. For a multiple select only
   */
  values: unknown[];
}

/** The selectable heading of a group of a multiple select, the legacy `MultiSelectGroup` */
const SelectGroupItem = React.forwardRef<HTMLDivElement, SelectGroupItemProps>(
  ({ children, className, startIcon, values, ...props }, ref) => {
    const context = useSelectContext('SelectGroupItem');
    const selected = Array.isArray(context.value) ? context.value : [];
    const selectedCount = values.filter((entry) => selected.includes(entry)).length;
    const allSelected = values.length > 0 && selectedCount === values.length;
    const someSelected = selectedCount > 0 && !allSelected;

    const valuesKey = values.map(String).join('\u0000');
    // The token only changes with the values, so Base UI keeps a stable item value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = React.useMemo<GroupToken>(() => ({ __selectGroup: true, values }), [valuesKey]);

    let state = 'unchecked';

    if (allSelected) {
      state = 'checked';
    } else if (someSelected) {
      state = 'indeterminate';
    }

    return (
      <SelectPrimitive.Item
        ref={ref}
        data-slot="select-group-item"
        data-state={state}
        value={token}
        label={getNodeText(children)}
        aria-selected={allSelected}
        className={cn(pickerOptionClassName, className)}
        {...props}
      >
        {startIcon ? (
          <span aria-hidden className="flex shrink-0">
            {startIcon}
          </span>
        ) : null}
        <span
          aria-hidden
          data-slot="select-item-checkbox"
          className={cn(
            'flex size-5 flex-none basis-5 items-center justify-center rounded-md border border-solid border-neutral-300 bg-neutral-0 text-neutral-0',
            (allSelected || someSelected) && 'border-primary-600 bg-primary-600',
          )}
        >
          {allSelected ? <CheckIcon /> : null}
          {someSelected ? <MinusIcon /> : null}
        </span>
        <span className="min-w-0 flex-1 truncate">{children}</span>
      </SelectPrimitive.Item>
    );
  },
);
SelectGroupItem.displayName = 'SelectGroupItem';

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectPrimitive.Separator.Props>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
      ref={ref}
      data-slot="select-separator"
      className={cn('pointer-events-none my-1 h-px bg-neutral-150', className)}
      {...props}
    />
  ),
);
SelectSeparator.displayName = 'SelectSeparator';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupItem,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
export type {
  SelectContentProps,
  SelectGroupItemProps,
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
};
