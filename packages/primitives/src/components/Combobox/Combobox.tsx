/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';

import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContext } from '@radix-ui/react-context';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { useFocusGuards } from '@radix-ui/react-focus-guards';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { useId } from '@radix-ui/react-id';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { Portal as PortalPrimitive } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';
import type { ComponentPropsWithoutRef } from '@radix-ui/react-primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { hideOthers } from 'aria-hidden';
import * as ReactDOM from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { useFilter } from '../../hooks/useFilter';
import { usePrev } from '../../hooks/usePrev';
import { createCollection } from '../Collection';

const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
const SELECTION_KEYS = ['Enter'];

const defaultIsPrintableCharacter = (str: string): boolean => {
  return Boolean(str.length === 1 && str.match(/\S| /));
};

/* -------------------------------------------------------------------------------------------------
 * Combobox
 * -----------------------------------------------------------------------------------------------*/

const COMBOBOX_NAME = 'Combobox';

const [Collection, useCollection] = createCollection<ComboboxItemElement, CollectionData>(COMBOBOX_NAME);

type CollectionData = OptionData | CreateData;

interface Data {
  value: string;
  disabled: boolean;
  textValue: string;
  isVisible?: boolean;
}

interface OptionData extends Data {
  type: 'option';
}

interface CreateData extends Data {
  type: 'create';
}

type ComboboxContextValue = {
  allowCustomValue: boolean;
  autocomplete: 'none' | 'list' | 'both';
  contentId: string;
  disabled?: boolean;
  locale: string;
  onOpenChange(open: boolean): void;
  onTriggerChange(node: ComboboxInputElement | null): void;
  onValueChange(value: string | undefined): void;
  open: boolean;
  required: boolean;
  trigger: ComboboxInputElement | null;
  value?: string;
  focusFirst: (
    candidates: Array<HTMLDivElement | null>,
    items: Array<CollectionData & { ref: React.RefObject<HTMLDivElement> }>,
  ) => void;
  textValue?: string;
  onTextValueChange(textValue: string): void;
  onViewportChange(node: ComboboxViewportElement | null): void;
  onContentChange(node: ComboboxContentImplElement | null): void;
  visuallyFocussedItem: HTMLDivElement | null;
  filterValue: string | undefined;
  onFilterValueChange: (value: string | undefined) => void;
  onVisuallyFocussedItemChange: (item: HTMLDivElement | null) => void;
  isPrintableCharacter: (str: string) => boolean;
};

const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContextValue>(COMBOBOX_NAME);

interface RootProps {
  allowCustomValue?: boolean;
  autocomplete?: 'none' | 'list' | 'both';
  children?: React.ReactNode;
  defaultOpen?: boolean;
  defaultValue?: string;
  defaultTextValue?: string;
  disabled?: boolean;
  locale?: string;
  onOpenChange?(open: boolean): void;
  onValueChange?(value: string): void;
  onTextValueChange?(textValue: string): void;
  textValue?: string;
  open?: boolean;
  required?: boolean;
  value?: string;
  defaultFilterValue?: string;
  filterValue?: string;
  onFilterValueChange?(value: string): void;
  isPrintableCharacter?: (str: string) => boolean;
}

/**
 * @internal don't expose this. It's only used to access the `useCollection` hook.
 */
const ComboboxProviders = ({ children }: { children: React.ReactNode }) => (
  <PopperPrimitive.Root>
    <Collection.Provider scope={undefined}>{children}</Collection.Provider>
  </PopperPrimitive.Root>
);

const Combobox = (props: RootProps) => {
  const {
    allowCustomValue = false,
    autocomplete = 'none',
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled,
    required = false,
    locale = 'en-EN',
    onTextValueChange,
    textValue: textValueProp,
    defaultTextValue,
    filterValue: filterValueProp,
    defaultFilterValue,
    onFilterValueChange,
    isPrintableCharacter = defaultIsPrintableCharacter,
  } = props;

  const [trigger, setTrigger] = React.useState<ComboboxInputElement | null>(null);
  const [viewport, setViewport] = React.useState<ComboboxViewportElement | null>(null);
  const [content, setContent] = React.useState<ComboboxContentImplElement | null>(null);
  const [visuallyFocussedItem, setVisuallyFocussedItem] = React.useState<HTMLDivElement | null>(null);

  /**
   * Lets state either be handled externally or internally.
   */
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [textValue, setTextValue] = useControllableState({
    prop: textValueProp,
    defaultProp: allowCustomValue && !defaultTextValue ? valueProp : defaultTextValue,
    onChange: onTextValueChange,
  });
  const [filterValue, setFilterValue] = useControllableState({
    prop: filterValueProp,
    defaultProp: defaultFilterValue,
    onChange: onFilterValueChange,
  });

  const id = useId();

  const focusFirst: ComboboxContextValue['focusFirst'] = React.useCallback(
    (candidates, items) => {
      const allItems = items.map((item) => item.ref.current);
      const [firstItem, ...restItems] = allItems;
      const [lastItem] = restItems.slice(-1);

      const PREVIOUSLY_FOCUSED_ELEMENT =
        visuallyFocussedItem ?? items.find((item) => item.value === value)?.ref.current;
      // eslint-disable-next-line no-restricted-syntax
      for (const candidate of candidates) {
        // if focus is already where we want to go, we don't want to keep going through the candidates
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate?.scrollIntoView({ block: 'nearest' });

        // viewport might have padding so scroll to its edges when focusing first/last items.
        if (candidate === firstItem && viewport) viewport.scrollTop = 0;

        if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;

        setVisuallyFocussedItem(candidate);

        if (autocomplete === 'both') {
          const item = items.find((item) => item.ref.current === candidate);

          if (item) {
            setTextValue(item.textValue);
          }
        }

        if (candidate !== PREVIOUSLY_FOCUSED_ELEMENT) return;
      }
    },
    [autocomplete, setTextValue, viewport, visuallyFocussedItem, value],
  );

  React.useEffect(() => {
    if (autocomplete !== 'both') {
      setVisuallyFocussedItem(null);
    }
  }, [textValue, autocomplete]);

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  React.useEffect(() => {
    if (content && trigger) return hideOthers([content, trigger]);
  }, [content, trigger]);

  return (
    <ComboboxProviders>
      <ComboboxProvider
        allowCustomValue={allowCustomValue}
        autocomplete={autocomplete}
        required={required}
        trigger={trigger}
        onTriggerChange={setTrigger}
        contentId={id}
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        locale={locale}
        focusFirst={focusFirst}
        textValue={textValue}
        onTextValueChange={setTextValue}
        onViewportChange={setViewport}
        onContentChange={setContent}
        visuallyFocussedItem={visuallyFocussedItem}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
        onVisuallyFocussedItemChange={setVisuallyFocussedItem}
        isPrintableCharacter={isPrintableCharacter}
      >
        {children}
      </ComboboxProvider>
    </ComboboxProviders>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboboxTrigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerProps = PrimitiveDivProps;

const TRIGGER_NAME = 'ComboboxTrigger';
type ComboboxTriggerElement = React.ElementRef<'div'>;

const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, TriggerProps>((props, forwardedRef) => {
  const { ...triggerProps } = props;
  const context = useComboboxContext(TRIGGER_NAME);

  const handleOpen = () => {
    if (!context.disabled) {
      context.onOpenChange(true);
    }
  };

  return (
    <PopperPrimitive.Anchor asChild>
      <FocusScope
        asChild
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapped={context.open}
        onMountAutoFocus={(event) => {
          // we prevent open autofocus because we manually focus the selected item
          event.preventDefault();
        }}
        onUnmountAutoFocus={(event) => {
          context.trigger?.focus({ preventScroll: true });
          /**
           * In firefox there's a some kind of selection happening after
           * unmounting all of this, so we make sure we clear that.
           */
          document.getSelection()?.empty();
          event.preventDefault();
        }}
      >
        <div
          ref={forwardedRef}
          data-disabled={context.disabled ? '' : undefined}
          {...triggerProps} // Enable compatibility with native label or custom `Label` "click" for Safari:
          onClick={composeEventHandlers(triggerProps.onClick, () => {
            // Whilst browsers generally have no issue focusing the trigger when clicking
            // on a label, Safari seems to struggle with the fact that there's no `onClick`.
            // We force `focus` in this case. Note: this doesn't create any other side-effect
            // because we are preventing default in `onPointerDown` so effectively
            // this only runs for a label "click"
            context.trigger?.focus();
          })}
          onPointerDown={composeEventHandlers(triggerProps.onPointerDown, (event) => {
            // prevent implicit pointer capture
            // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
            const target = event.target as HTMLElement;

            if (target.hasPointerCapture(event.pointerId)) {
              target.releasePointerCapture(event.pointerId);
            }

            /**
             * This has been added to allow events inside the trigger to be easily fired
             * e.g. the clear button or removing a tag
             */
            const buttonTarg = target.closest('button') ?? target.closest('div');

            if (buttonTarg !== event.currentTarget) {
              return;
            }

            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (event.button === 0 && event.ctrlKey === false) {
              handleOpen();
              /**
               * Firefox had issues focussing the input correctly.
               */
              context.trigger?.focus();
            }
          })}
        />
      </FocusScope>
    </PopperPrimitive.Anchor>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxInput
 * -----------------------------------------------------------------------------------------------*/

const INPUT_NAME = 'ComboboxInput';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
type ComboboxInputElement = React.ElementRef<'input'>;

const ComboxboxTextInput = React.forwardRef<ComboboxInputElement, TextInputProps>((props, forwardedRef) => {
  const context = useComboboxContext(INPUT_NAME);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { getItems } = useCollection(undefined);

  const { startsWith } = useFilter(context.locale, { sensitivity: 'base' });

  const isDisabled = context.disabled;
  const composedRefs = useComposedRefs(inputRef, forwardedRef, context.onTriggerChange);

  const handleOpen = () => {
    if (!isDisabled) {
      context.onOpenChange(true);
    }
  };

  const previousFilter = usePrev(context.filterValue);

  /**
   * If you suddenly get a match it pushes you right to the end.
   */
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (
        context.textValue === '' ||
        context.textValue === undefined ||
        context.filterValue === '' ||
        context.filterValue === undefined
      )
        return;

      const firstItem = getItems().find(
        (item) => item.type === 'option' && startsWith(item.textValue, context.textValue!),
      );

      const characterChangedAtIndex = findChangedIndex(previousFilter ?? '', context.filterValue);

      /**
       * If there's a match, we want to select the text after the match.
       */
      if (firstItem && !context.visuallyFocussedItem && characterChangedAtIndex === context.filterValue.length) {
        inputRef.current?.setSelectionRange(context.filterValue.length, context.textValue.length);
      }
    });

    return () => clearTimeout(timeout);
  }, [context.textValue, context.filterValue, startsWith, context.visuallyFocussedItem, getItems, previousFilter]);

  return (
    <input
      type="text"
      role="combobox"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      aria-required={context.required}
      aria-autocomplete={context.autocomplete}
      data-state={context.open ? 'open' : 'closed'}
      aria-disabled={isDisabled}
      aria-activedescendant={context.visuallyFocussedItem?.id}
      disabled={isDisabled}
      data-disabled={isDisabled ? '' : undefined}
      data-placeholder={context.textValue === undefined ? '' : undefined}
      value={context.textValue ?? ''}
      {...props}
      ref={composedRefs}
      onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
        if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
          if (!context.open) {
            handleOpen();
          }

          setTimeout(() => {
            const items = getItems().filter((item) => !item.disabled && item.isVisible);
            let candidateNodes = items.map((item) => item.ref.current!);

            if (['ArrowUp', 'End'].includes(event.key)) {
              candidateNodes = candidateNodes.slice().reverse();
            }
            if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
              const currentElement =
                context.visuallyFocussedItem ?? getItems().find((item) => item.value === context.value)?.ref.current;

              if (currentElement) {
                let currentIndex = candidateNodes.indexOf(currentElement);

                /**
                 * This lets us go around the items in one big loop.
                 */
                if (currentIndex === candidateNodes.length - 1) {
                  currentIndex = -1;
                }
                candidateNodes = candidateNodes.slice(currentIndex + 1);
              }
            }
            if (['ArrowDown'].includes(event.key) && context.autocomplete === 'both' && candidateNodes.length > 1) {
              const [firstItem, ...restItems] = candidateNodes;
              const firstItemText = getItems().find((item) => item.ref.current === firstItem)!.textValue;

              if (context.textValue === firstItemText) {
                candidateNodes = restItems;
              }
            }
            context.focusFirst(candidateNodes, getItems());
          });
          event.preventDefault();
        } else if (['Tab'].includes(event.key) && context.open) {
          event.preventDefault();
        } else if (['Escape'].includes(event.key)) {
          if (context.open) {
            context.onOpenChange(false);
          } else {
            context.onValueChange(undefined);
            context.onTextValueChange('');
          }
          event.preventDefault();
        } else if (SELECTION_KEYS.includes(event.key)) {
          if (context.visuallyFocussedItem) {
            const focussedItem = getItems().find((item) => item.ref.current === context.visuallyFocussedItem);

            if (focussedItem) {
              context.onValueChange(focussedItem.value);
              context.onTextValueChange(focussedItem.textValue);

              if (context.autocomplete === 'both') {
                context.onFilterValueChange(focussedItem.textValue);
              }

              focussedItem.ref.current?.click();
            }
          } else {
            const matchedItem = getItems().find(
              (item) => item.type === 'option' && !item.disabled && item.textValue === context.textValue,
            );

            if (matchedItem) {
              context.onValueChange(matchedItem.value);
              context.onTextValueChange(matchedItem.textValue);

              if (context.autocomplete === 'both') {
                context.onFilterValueChange(matchedItem.textValue);
              }

              matchedItem.ref.current?.click();
            }
          }

          context.onOpenChange(false);
          event.preventDefault();
        } else {
          context.onVisuallyFocussedItemChange(null);
        }
      })}
      onChange={composeEventHandlers(props.onChange, (event) => {
        context.onTextValueChange(event.currentTarget.value);

        if (context.autocomplete === 'both') {
          context.onFilterValueChange(event.currentTarget.value);
        }
      })}
      onKeyUp={composeEventHandlers(props.onKeyUp, (event) => {
        if (!context.open && (context.isPrintableCharacter(event.key) || ['Backspace'].includes(event.key))) {
          handleOpen();
        }

        setTimeout(() => {
          if (
            context.autocomplete === 'both' &&
            context.isPrintableCharacter(event.key) &&
            context.filterValue !== undefined
          ) {
            const value = context.filterValue;
            const firstItem = getItems().find((item) => startsWith(item.textValue, value));

            if (firstItem) {
              context.onTextValueChange(firstItem.textValue);
            }
          }
        });

        if (context.autocomplete === 'none' && context.isPrintableCharacter(event.key)) {
          const value = context.textValue ?? '';

          const nextItem = getItems().find((item) => startsWith(item.textValue, value));

          if (nextItem) {
            context.onVisuallyFocussedItemChange(nextItem.ref.current);
            nextItem.ref.current?.scrollIntoView();
          }
        }
      })}
      onBlur={composeEventHandlers(props.onBlur, () => {
        if (context.open) {
          return;
        }

        context.onVisuallyFocussedItemChange(null);

        const [activeItem] = getItems().filter(
          (item) => item.textValue === context.textValue && item.type === 'option',
        );

        if (activeItem) {
          context.onValueChange(activeItem.value);

          if (context.autocomplete === 'both') {
            context.onFilterValueChange(activeItem.textValue);
          }

          return;
        }

        /**
         * If we allow custom values and we didn't find an active item
         * we just want to set it to the text value.
         */
        if (context.allowCustomValue) {
          context.onValueChange(context.textValue);

          if (context.autocomplete === 'both') {
            context.onFilterValueChange(context.textValue);
          }

          return;
        }

        const [previousItem] = getItems().filter((item) => item.value === context.value && item.type === 'option');

        /**
         * If we've succesfully typed a value that matches an item, we want to
         * update the value to that item's value. Otherwise, we want to update
         * the value to the previous value.
         *
         * If theres no previous value and we've typed a value that doesn't match
         * an item, we want to clear the value.
         */

        if (previousItem && context.textValue !== '') {
          context.onTextValueChange(previousItem.textValue);

          if (context.autocomplete === 'both') {
            context.onFilterValueChange(previousItem.textValue);
          }
        } else {
          context.onValueChange(undefined);
          context.onTextValueChange('');
        }
      })}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxIcon
 * -----------------------------------------------------------------------------------------------*/

type ComboboxIconElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>;
interface IconProps extends PrimitiveButtonProps {}

const ComboboxIcon = React.forwardRef<ComboboxIconElement, IconProps>((props, forwardedRef) => {
  const { children, ...iconProps } = props;

  const context = useComboboxContext(INPUT_NAME);

  const isDisabled = context.disabled;

  const handleOpen = () => {
    if (!isDisabled) {
      context.onOpenChange(true);
      /**
       * We should be focussing the trigger here not this button.
       */
      context.trigger?.focus();
    }
  };

  return (
    <Primitive.button
      aria-hidden
      type="button"
      aria-disabled={isDisabled}
      aria-controls={context.contentId}
      aria-expanded={context.open}
      disabled={isDisabled}
      data-disabled={isDisabled ? '' : undefined}
      {...iconProps}
      tabIndex={-1}
      ref={forwardedRef} // Enable compatibility with native label or custom `Label` "click" for Safari:
      onClick={composeEventHandlers(iconProps.onClick, () => {
        // Whilst browsers generally have no issue focusing the trigger when clicking
        // on a label, Safari seems to struggle with the fact that there's no `onClick`.
        // We force `focus` in this case. Note: this doesn't create any other side-effect
        // because we are preventing default in `onPointerDown` so effectively
        // this only runs for a label "click"
        context.trigger?.focus();
      })}
      onPointerDown={composeEventHandlers(iconProps.onPointerDown, (event) => {
        // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
        // but not when the control key is pressed (avoiding MacOS right click)
        if (event.button === 0 && event.ctrlKey === false) {
          handleOpen();
          // prevent trigger from stealing focus from the active item after opening.
          event.preventDefault();
        }
      })}
      onKeyDown={composeEventHandlers(iconProps.onKeyDown, (event) => {
        if (OPEN_KEYS.includes(event.key)) {
          handleOpen();
          event.preventDefault();
        }
      })}
    >
      {children || '▼'}
    </Primitive.button>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'ComboboxPortal';

type IPortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface PortalProps extends Omit<IPortalProps, 'asChild'> {
  children?: React.ReactNode;
}

const ComboboxPortal = (props: PortalProps) => {
  return <PortalPrimitive asChild {...props} />;
};

ComboboxPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * ComboboxContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'ComboboxContent';

type ComboboxContentElement = ComboboxContentImplElement;
type ContentProps = ComboboxContentImplProps;

const ComboboxContent = React.forwardRef<ComboboxContentElement, ContentProps>((props, forwardedRef) => {
  const context = useComboboxContext(CONTENT_NAME);
  const { getItems } = useCollection(undefined);
  const [fragment, setFragment] = React.useState<DocumentFragment>();

  // setting the fragment in `useLayoutEffect` as `DocumentFragment` doesn't exist on the server
  useLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

  useLayoutEffect(() => {
    if (context.open && context.autocomplete === 'none') {
      setTimeout(() => {
        const activeItem = getItems().find((item) => item.value === context.value);
        activeItem?.ref.current?.scrollIntoView({ block: 'nearest' });
      });
    }
  }, [getItems, context.autocomplete, context.value, context.open]);

  if (!context.open) {
    const frag = fragment as Element | undefined;

    return frag
      ? ReactDOM.createPortal(
          <Collection.Slot scope={undefined}>
            <div>{props.children}</div>
          </Collection.Slot>,
          frag,
        )
      : null;
  }

  return <ComboboxContentImpl {...props} ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxContentImpl
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_MARGIN = 10;

type ComboboxContentImplElement = ComboboxPopperPositionElement;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;

type ComboboxPopperPrivateProps = { onPlaced?: PopperContentProps['onPlaced'] };

interface ComboboxContentImplProps extends Omit<ComboboxPopperPositionProps, keyof ComboboxPopperPrivateProps> {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'];
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside'];
}

/**
 * @internal This is the implementation of the `ComboboxContent` component. But should not be used on it's own
 * for accessibility reasons. Use `ComboboxContent` instead.
 */
const ComboboxContentImpl = React.forwardRef<ComboboxContentImplElement, ComboboxContentImplProps>(
  (props, forwardedRef) => {
    const { onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
    const context = useComboboxContext(CONTENT_NAME);
    const composedRefs = useComposedRefs(forwardedRef, (node) => context.onContentChange(node));

    // prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
    // and close on `pointerup` outside.
    const { onOpenChange } = context;

    useFocusGuards();

    React.useEffect(() => {
      const close = () => {
        onOpenChange(false);
      };
      window.addEventListener('blur', close);
      window.addEventListener('resize', close);

      return () => {
        window.removeEventListener('blur', close);
        window.removeEventListener('resize', close);
      };
    }, [onOpenChange]);

    return (
      <RemoveScroll allowPinchZoom>
        <DismissableLayer
          asChild
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          // When focus is trapped, a focusout event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside={(event) => {
            event.preventDefault();
          }}
          onDismiss={() => {
            context.onOpenChange(false);
            context.trigger?.focus({ preventScroll: true });
          }}
        >
          <ComboboxPopperPosition
            role="listbox"
            id={context.contentId}
            data-state={context.open ? 'open' : 'closed'}
            onContextMenu={(event) => event.preventDefault()}
            {...contentProps}
            ref={composedRefs}
            style={{
              // flex layout so we can place the scroll buttons properly
              display: 'flex',
              flexDirection: 'column',
              // reset the outline by default as the content MAY get focused
              outline: 'none',
              ...contentProps.style,
            }}
          />
        </DismissableLayer>
      </RemoveScroll>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * ComboboxPopperPosition
 * -----------------------------------------------------------------------------------------------*/

type ComboboxPopperPositionElement = React.ElementRef<typeof PopperPrimitive.Content>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface ComboboxPopperPositionProps extends PopperContentProps, ComboboxPopperPrivateProps {}

const ComboboxPopperPosition = React.forwardRef<ComboboxPopperPositionElement, ComboboxPopperPositionProps>(
  (props, forwardedRef) => {
    const { align = 'start', collisionPadding = CONTENT_MARGIN, ...popperProps } = props;

    return (
      <PopperPrimitive.Content
        {...popperProps}
        ref={forwardedRef}
        align={align}
        collisionPadding={collisionPadding}
        style={{
          // Ensure border-box for floating-ui calculations
          boxSizing: 'border-box',
          ...popperProps.style,
          // re-namespace exposed content custom properties
          ...{
            '--radix-combobox-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-combobox-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-combobox-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-combobox-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-combobox-trigger-height': 'var(--radix-popper-anchor-height)',
          },
        }}
      />
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * ComboboxViewport
 * -----------------------------------------------------------------------------------------------*/

const VIEWPORT_NAME = 'ComboboxViewport';

type ComboboxViewportElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>;
interface ViewportProps extends PrimitiveDivProps {}

const ComboboxViewport = React.forwardRef<ComboboxViewportElement, ViewportProps>((props, forwardedRef) => {
  const comboboxContext = useComboboxContext(VIEWPORT_NAME);
  const composedRefs = useComposedRefs(forwardedRef, comboboxContext.onViewportChange);

  return (
    <>
      {/* Hide scrollbars cross-browser and enable momentum scroll for touch devices */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `[data-radix-combobox-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-combobox-viewport]::-webkit-scrollbar{display:none}`,
        }}
      />
      <Collection.Slot scope={undefined}>
        <Primitive.div
          data-radix-combobox-viewport=""
          role="presentation"
          {...props}
          ref={composedRefs}
          style={{
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: 'relative',
            flex: 1,
            overflow: 'auto',
            ...props.style,
          }}
        />
      </Collection.Slot>
    </>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemContext
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'ComboboxItem';

interface ComboboxItemContextValue {
  onTextValueChange(node: HTMLSpanElement | null): void;
  textId: string;
  isSelected: boolean;
  textValue: string;
}

const [ComboboxItemProvider, useComboboxItemContext] = createContext<ComboboxItemContextValue>(ITEM_NAME);

/* -------------------------------------------------------------------------------------------------
 * ComboboxItem
 * -----------------------------------------------------------------------------------------------*/

type ComboboxItemElement = ComboboxItemImplElement;

interface ItemProps extends ItemImplProps {
  textValue?: string;
}

export const ComboboxItem = React.forwardRef<ComboboxItemElement, ItemProps>((props, forwardedRef) => {
  const { value, disabled = false, textValue: textValueProp, ...restProps } = props;
  const [fragment, setFragment] = React.useState<DocumentFragment>();

  // setting the fragment in `useLayoutEffect` as `DocumentFragment` doesn't exist on the server
  useLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

  const { onTextValueChange, textValue: contextTextValue, ...context } = useComboboxContext(ITEM_NAME);

  const textId = useId();

  const [textValue, setTextValue] = React.useState(textValueProp ?? '');

  const isSelected = context.value === value;

  const { startsWith } = useFilter(context.locale, { sensitivity: 'base' });

  const handleTextValueChange = React.useCallback((node: HTMLSpanElement | null) => {
    setTextValue((prevTextValue) => {
      return prevTextValue || (node?.textContent ?? '').trim();
    });
  }, []);

  React.useEffect(() => {
    /**
     * This effect is designed to run when the value prop is
     * controlled and we need to update the text value accordingly.
     */
    if (isSelected && contextTextValue === undefined && textValue !== '') {
      onTextValueChange(textValue);
    }
  }, [textValue, isSelected, contextTextValue, onTextValueChange]);

  if (
    (context.autocomplete === 'both' &&
      textValue &&
      context.filterValue &&
      !startsWith(textValue, context.filterValue)) ||
    (context.autocomplete === 'list' && textValue && contextTextValue && !startsWith(textValue, contextTextValue))
  ) {
    return fragment
      ? ReactDOM.createPortal(
          <ComboboxItemProvider
            textId={textId}
            onTextValueChange={handleTextValueChange}
            isSelected={isSelected}
            textValue={textValue}
          >
            <Collection.ItemSlot
              scope={undefined}
              value={value}
              textValue={textValue}
              disabled={disabled}
              type="option"
              isVisible={false}
            >
              <ComboboxItemImpl ref={forwardedRef} value={value} disabled={disabled} {...restProps} />
            </Collection.ItemSlot>
          </ComboboxItemProvider>,
          fragment,
        )
      : null;
  }

  return (
    <ComboboxItemProvider
      textId={textId}
      onTextValueChange={handleTextValueChange}
      isSelected={isSelected}
      textValue={textValue}
    >
      <Collection.ItemSlot
        scope={undefined}
        value={value}
        textValue={textValue}
        disabled={disabled}
        type="option"
        isVisible
      >
        <ComboboxItemImpl ref={forwardedRef} value={value} disabled={disabled} {...restProps} />
      </Collection.ItemSlot>
    </ComboboxItemProvider>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemImpl
 * -----------------------------------------------------------------------------------------------*/

const ITEM_IMPL_NAME = 'ComboboxItemImpl';

type ComboboxItemImplElement = React.ElementRef<typeof Primitive.div>;

interface ItemImplProps extends PrimitiveDivProps {
  value: string;
  disabled?: boolean;
}

const ComboboxItemImpl = React.forwardRef<ComboboxItemImplElement, ItemImplProps>((props, forwardedRef) => {
  const { value, disabled = false, ...restProps } = props;
  const itemRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, itemRef);

  const { getItems } = useCollection(undefined);
  const { onTextValueChange, visuallyFocussedItem, ...context } = useComboboxContext(ITEM_NAME);
  const { isSelected, textValue, textId } = useComboboxItemContext(ITEM_IMPL_NAME);

  const handleSelect = () => {
    if (!disabled) {
      context.onValueChange(value);
      onTextValueChange(textValue);
      context.onOpenChange(false);

      if (context.autocomplete === 'both') {
        context.onFilterValueChange(textValue);
      }

      context.trigger?.focus({ preventScroll: true });
    }
  };

  const isFocused = React.useMemo(() => {
    return visuallyFocussedItem === getItems().find((item) => item.ref.current === itemRef.current)?.ref.current;
  }, [getItems, visuallyFocussedItem]);

  const id = useId();

  return (
    <Primitive.div
      role="option"
      aria-labelledby={textId}
      data-highlighted={isFocused ? '' : undefined}
      // `isFocused` caveat fixes stuttering in VoiceOver
      aria-selected={isSelected && isFocused}
      data-state={isSelected ? 'checked' : 'unchecked'}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? '' : undefined}
      tabIndex={disabled ? undefined : -1}
      {...restProps}
      id={id}
      ref={composedRefs}
      onPointerUp={composeEventHandlers(restProps.onPointerUp, handleSelect)}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemText
 * -----------------------------------------------------------------------------------------------*/

const ITEM_TEXT_NAME = 'ComboboxItemText';

type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>;
type ItemTextProps = PrimitiveSpanProps;

const ComboboxItemText = React.forwardRef<HTMLSpanElement, ItemTextProps>((props, forwardedRef) => {
  // We ignore `className` and `style` as this part shouldn't be styled.
  const { className: _unusedClassName, style: _unusedStyle, ...itemTextProps } = props;
  const itemContext = useComboboxItemContext(ITEM_TEXT_NAME);
  const composedRefs = useComposedRefs(forwardedRef, itemContext.onTextValueChange);

  return <Primitive.span id={itemContext.textId} {...itemTextProps} ref={composedRefs} />;
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemIndicator
 * -----------------------------------------------------------------------------------------------*/

const ITEM_INDICATOR_NAME = 'ComboboxItemIndicator';
interface ItemIndicatorProps extends PrimitiveSpanProps {}

const ComboboxItemIndicator = React.forwardRef<HTMLSpanElement, ItemIndicatorProps>((props, forwardedRef) => {
  const { isSelected } = useComboboxItemContext(ITEM_INDICATOR_NAME);

  return isSelected ? <Primitive.span aria-hidden {...props} ref={forwardedRef} /> : null;
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxNoValueFound
 * -----------------------------------------------------------------------------------------------*/

const NO_VALUE_FOUND_NAME = 'ComboboxNoValueFound';

interface NoValueFoundProps extends PrimitiveDivProps {}

const ComboboxNoValueFound = React.forwardRef<HTMLDivElement, NoValueFoundProps>((props, ref) => {
  const { textValue = '', filterValue = '', locale, autocomplete } = useComboboxContext(NO_VALUE_FOUND_NAME);
  const [items, setItems] = React.useState<CollectionData[]>([]);
  const { subscribe } = useCollection(undefined);

  const { startsWith } = useFilter(locale, { sensitivity: 'base' });

  /**
   * We need to use a subscription here so we know *exactly*
   * what items are in the collection whenever they update
   */
  React.useEffect(() => {
    const unsub = subscribe((state) => {
      setItems(state);
    });

    return () => {
      unsub();
    };
  }, [subscribe]);

  if (items.length === 0) {
    return <Primitive.div {...props} ref={ref} />;
  }

  if (autocomplete === 'none') {
    return null;
  }

  if (autocomplete === 'list' && items.some((item) => startsWith(item.textValue, textValue))) {
    return null;
  }

  if (autocomplete === 'both' && items.some((item) => startsWith(item.textValue, filterValue))) {
    return null;
  }

  return <Primitive.div {...props} ref={ref} />;
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxCreateItem
 * -----------------------------------------------------------------------------------------------*/

interface CreateItemProps extends PrimitiveDivProps {
  disabled?: boolean;
}

const ComboboxCreateItem = React.forwardRef<ComboboxItemElement, CreateItemProps>((props, ref) => {
  const { disabled = false, ...restProps } = props;
  const context = useComboboxContext(NO_VALUE_FOUND_NAME);
  const { textValue, visuallyFocussedItem } = context;
  const { getItems, subscribe } = useCollection(undefined);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  const composedRefs = useComposedRefs(ref, itemRef);

  const isFocused = React.useMemo(() => {
    return visuallyFocussedItem === getItems().find((item) => item.ref.current === itemRef.current)?.ref.current;
  }, [getItems, visuallyFocussedItem]);

  const id = useId();

  const handleSelect = () => {
    if (!disabled && textValue) {
      context.onValueChange(textValue);
      context.onTextValueChange(textValue);
      context.onOpenChange(false);

      if (context.autocomplete === 'both') {
        context.onFilterValueChange(textValue);
      }

      context.trigger?.focus({ preventScroll: true });
    }
  };

  useLayoutEffect(() => {
    const unsub = subscribe((state) => {
      setShow(!state.some((item) => item.textValue === textValue && item.type !== 'create'));
    });

    if (getItems().length === 0) {
      setShow(true);
    }

    return () => {
      unsub();
    };
  }, [textValue, subscribe, getItems]);

  if (!textValue || !show) {
    return null;
  }

  return (
    <Collection.ItemSlot
      scope={undefined}
      value={textValue ?? ''}
      textValue={textValue ?? ''}
      disabled={disabled}
      isVisible
      type="create"
    >
      <Primitive.div
        role="option"
        tabIndex={disabled ? undefined : -1}
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? '' : undefined}
        data-highlighted={isFocused ? '' : undefined}
        {...restProps}
        id={id}
        ref={composedRefs}
        onPointerUp={composeEventHandlers(restProps.onPointerUp, handleSelect)}
      />
    </Collection.ItemSlot>
  );
});

const Root = Combobox;
const Trigger = ComboboxTrigger;
const TextInput = ComboxboxTextInput;
const Icon = ComboboxIcon;
const Portal = ComboboxPortal;
const Content = ComboboxContent;
const Viewport = ComboboxViewport;
const Item = ComboboxItem;
const ItemText = ComboboxItemText;
const ItemIndicator = ComboboxItemIndicator;
const NoValueFound = ComboboxNoValueFound;
const CreateItem = ComboboxCreateItem;

export {
  Root,
  Trigger,
  TextInput,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  NoValueFound,
  CreateItem,
};

export type {
  RootProps,
  TriggerProps,
  TextInputProps,
  IconProps,
  PortalProps,
  ContentProps,
  ViewportProps,
  ItemProps,
  ItemTextProps,
  ItemIndicatorProps,
  NoValueFoundProps,
  CreateItemProps,
};

/**
 * Given two strings find the exact index of the character that changed
 */
function findChangedIndex(a: string, b: string) {
  const length = Math.min(a.length, b.length);

  for (let i = 0; i < length; i++) {
    if (a[i] !== b[i]) {
      return i;
    }
  }

  return length;
}
