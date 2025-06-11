import * as React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDown, ChevronRight } from '@strapi/icons';
import { styled, css, type DefaultTheme } from 'styled-components';

import { extractStyleFromTheme } from '../../helpers/theme';
import { Box, BoxProps } from '../../primitives/Box';
import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography, TypographyComponent, TypographyProps } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';
import { BaseLink } from '../BaseLink';
import { Button, ButtonProps } from '../Button';
import { IconButton } from '../IconButton';
import { Link, LinkProps } from '../Link';

import { getIconColor, getTextColor, getBackgroundColorHover } from './utils';

/* -------------------------------------------------------------------------------------------------
 * MenuRoot
 * -----------------------------------------------------------------------------------------------*/

interface RootProps extends DropdownMenu.DropdownMenuProps {}

const MenuRoot = DropdownMenu.Root;

/* -------------------------------------------------------------------------------------------------
 * MenuTrigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerPropsBase = Omit<ButtonProps, 'tag'> & {
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
  ({ label, endIcon = <CaretDown width="1.2rem" height="1.2rem" aria-hidden />, tag = Button, icon, ...rest }, ref) => {
    const props: ButtonProps = {
      ...rest,
      ref,
      type: 'button',
    };

    return (
      <DropdownMenu.Trigger asChild disabled={props.disabled}>
        {tag === IconButton ? (
          <IconButton label={label as string} variant="tertiary" {...props}>
            {icon}
          </IconButton>
        ) : (
          <Button endIcon={endIcon} variant="ghost" {...props} />
        )}
      </DropdownMenu.Trigger>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

type ContentProps = FlexProps<'div'> &
  Pick<DropdownMenu.DropdownMenuContentProps, 'onCloseAutoFocus'> & {
    intersectionId?: string;
    popoverPlacement?: `${NonNullable<DropdownMenu.DropdownMenuContentProps['side']>}-${NonNullable<DropdownMenu.DropdownMenuContentProps['align']>}`;
  };

const MenuContent = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, intersectionId, onCloseAutoFocus, popoverPlacement = 'bottom-start', ...props }, ref) => {
    const [side, align] = popoverPlacement.split('-') as [
      DropdownMenu.DropdownMenuContentProps['side'],
      DropdownMenu.DropdownMenuContentProps['align'],
    ];

    return (
      <DropdownMenu.Portal>
        <DropdownMenuContent align={align} side={side} loop onCloseAutoFocus={onCloseAutoFocus} asChild>
          <Viewport
            ref={ref}
            direction="column"
            borderColor="neutral150"
            hasRadius
            background="neutral0"
            shadow="filterShadow"
            maxHeight="15rem"
            padding={1}
            marginTop={1}
            marginBottom={1}
            alignItems="flex-start"
            position="relative"
            overflow="auto"
            {...props}
          >
            {children}
            <Box id={intersectionId} width="100%" height="1px" />
          </Viewport>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    );
  },
);

const Viewport = styled<FlexComponent>(Flex)`
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  z-index: ${(props) => props.theme.zIndices.popover};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: ${(props) => props.theme.motion.timings['200']};

    &[data-state='open'] {
      animation-timing-function: ${(props) => props.theme.motion.easings.authenticMotion};

      &[data-side='top'] {
        animation-name: ${ANIMATIONS.slideUpIn};
      }

      &[data-side='bottom'] {
        animation-name: ${ANIMATIONS.slideDownIn};
      }
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/
export type ItemVariant = 'danger' | 'default';

interface ItemSharedProps extends Pick<DropdownMenu.MenuItemProps, 'disabled' | 'onSelect'> {
  children?: React.ReactNode;
  isExternal?: boolean;
  isFocused?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ItemVariant;
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

const MenuItem = ({
  onSelect,
  disabled = false,
  isLink,
  startIcon,
  endIcon,
  isExternal,
  variant = 'default',
  ...props
}: ItemProps) => {
  return (
    <DropdownMenu.Item asChild onSelect={onSelect} disabled={disabled}>
      {isLink || isExternal ? (
        <OptionLink
          color={getTextColor(variant, disabled)}
          startIcon={startIcon}
          endIcon={endIcon}
          {...props}
          isExternal={isExternal ?? false}
          $variant={variant}
        >
          {props.children}
        </OptionLink>
      ) : (
        <OptionButton
          cursor="pointer"
          color={getTextColor(variant, disabled)}
          background="transparent"
          borderStyle="none"
          gap={2}
          $variant={variant}
          {...props}
        >
          {startIcon && (
            <Flex tag="span" color={getIconColor(variant, disabled)} aria-hidden>
              {startIcon}
            </Flex>
          )}

          <Typography grow={1}>{props.children}</Typography>

          {endIcon && (
            <Flex tag="span" color={getIconColor(variant, disabled)} aria-hidden>
              {endIcon}
            </Flex>
          )}
        </OptionButton>
      )}
    </DropdownMenu.Item>
  );
};

const getOptionStyle = ({ theme, $variant }: { theme: DefaultTheme; $variant: ItemVariant }) => css`
  text-align: left;
  width: 100%;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spaces[2]} ${theme.spaces[4]};

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  &[data-highlighted] {
    background-color: ${theme.colors[getBackgroundColorHover($variant)]};
  }

  &:focus-visible {
    outline: none;

    &:after {
      content: none;
    }
  }
`;

const OptionButton = styled<FlexComponent<'button' | 'a'>>(Flex)<{ $variant: ItemVariant }>`
  ${({ theme, $variant }) => getOptionStyle({ theme, $variant })}
`;

const OptionLink = styled(Link)<{ $variant: ItemVariant }>`
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

  ${({ theme, $variant }) => getOptionStyle({ theme, $variant })}
`;

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator
 * -----------------------------------------------------------------------------------------------*/

interface SeparatorProps extends DropdownMenu.DropdownMenuSeparatorProps {}

const StyledSeparator = styled(Box)`
  /* Negative horizontal margin to compensate Menu.Content's padding */
  margin: ${({ theme }) => theme.spaces[1]} -${({ theme }) => theme.spaces[1]};
  width: calc(100% + ${({ theme }) => theme.spaces[2]});
  /* Hide separator if there's nothing above in the menu */
  &:first-child {
    display: none;
  }
`;

const MenuSeparator = React.forwardRef<HTMLDivElement, SeparatorProps>((props: SeparatorProps, ref) => (
  <DropdownMenu.Separator {...props} asChild>
    <StyledSeparator height="1px" shrink={0} background="neutral150" ref={ref} />
  </DropdownMenu.Separator>
));

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
const Separator = MenuSeparator;
const Label = MenuLabel;
const SubRoot = MenuSubRoot;
const SubTrigger = MenuSubTrigger;
const SubContent = MenuSubContent;

export { Root, Trigger, Content, Item, Separator, Label, SubRoot, SubTrigger, SubContent };
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
