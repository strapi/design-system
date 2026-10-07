import * as React from 'react';

import {
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
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuLinkItemProps,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';

/*
 * The menu that opens at the pointer on a right-click (or a long press on touch), as in shadcn. There is no
 * legacy counterpart. Base UI builds it from the parts of its Menu, so the parts below are the DropdownMenu
 * ones with their own `data-slot`: both menus look the same.
 */

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger
 * -----------------------------------------------------------------------------------------------*/

function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

/**
 * The area that opens the menu on a right-click. Renders a `<div>`; pass `render` to use your own element.
 */
const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuPrimitive.Trigger.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Trigger
        ref={ref}
        data-slot="context-menu-trigger"
        className={cn('select-none', className)}
        {...props}
      />
    );
  },
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

/* -------------------------------------------------------------------------------------------------
 * Parts
 * -----------------------------------------------------------------------------------------------*/

/**
 * The list of items. Opens at the pointer, below it and aligned to its start.
 */
const ContextMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ sideOffset = 0, ...props }, ref) => {
    return <DropdownMenuContent ref={ref} data-slot="context-menu-content" sideOffset={sideOffset} {...props} />;
  },
);

ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>((props, ref) => {
  return <DropdownMenuItem ref={ref} data-slot="context-menu-item" {...props} />;
});

ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuLinkItem = React.forwardRef<HTMLAnchorElement, DropdownMenuLinkItemProps>((props, ref) => {
  return <DropdownMenuLinkItem ref={ref} data-slot="context-menu-link-item" {...props} />;
});

ContextMenuLinkItem.displayName = 'ContextMenuLinkItem';

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>
>((props, ref) => {
  return <DropdownMenuCheckboxItem ref={ref} data-slot="context-menu-checkbox-item" {...props} />;
});

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadioGroup>
>((props, ref) => {
  return <DropdownMenuRadioGroup ref={ref} data-slot="context-menu-radio-group" {...props} />;
});

ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRadioItem>
>((props, ref) => {
  return <DropdownMenuRadioItem ref={ref} data-slot="context-menu-radio-item" {...props} />;
});

ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

const ContextMenuGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuGroup>>(
  (props, ref) => {
    return <DropdownMenuGroup ref={ref} data-slot="context-menu-group" {...props} />;
  },
);

ContextMenuGroup.displayName = 'ContextMenuGroup';

const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuLabel>>(
  (props, ref) => {
    return <DropdownMenuLabel ref={ref} data-slot="context-menu-label" {...props} />;
  },
);

ContextMenuLabel.displayName = 'ContextMenuLabel';

const ContextMenuGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuGroupLabel>
>((props, ref) => {
  return <DropdownMenuGroupLabel ref={ref} data-slot="context-menu-group-label" {...props} />;
});

ContextMenuGroupLabel.displayName = 'ContextMenuGroupLabel';

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuSeparator>
>((props, ref) => {
  return <DropdownMenuSeparator ref={ref} data-slot="context-menu-separator" {...props} />;
});

ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenuPortal = DropdownMenuPortal;
const ContextMenuSub = DropdownMenuSub;

const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuSubTrigger>
>((props, ref) => {
  return <DropdownMenuSubTrigger ref={ref} data-slot="context-menu-sub-trigger" {...props} />;
});

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

const ContextMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>((props, ref) => {
  return <DropdownMenuSubContent ref={ref} data-slot="context-menu-sub-content" {...props} />;
});

ContextMenuSubContent.displayName = 'ContextMenuSubContent';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuLinkItem,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
