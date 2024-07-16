import * as React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDown, ChevronRight } from '@strapi/icons';
import { styled, css, type DefaultTheme } from 'styled-components';

import { extractStyleFromTheme } from '../../helpers/theme';
import { BaseLink } from '../BaseLink';
import { Box, BoxProps } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { IconButton } from '../IconButton';
import { Link, LinkProps } from '../Link';
import { Typography, TypographyComponent, TypographyProps } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * MenuRoot
 * -----------------------------------------------------------------------------------------------*/

interface RootProps extends DropdownMenu.DropdownMenuProps {}

const MenuRoot = DropdownMenu.Root;

/* -------------------------------------------------------------------------------------------------
 * MenuTrigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerPropsBase = Omit<ButtonProps, 'tag' | 'children'> & {
  endIcon?: React.ReactNode;
  label?: React.ReactNode | string;
};

type TriggerPropsWithButton = TriggerPropsBase & {
  tag?: typeof Button;
  icon?: React.ReactNode;
};

type TriggerPropsWithIconButton = TriggerPropsBase & {
  tag: typeof IconButton;
  icon: React.ReactNode;
};

type TriggerProps = TriggerPropsWithButton | TriggerPropsWithIconButton;

const MenuTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (
    { label, size, endIcon = <CaretDown width="0.6rem" height="0.4rem" aria-hidden />, tag = Button, icon, ...props },
    ref,
  ) => {
    return (
      <DropdownMenu.Trigger asChild>
        {tag === IconButton ? (
          <IconButton
            ref={ref}
            label={label as string}
            type="button"
            variant="ghost"
            paddingTop={size === 'S' ? 1 : 2}
            paddingBottom={size === 'S' ? 1 : 2}
            paddingLeft={size === 'S' ? 3 : 4}
            paddingRight={size === 'S' ? 3 : 4}
            {...props}
          >
            {icon}
          </IconButton>
        ) : (
          <Button
            ref={ref}
            type="button"
            variant="ghost"
            endIcon={endIcon}
            paddingTop={size === 'S' ? 1 : 2}
            paddingBottom={size === 'S' ? 1 : 2}
            paddingLeft={size === 'S' ? 3 : 4}
            paddingRight={size === 'S' ? 3 : 4}
            {...props}
          >
            {label}
          </Button>
        )}
      </DropdownMenu.Trigger>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

interface ContentProps extends FlexProps<'div'> {
  intersectionId?: string;
  popoverPlacement?: `${NonNullable<DropdownMenu.DropdownMenuContentProps['side']>}-${NonNullable<DropdownMenu.DropdownMenuContentProps['align']>}`;
}

const MenuContent = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, intersectionId, popoverPlacement = 'bottom-start', ...props }, ref) => {
    const [side, align] = popoverPlacement.split('-') as [
      DropdownMenu.DropdownMenuContentProps['side'],
      DropdownMenu.DropdownMenuContentProps['align'],
    ];

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={align} side={side} loop asChild>
          <Viewport
            ref={ref}
            direction="column"
            borderColor="neutral150"
            hasRadius
            background="neutral0"
            shadow="filterShadow"
            maxHeight="15rem"
            padding={1}
            alignItems="flex-start"
            position="relative"
            overflow="auto"
            {...props}
          >
            {children}
            <Box id={intersectionId} width="100%" height="1px" />
          </Viewport>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    );
  },
);

const Viewport = styled<FlexComponent>(Flex)`
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/

interface ItemSharedProps extends Pick<DropdownMenu.MenuItemProps, 'disabled' | 'onSelect'> {
  children?: React.ReactNode;
  isExternal?: boolean;
  isFocused?: boolean;
}

interface ItemExternalLinkProps extends ItemSharedProps, Omit<LinkProps, 'onSelect'> {
  as?: never;
  isLink?: false;
  isExternal?: true;
}

type ItemInternalLinkProps<TComponent extends React.ComponentType = typeof BaseLink> = ItemSharedProps &
  React.ComponentPropsWithoutRef<TComponent> & {
    as?: TComponent;
    isLink?: true;
    isExternal?: false;
  };

interface ItemButtonProps extends ItemSharedProps, Omit<BoxProps<'button'>, 'onSelect'> {
  as?: never;
  isLink?: false;
  isExternal?: false;
}

type ItemProps<TComponent extends React.ComponentType = typeof BaseLink> =
  | ItemButtonProps
  | ItemInternalLinkProps<TComponent>
  | ItemExternalLinkProps;

const MenuItem = ({ onSelect, disabled = false, isLink, ...props }: ItemProps) => {
  return (
    <DropdownMenu.Item asChild onSelect={onSelect} disabled={disabled}>
      {isLink || props.isExternal ? (
        <OptionLink color="neutral800" {...props} isExternal={props.isExternal ?? false}>
          <Typography>{props.children}</Typography>
        </OptionLink>
      ) : (
        <OptionButton cursor="pointer" color="neutral800" background="transparent" borderStyle="none" {...props}>
          <Typography>{props.children}</Typography>
        </OptionButton>
      )}
    </DropdownMenu.Item>
  );
};

const getOptionStyle = ({ theme }: { theme: DefaultTheme }) => css`
  text-align: left;
  width: 100%;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spaces[2]} ${theme.spaces[4]};

  &[aria-disabled] {
    cursor: not-allowed;
    color: ${theme.colors.neutral500};
  }

  &[data-highlighted] {
    background-color: ${theme.colors.primary100};
  }

  &:focus-visible {
    outline: none;

    &:after {
      content: none;
    }
  }
`;

const OptionButton = styled<FlexComponent<'button' | 'a'>>(Flex)`
  ${getOptionStyle}
`;

const OptionLink = styled(Link)`
  /* We include this here again because typically when people use OptionLink they provide an as prop which cancels the Box props */
  color: ${({ theme, color }) => extractStyleFromTheme(theme.colors, color, undefined)};
  text-decoration: none;

  &:hover {
    color: unset;
  }

  /* TODO: do we need this? */
  svg > path,
  &:focus-visible svg > path {
    fill: currentColor;
  }

  ${getOptionStyle}
`;

/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/

interface LabelProps extends TypographyProps {}

const MenuLabel = React.forwardRef<HTMLSpanElement, LabelProps>((props, ref) => (
  <DropdownMenu.Label asChild>
    <StyledLabel ref={ref} variant="sigma" textColor="neutral600" {...props} />
  </DropdownMenu.Label>
));

const StyledLabel = styled<TypographyComponent>(Typography)`
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
`;

/* -------------------------------------------------------------------------------------------------
 * MenuSubRoot
 * -----------------------------------------------------------------------------------------------*/

interface SubRootProps extends DropdownMenu.DropdownMenuSubProps {}

const MenuSubRoot = DropdownMenu.Sub;

/* -------------------------------------------------------------------------------------------------
 * MenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/

interface SubTriggerProps extends BoxProps<'button'> {}

const MenuSubTrigger = React.forwardRef<HTMLButtonElement, SubTriggerProps>(({ disabled = false, ...props }, ref) => {
  return (
    <DropdownMenu.SubTrigger asChild disabled={disabled}>
      <SubmenuTrigger
        ref={ref}
        color="neutral800"
        tag="button"
        type="button"
        background="transparent"
        borderStyle="none"
        gap={5}
        {...props}
      >
        <Typography>{props.children}</Typography>
        <ChevronRight fill="neutral500" height="1.2rem" width="1.2rem" />
      </SubmenuTrigger>
    </DropdownMenu.SubTrigger>
  );
});

const SubmenuTrigger = styled(OptionButton)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.primary100};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * MenuSubContent
 * -----------------------------------------------------------------------------------------------*/

interface SubContentProps extends FlexProps<'div'> {}

const MenuSubContent = React.forwardRef<HTMLDivElement, SubContentProps>((props, ref) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent sideOffset={8} asChild>
        <Viewport
          ref={ref}
          direction="column"
          borderStyle="solid"
          borderWidth="1px"
          borderColor="neutral150"
          hasRadius
          background="neutral0"
          shadow="filterShadow"
          maxHeight="15rem"
          padding={1}
          alignItems="flex-start"
          overflow="auto"
          {...props}
        />
      </DropdownMenu.SubContent>
    </DropdownMenu.Portal>
  );
});

const Root = MenuRoot;
const Trigger = MenuTrigger;
const Content = MenuContent;
const Item = MenuItem;
const Label = MenuLabel;
const SubRoot = MenuSubRoot;
const SubTrigger = MenuSubTrigger;
const SubContent = MenuSubContent;

export { Root, Trigger, Content, Item, Label, SubRoot, SubTrigger, SubContent };
export type {
  TriggerProps,
  ContentProps,
  ItemProps,
  RootProps,
  SubRootProps,
  SubTriggerProps,
  SubContentProps,
  LabelProps,
};
