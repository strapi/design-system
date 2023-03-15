import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CarretDown } from '@strapi/icons';
import styled, { css, DefaultTheme } from 'styled-components';

import { BaseLink } from '../../BaseLink';
import { Box, BoxProps } from '../../Box';
import { Button, ButtonProps } from '../../Button';
import { Flex, FlexProps } from '../../Flex';
import { extractStyleFromTheme } from '../../helpers/theme';
import { POPOVER_PLACEMENTS } from '../../Popover';
import { Typography } from '../../Typography';
import { Link, LinkProps } from '../Link';

/* -------------------------------------------------------------------------------------------------
 * MenuRoot
 * -----------------------------------------------------------------------------------------------*/

interface RootProps extends DropdownMenu.DropdownMenuProps {}

const MenuRoot = DropdownMenu.Root;

/* -------------------------------------------------------------------------------------------------
 * MenuTrigger
 * -----------------------------------------------------------------------------------------------*/

interface TriggerProps extends ButtonProps {}

const MenuTrigger = forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
  return (
    <DropdownMenu.Trigger asChild>
      <TriggerButton
        ref={ref}
        type="button"
        variant="ghost"
        endIcon={
          <IconWrapper>
            <CarretDown aria-hidden />
          </IconWrapper>
        }
        {...props}
        $size={props.size}
      />
    </DropdownMenu.Trigger>
  );
});

const TriggerButton = styled(Button)<{ $size: ButtonProps['size'] }>`
  padding: ${({ theme, $size }) => ($size === 'S' ? `${theme.spaces[1]} ${theme.spaces[3]}` : undefined)};
`;

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

interface ContentProps extends FlexProps<HTMLDivElement> {
  intersectionId?: string;
  popoverPlacement?: (typeof POPOVER_PLACEMENTS)[number];
}

const MenuContent = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, intersectionId, popoverPlacement = 'bottom-start', ...props }, ref) => {
    const [side, align] = popoverPlacement.split('-') as [
      DropdownMenu.DropdownMenuContentProps['side'],
      DropdownMenu.DropdownMenuContentProps['align'],
    ];

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={align} side={side} loop asChild>
          <Flex
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
            {...props}
          >
            {children}
            <Box id={intersectionId} width="100%" height="1px" />
          </Flex>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    );
  },
);

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
  isLink: false;
  isExternal: true;
}

type ItemInternalLinkProps<TComponent extends React.ComponentType = typeof BaseLink> = ItemSharedProps &
  ComponentPropsWithoutRef<TComponent> & {
    as?: TComponent;
    isLink: true;
    isExternal: false;
  };

interface ItemButtonProps extends ItemSharedProps, Omit<BoxProps<HTMLButtonElement>, 'onSelect'> {
  as?: never;
  isLink: false;
  isExternal: false;
}

type ItemProps<TComponent extends React.ComponentType = typeof BaseLink> =
  | ItemButtonProps
  | ItemInternalLinkProps<TComponent>
  | ItemExternalLinkProps;

const MenuItem = ({ onSelect, disabled, ...props }: ItemProps) => {
  if (props.isLink) {
    return (
      <DropdownMenu.Item asChild onSelect={onSelect} disabled={disabled}>
        <OptionLink color="neutral800" {...props} isExternal={false}>
          <Typography>{props.children}</Typography>
        </OptionLink>
      </DropdownMenu.Item>
    );
  }

  if (props.isExternal) {
    return (
      <DropdownMenu.Item asChild onSelect={onSelect} disabled={disabled}>
        <OptionLink color="neutral800" {...props}>
          <Typography>{props.children}</Typography>
        </OptionLink>
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Item asChild onSelect={onSelect} disabled={disabled}>
      <OptionButton color="neutral800" as="button" type="button" {...props}>
        <Typography>{props.children}</Typography>
      </OptionButton>
    </DropdownMenu.Item>
  );
};

const getOptionStyle = ({ theme }: { theme: DefaultTheme }) => css`
  text-align: left;
  width: 100%;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spaces[2]} ${theme.spaces[4]};

  ${Typography} {
    color: inherit;
  }

  &[aria-disabled] {
    cursor: not-allowed;

    ${Typography} {
      color: ${theme.colors.neutral500};
    }
  }

  &:focus-visible {
    outline: none;
    background-color: ${theme.colors.primary100};

    &:after {
      content: none;
    }
  }
`;

const OptionButton = styled(Box)`
  border: none;
  background: transparent;

  ${getOptionStyle}
`;

const OptionLink = styled(Link)`
  /* We include this here again because typically when people use OptionLink they provide an as prop which cancels the Box props */
  color: ${({ theme, color }) => extractStyleFromTheme(theme.colors, color, undefined)};
  text-decoration: none;

  &:hover {
    color: unset;
  }

  svg > path,
  &:focus-visible svg > path {
    fill: currentColor;
  }

  ${getOptionStyle}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    height: 4px;
    width: 6px;
  }
`;

const Root = MenuRoot;
const Trigger = MenuTrigger;
const Content = MenuContent;
const Item = MenuItem;

export { Root, Trigger, Content, Item };
export type { TriggerProps, ContentProps, ItemProps, RootProps };
