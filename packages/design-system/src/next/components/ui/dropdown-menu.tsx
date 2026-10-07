import * as React from 'react';

import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { useMergedRefs, useReachEnd } from '@/lib/use-reach-end';
import { cn } from '@/lib/utils';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { CaretDown, Check, ChevronRight, ExternalLink } from '@strapi/icons';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * The menu of actions. It replaces the legacy `Menu` and `SimpleMenu` (a Radix DropdownMenu).
 */

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger, Portal, Group
 * -----------------------------------------------------------------------------------------------*/

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, MenuPrimitive.Trigger.Props>((props, ref) => {
  return <MenuPrimitive.Trigger ref={ref} data-slot="dropdown-menu-trigger" {...props} />;
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuPortal = React.forwardRef<HTMLDivElement, MenuPrimitive.Portal.Props>((props, ref) => {
  return <MenuPrimitive.Portal ref={ref} data-slot="dropdown-menu-portal" {...props} />;
});

DropdownMenuPortal.displayName = 'DropdownMenuPortal';

const DropdownMenuGroup = React.forwardRef<HTMLDivElement, MenuPrimitive.Group.Props>((props, ref) => {
  return <MenuPrimitive.Group ref={ref} data-slot="dropdown-menu-group" {...props} />;
});

DropdownMenuGroup.displayName = 'DropdownMenuGroup';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

const menuPopupClassName = cn(
  'relative flex max-h-38 flex-col items-start overflow-auto rounded-md border border-neutral-150 bg-neutral-0 p-1 text-neutral-800 shadow-filter outline-none',
  // The legacy menu scrolls without a visible scrollbar
  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  'origin-(--transform-origin) motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
  'data-ending-style:opacity-0 data-starting-style:opacity-0',
  'data-[side=bottom]:data-starting-style:-translate-y-2.5 data-[side=top]:data-starting-style:translate-y-2.5',
  'data-[side=bottom]:data-ending-style:-translate-y-2.5 data-[side=top]:data-ending-style:translate-y-2.5',
);

type PositionerProps = Pick<
  MenuPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'anchor' | 'collisionPadding' | 'side' | 'sideOffset' | 'sticky'
>;

interface DropdownMenuContentProps extends MenuPrimitive.Popup.Props, PositionerProps {
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: MenuPrimitive.Portal.Props['container'];
  /**
   * Called when the last item scrolls into view, for example to load the next page of items.
   * It only fires when the menu overflows.
   */
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

/**
 * The list of items. Opens below the trigger and aligned to its start, like the legacy `Menu.Content`.
 */
const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (
    {
      align = 'start',
      alignOffset = 0,
      anchor,
      collisionPadding,
      side = 'bottom',
      sideOffset = 4,
      sticky,
      container,
      onReachEnd,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { rootRef, sentinelRef, enabled } = useReachEnd(onReachEnd);
    const composedRef = useMergedRefs(ref, rootRef);

    return (
      <MenuPrimitive.Portal container={container}>
        <MenuPrimitive.Positioner
          className="isolate z-500 outline-none"
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
          collisionPadding={collisionPadding}
          side={side}
          sideOffset={sideOffset}
          sticky={sticky}
        >
          <MenuPrimitive.Popup
            ref={composedRef}
            data-slot="dropdown-menu-content"
            className={cn(menuPopupClassName, className)}
            {...props}
          >
            {children}
            {enabled ? <div ref={sentinelRef} aria-hidden className="h-px w-full shrink-0" /> : null}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    );
  },
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

/* -------------------------------------------------------------------------------------------------
 * Item, LinkItem
 * -----------------------------------------------------------------------------------------------*/

const dropdownMenuItemVariants = cva(
  [
    'flex w-full shrink-0 cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-left no-underline outline-none select-none',
    'text-base medium:text-sm',
    'data-disabled:cursor-not-allowed',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          'text-neutral-800 data-highlighted:bg-primary-100 [&_svg]:text-neutral-500',
          'data-disabled:text-neutral-500 data-disabled:[&_svg]:text-neutral-300',
        ],
        danger: [
          'text-danger-700 data-highlighted:bg-danger-100 [&_svg]:text-danger-700',
          'data-disabled:text-danger-500 data-disabled:[&_svg]:text-danger-500',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ItemContentProps {
  /**
   * An icon before the label. It is hidden from assistive technology.
   */
  startIcon?: React.ReactNode;
  /**
   * An icon after the label, pushed to the end of the item. It is hidden from assistive technology.
   */
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ItemContent = ({ startIcon, endIcon, children }: ItemContentProps) => (
  <>
    {startIcon ? (
      <span aria-hidden className="flex shrink-0">
        {startIcon}
      </span>
    ) : null}
    <span className="grow">{children}</span>
    {endIcon ? (
      <span aria-hidden className="flex shrink-0">
        {endIcon}
      </span>
    ) : null}
  </>
);

interface DropdownMenuItemProps
  extends Omit<MenuPrimitive.Item.Props, 'children'>,
    ItemContentProps,
    VariantProps<typeof dropdownMenuItemVariants> {}

/**
 * An action in the menu. Put the action in `onClick`; it fires on click, `Enter` and `Space`.
 */
const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, variant, startIcon, endIcon, children, ...props }, ref) => {
    return (
      <MenuPrimitive.Item
        ref={ref}
        data-slot="dropdown-menu-item"
        data-variant={variant ?? 'default'}
        className={cn(dropdownMenuItemVariants({ variant }), className)}
        {...props}
      >
        <ItemContent startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ItemContent>
      </MenuPrimitive.Item>
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

interface DropdownMenuLinkItemProps
  extends Omit<MenuPrimitive.LinkItem.Props, 'children'>,
    ItemContentProps,
    VariantProps<typeof dropdownMenuItemVariants> {
  /**
   * Opens the link in a new tab, with `rel="noreferrer noopener"`, and shows the external link icon
   * when there is no `endIcon`.
   * @default false
   */
  isExternal?: boolean;
}

/**
 * A link in the menu. Renders an `<a>`; pass `render` for a router link, e.g. `render={<NavLink to="/" />}`.
 * Closes the menu on click, like the legacy link items.
 */
const DropdownMenuLinkItem = React.forwardRef<HTMLAnchorElement, DropdownMenuLinkItemProps>(
  ({ className, variant, startIcon, endIcon, isExternal = false, closeOnClick = true, children, ...props }, ref) => {
    return (
      <MenuPrimitive.LinkItem
        ref={ref}
        data-slot="dropdown-menu-link-item"
        data-variant={variant ?? 'default'}
        className={cn(dropdownMenuItemVariants({ variant }), className)}
        closeOnClick={closeOnClick}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      >
        <ItemContent startIcon={startIcon} endIcon={endIcon ?? (isExternal ? <ExternalLink /> : undefined)}>
          {children}
        </ItemContent>
      </MenuPrimitive.LinkItem>
    );
  },
);

DropdownMenuLinkItem.displayName = 'DropdownMenuLinkItem';

/* -------------------------------------------------------------------------------------------------
 * CheckboxItem, RadioGroup, RadioItem
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuPrimitive.CheckboxItem.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuPrimitive.CheckboxItem
        ref={ref}
        data-slot="dropdown-menu-checkbox-item"
        className={cn(dropdownMenuItemVariants(), 'pr-10', 'relative', className)}
        {...props}
      >
        <span className="grow">{children}</span>
        <span aria-hidden className="pointer-events-none absolute right-4 flex items-center">
          <MenuPrimitive.CheckboxItemIndicator>
            <Check />
          </MenuPrimitive.CheckboxItemIndicator>
        </span>
      </MenuPrimitive.CheckboxItem>
    );
  },
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, MenuPrimitive.RadioGroup.Props>((props, ref) => {
  return <MenuPrimitive.RadioGroup ref={ref} data-slot="dropdown-menu-radio-group" {...props} />;
});

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, MenuPrimitive.RadioItem.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuPrimitive.RadioItem
        ref={ref}
        data-slot="dropdown-menu-radio-item"
        className={cn(dropdownMenuItemVariants(), 'relative pr-10', className)}
        {...props}
      >
        <span className="grow">{children}</span>
        <span aria-hidden className="pointer-events-none absolute right-4 flex items-center">
          <MenuPrimitive.RadioItemIndicator>
            <Check />
          </MenuPrimitive.RadioItemIndicator>
        </span>
      </MenuPrimitive.RadioItem>
    );
  },
);

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/* -------------------------------------------------------------------------------------------------
 * Label, GroupLabel, Separator
 * -----------------------------------------------------------------------------------------------*/

const labelClassName = 'shrink-0 px-4 py-2 text-2xs font-semibold text-neutral-600 uppercase';

/**
 * A heading for the items below it, in the legacy `sigma` style. Use it anywhere in the menu; to label a
 * `DropdownMenuGroup` for assistive technology, use `DropdownMenuGroupLabel` instead.
 */
const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="dropdown-menu-label" className={cn(labelClassName, className)} {...props} />;
  },
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/**
 * The accessible label of a `DropdownMenuGroup`. It must be inside the group.
 */
const DropdownMenuGroupLabel = React.forwardRef<HTMLDivElement, MenuPrimitive.GroupLabel.Props>(
  ({ className, ...props }, ref) => {
    return (
      <MenuPrimitive.GroupLabel
        ref={ref}
        data-slot="dropdown-menu-group-label"
        className={cn(labelClassName, className)}
        {...props}
      />
    );
  },
);

DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, MenuPrimitive.Separator.Props>(
  ({ className, ...props }, ref) => {
    return (
      <MenuPrimitive.Separator
        ref={ref}
        data-slot="dropdown-menu-separator"
        // The negative margin cancels the padding of the content. A separator with nothing above it hides
        className={cn('-mx-1 my-1 h-px w-[calc(100%+0.8rem)] shrink-0 bg-neutral-150 first:hidden', className)}
        {...props}
      />
    );
  },
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* -------------------------------------------------------------------------------------------------
 * Sub, SubTrigger, SubContent
 * -----------------------------------------------------------------------------------------------*/

function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, MenuPrimitive.SubmenuTrigger.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuPrimitive.SubmenuTrigger
        ref={ref}
        data-slot="dropdown-menu-sub-trigger"
        className={cn(dropdownMenuItemVariants(), 'gap-5 data-popup-open:bg-primary-100', className)}
        {...props}
      >
        <span className="grow">{children}</span>
        <ChevronRight aria-hidden className="size-3" />
      </MenuPrimitive.SubmenuTrigger>
    );
  },
);

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

/**
 * The nested list of a submenu. Opens beside its trigger, 8px away.
 */
const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ side = 'inline-end', align = 'start', sideOffset = 8, ...props }, ref) => {
    return (
      <DropdownMenuContent
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        {...props}
      />
    );
  },
);

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/* -------------------------------------------------------------------------------------------------
 * SimpleMenu
 * -----------------------------------------------------------------------------------------------*/

interface SimpleMenuProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'children' | 'onClick'>,
    Pick<DropdownMenuContentProps, 'side' | 'align' | 'onReachEnd'> {
  /**
   * The text of the trigger. With `icon`, it is the accessible name and the tooltip of the icon-only trigger.
   */
  label: React.ReactNode;
  /**
   * Renders an icon-only trigger (an IconButton) with this icon, like the legacy `tag={IconButton}`.
   */
  icon?: React.ReactNode;
  /**
   * The icon after the label of a text trigger.
   * @default <CaretDown />
   */
  endIcon?: React.ReactNode;
  /**
   * The Button variant of a text trigger.
   * @default 'ghost'
   */
  variant?: React.ComponentPropsWithoutRef<typeof Button>['variant'];
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * The one-line API of the legacy `SimpleMenu`: a ghost Button trigger with a caret, and the items.
 */
const SimpleMenu = React.forwardRef<HTMLButtonElement, SimpleMenuProps>(
  (
    {
      label,
      icon,
      endIcon = <CaretDown className="size-3" />,
      children,
      onOpen,
      onClose,
      side,
      align,
      onReachEnd,
      variant = 'ghost',
      disabled,
      ...props
    },
    ref,
  ) => {
    const handleOpenChange = (open: boolean) => {
      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }
    };

    return (
      <DropdownMenu onOpenChange={handleOpenChange} disabled={disabled}>
        {icon ? (
          <DropdownMenuTrigger
            ref={ref}
            disabled={disabled}
            render={
              <IconButton label={typeof label === 'string' ? label : String(label)} disabled={disabled}>
                {icon}
              </IconButton>
            }
          />
        ) : (
          <DropdownMenuTrigger
            ref={ref}
            disabled={disabled}
            render={<Button variant={variant} endIcon={endIcon} disabled={disabled} {...props} />}
          >
            {label}
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent side={side} align={align} onReachEnd={onReachEnd}>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

SimpleMenu.displayName = 'SimpleMenu';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SimpleMenu,
  dropdownMenuItemVariants,
};
export type { DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuLinkItemProps, SimpleMenuProps };
