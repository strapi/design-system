import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { hideOthers } from 'aria-hidden';

import { composeEventHandlers } from '@radix-ui/primitive';
import { createCollection } from '@radix-ui/react-collection';
import { composeRefs, useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContext } from '@radix-ui/react-context';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { useId } from '@radix-ui/react-id';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { Portal as PortalPrimitive } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import type { ComponentPropsWithoutRef } from '@radix-ui/react-primitive';

import { useFilter } from '../../hooks/useFilter';

const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
const SELECTION_KEYS = [' ', 'Enter'];

/* -------------------------------------------------------------------------------------------------
 * Combobox
 * -----------------------------------------------------------------------------------------------*/

const COMBOBOX_NAME = 'Combobox';

const [Collection, useCollection] = createCollection<ComboboxItemElement, ItemData>(COMBOBOX_NAME);

type ItemData = { value: string; disabled: boolean; textValue: string };

type ComboboxContextValue = {
  contentId: string;
  disabled?: boolean;
  locale: string;
  onOpenChange(open: boolean): void;
  onTriggerChange(node: ComboboxTriggerElement | null): void;
  onValueChange(value: string | undefined): void;
  open: boolean;
  required: boolean;
  trigger: ComboboxTriggerElement | null;
  value?: string;
  focusFirst: (candidates: Array<HTMLElement | null>) => void;
  textValue?: string;
  onTextValueChange(textValue: string): void;
  onViewportChange(node: ComboboxViewportElement | null): void;
  onSearchValueChange(searchValue: string): void;
  searchValue: string;
  onContentChange(node: ComboboxContentImplElement | null): void;
};

const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContextValue>(COMBOBOX_NAME);

interface RootProps {
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
}

/**
 * @internal don't expose this. It's only used to access the `useCollection` hook.
 */
const ComboboxProviders = ({ children }: { children: React.ReactNode }) => (
  <PopperPrimitive.Root>
    <Collection.Provider scope={undefined}>{children}</Collection.Provider>
  </PopperPrimitive.Root>
);

const Combobox: React.FC<RootProps> = (props) => {
  const {
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
  } = props;

  const [trigger, setTrigger] = React.useState<ComboboxTriggerElement | null>(null);
  const [viewport, setViewport] = React.useState<ComboboxViewportElement | null>(null);
  const [content, setContent] = React.useState<ComboboxContentImplElement | null>(null);
  const [searchValue, setSearchValue] = React.useState('');

  const getItems = useCollection(undefined);

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
    defaultProp: defaultTextValue,
    onChange: onTextValueChange,
  });

  const id = useId();

  const focusFirst = React.useCallback(
    (candidates: Array<HTMLElement | null>) => {
      const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
      const [lastItem] = restItems.slice(-1);

      const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
      for (const candidate of candidates) {
        // if focus is already where we want to go, we don't want to keep going through the candidates
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate?.scrollIntoView({ block: 'nearest' });
        // viewport might have padding so scroll to its edges when focusing first/last items.
        if (candidate === firstItem && viewport) viewport.scrollTop = 0;
        if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
        candidate?.focus();
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
      }
    },
    [getItems, viewport],
  );

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  React.useEffect(() => {
    if (content && trigger) return hideOthers([content, trigger]);
  }, [content, trigger]);

  return (
    <ComboboxProviders>
      <ComboboxProvider
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
        onSearchValueChange={setSearchValue}
        searchValue={searchValue}
        onContentChange={setContent}
      >
        {children}
      </ComboboxProvider>
    </ComboboxProviders>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboboxTrigger
 * -----------------------------------------------------------------------------------------------*/

type ComboboxTriggerElement = React.ElementRef<'input'>;
type TriggerProps = PrimitiveDivProps;

const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, TriggerProps>((props, forwardedRef) => {
  const { ...triggerProps } = props;

  return (
    <PopperPrimitive.Anchor asChild>
      <div ref={forwardedRef} {...triggerProps} />
    </PopperPrimitive.Anchor>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxInput
 * -----------------------------------------------------------------------------------------------*/

const INPUT_NAME = 'ComboboxInput';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ComboxboxInput = React.forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const { ...inputProps } = props;

  const context = useComboboxContext(INPUT_NAME);
  const getItems = useCollection(undefined);

  const isDisabled = context.disabled;
  const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);

  const handleOpen = () => {
    if (!isDisabled) {
      context.onOpenChange(true);
    }
  };

  return (
    <input
      type="text"
      role="combobox"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      aria-required={context.required}
      aria-autocomplete="both"
      data-state={context.open ? 'open' : 'closed'}
      disabled={isDisabled}
      data-disabled={isDisabled ? '' : undefined}
      data-placeholder={context.textValue === undefined ? '' : undefined}
      value={context.textValue ?? ''}
      {...inputProps}
      ref={composedRefs}
      // Enable compatibility with native label or custom `Label` "click" for Safari:
      onClick={composeEventHandlers(inputProps.onClick, (event) => {
        // Whilst browsers generally have no issue focusing the trigger when clicking
        // on a label, Safari seems to struggle with the fact that there's no `onClick`.
        // We force `focus` in this case. Note: this doesn't create any other side-effect
        // because we are preventing default in `onPointerDown` so effectively
        // this only runs for a label "click"
        event.currentTarget.focus();
      })}
      onPointerDown={composeEventHandlers(inputProps.onPointerDown, (event) => {
        // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
        // but not when the control key is pressed (avoiding MacOS right click)
        if (event.button === 0 && event.ctrlKey === false) {
          handleOpen();
          // prevent trigger from stealing focus from the active item after opening.
          event.preventDefault();
        }
      })}
      onKeyDown={composeEventHandlers(inputProps.onKeyDown, (event) => {
        if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
          /**
           * Put it in a set timeout because we need a single tick to make sure the
           * menu is open and the items are rendered.
           */
          setTimeout(() => {
            const items = getItems().filter((item) => !item.disabled);
            let candidateNodes = items.map((item) => item.ref.current!);

            if (['ArrowUp', 'End'].includes(event.key)) {
              candidateNodes = candidateNodes.slice().reverse();
            }
            if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
              const currentElement = event.target as ComboboxItemElement;
              const currentIndex = candidateNodes.indexOf(currentElement);
              candidateNodes = candidateNodes.slice(currentIndex + 1);
            }

            context.focusFirst(candidateNodes);
          });

          event.preventDefault();
        }

        if (!context.open) {
          handleOpen();
        }
      })}
      onChange={composeEventHandlers(inputProps.onChange, (event) => {
        context.onTextValueChange(event.currentTarget.value);
        context.onSearchValueChange(event.currentTarget.value);
      })}
      onBlur={composeEventHandlers(inputProps.onBlur, (event) => {
        const [activeItem] = getItems().filter((item) => item.textValue === context.textValue);
        const [previousItem] = getItems().filter((item) => item.value === context.value);

        /**
         * If we've succesfully typed a value that matches an item, we want to
         * update the value to that item's value. Otherwise, we want to update
         * the value to the previous value.
         *
         * If theres no previous value and we've typed a value that doesn't match
         * an item, we want to clear the value.
         */
        if (activeItem) {
          context.onValueChange(activeItem.value);
        } else if (previousItem && event.currentTarget.value !== '') {
          context.onTextValueChange(previousItem.textValue);
        } else {
          context.onValueChange(undefined);
          context.onTextValueChange('');
        }

        context.onSearchValueChange('');
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
    <button
      aria-hidden
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
    </button>
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

const ComboboxPortal: React.FC<PortalProps> = (props) => {
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
  const [fragment, setFragment] = React.useState<DocumentFragment>();

  // setting the fragment in `useLayoutEffect` as `DocumentFragment` doesn't exist on the server
  React.useLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

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

  position?: 'item-aligned' | 'popper';
}

/**
 * @internal This is the implementation of the `ComboboxContent` component. But should not be used on it's own
 * for accessibility reasons. Use `ComboboxContent` instead.
 */
const ComboboxContentImpl = React.forwardRef<ComboboxContentImplElement, ComboboxContentImplProps>(
  (props, forwardedRef) => {
    const { position = 'item-aligned', onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
    const context = useComboboxContext(CONTENT_NAME);
    const composedRefs = useComposedRefs(forwardedRef, (node) => context.onContentChange(node));

    // prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
    // and close on `pointerup` outside.
    const { onOpenChange } = context;

    const getItems = useCollection(undefined);

    React.useEffect(() => {
      const close = () => onOpenChange(false);
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
          onFocusOutside={(event) => event.preventDefault()}
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
            onKeyDown={composeEventHandlers(contentProps.onKeyDown, (event) => {
              // Combobox should not be navigated using tab key so we prevent it
              if (event.key === 'Tab') event.preventDefault();

              if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                const items = getItems().filter((item) => !item.disabled);
                let candidateNodes = items.map((item) => item.ref.current!);

                if (['ArrowUp', 'End'].includes(event.key)) {
                  candidateNodes = candidateNodes.slice().reverse();
                }
                if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
                  const currentElement = event.target as ComboboxItemElement;
                  const currentIndex = candidateNodes.indexOf(currentElement);
                  candidateNodes = candidateNodes.slice(currentIndex + 1);
                }

                setTimeout(() => context.focusFirst(candidateNodes));

                event.preventDefault();
              }
            })}
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
}

const [ComboboxItemProvider, useComboboxItemContext] = createContext<ComboboxItemContextValue>(ITEM_NAME);

/* -------------------------------------------------------------------------------------------------
 * ComboboxItem
 * -----------------------------------------------------------------------------------------------*/

type ComboboxItemElement = React.ElementRef<typeof Primitive.div>;

interface ItemProps extends React.OptionHTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  textValue?: string;
}

export const ComboboxItem = React.forwardRef<ComboboxItemElement, ItemProps>((props, forwardedRef) => {
  const { value, disabled = false, textValue: textValueProp, ...restProps } = props;

  const context = useComboboxContext(ITEM_NAME);

  const textId = useId();

  const [textValue, setTextValue] = React.useState(textValueProp ?? '');
  const [isFocused, setIsFocused] = React.useState(false);

  const itemRef = React.useRef(null!);

  const composedRefs = composeRefs(forwardedRef, itemRef);

  const isSelected = context.value === value;

  const handleSelect = () => {
    if (!disabled) {
      context.onValueChange(value);
      context.onTextValueChange(textValue);
      context.onOpenChange(false);
      context.trigger?.focus({ preventScroll: true });
    }
  };

  const { contains } = useFilter(context.locale, { sensitivity: 'base' });

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
    if (isSelected && context.textValue === undefined && textValue !== '') {
      context.onTextValueChange(textValue);
    }
  }, [textValue, isSelected, context.textValue]);

  if (context.searchValue && !contains(textValue, context.searchValue)) {
    return null;
  }

  return (
    <ComboboxItemProvider textId={textId} onTextValueChange={handleTextValueChange} isSelected={isSelected}>
      <Collection.ItemSlot scope={undefined} value={value} textValue={textValue} disabled={disabled}>
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
          ref={composedRefs}
          onFocus={composeEventHandlers(restProps.onFocus, () => setIsFocused(true))}
          onBlur={composeEventHandlers(restProps.onBlur, () => setIsFocused(false))}
          onPointerUp={composeEventHandlers(restProps.onPointerUp, handleSelect)}
          onKeyDown={composeEventHandlers(restProps.onKeyDown, (event) => {
            if (SELECTION_KEYS.includes(event.key)) handleSelect();
            // prevent page scroll if using the space key to select an item
            if (event.key === ' ') event.preventDefault();
          })}
        />
      </Collection.ItemSlot>
    </ComboboxItemProvider>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemText
 * -----------------------------------------------------------------------------------------------*/

const ITEM_TEXT_NAME = 'ComboboxItemText';

type ItemTextProps = React.HTMLAttributes<HTMLSpanElement>;

const ComboboxItemText = React.forwardRef<HTMLSpanElement, ItemTextProps>((props, forwardedRef) => {
  // We ignore `className` and `style` as this part shouldn't be styled.
  const { className, style, ...itemTextProps } = props;
  const itemContext = useComboboxItemContext(ITEM_TEXT_NAME);
  const composedRefs = useComposedRefs(forwardedRef, itemContext.onTextValueChange);

  return <span id={itemContext.textId} {...itemTextProps} ref={composedRefs} />;
});

/* -------------------------------------------------------------------------------------------------
 * ComboboxItemIndicator
 * -----------------------------------------------------------------------------------------------*/

const ITEM_INDICATOR_NAME = 'ComboboxItemIndicator';

interface ItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ComboboxItemIndicator = React.forwardRef<HTMLSpanElement, ItemIndicatorProps>((props, forwardedRef) => {
  const { isSelected } = useComboboxItemContext(ITEM_INDICATOR_NAME);
  return isSelected ? <span aria-hidden {...props} ref={forwardedRef} /> : null;
});

const Root = Combobox;
const Trigger = ComboboxTrigger;
const Input = ComboxboxInput;
const Icon = ComboboxIcon;
const Portal = ComboboxPortal;
const Content = ComboboxContent;
const Viewport = ComboboxViewport;
const Item = ComboboxItem;
const ItemText = ComboboxItemText;
const ItemIndicator = ComboboxItemIndicator;

export { Root, Trigger, Input, Icon, Portal, Content, Viewport, Item, ItemText, ItemIndicator };

export type {
  RootProps,
  TriggerProps,
  InputProps,
  IconProps,
  PortalProps,
  ContentProps,
  ViewportProps,
  ItemProps,
  ItemTextProps,
  ItemIndicatorProps,
};
