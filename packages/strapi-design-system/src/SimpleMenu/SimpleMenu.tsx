import React, { useRef, useState, Children, cloneElement, useEffect } from 'react';

import { Placement } from '@floating-ui/react-dom';
import { CarretDown } from '@strapi/icons';
import { useCallbackRef } from '@strapi/ui-primitives';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { getOptionStyle } from './utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useId } from '../hooks/useId';
import { Link } from '../Link';
import { Popover } from '../Popover';
import { Typography } from '../Typography';

const OptionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  ${getOptionStyle}
`;

const OptionLink = styled(NavLink)`
  text-decoration: none;
  ${getOptionStyle}
`;

const OptionExternalLink = styled(Link)`
  /* Removing Link hover effect */
  &:hover {
    color: currentColor;
  }

  &:focus-visible {
    /* Removing Link focus-visible after properties and reset to global outline */
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
    &:after {
      content: none;
    }
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

const StyledButtonSmall = styled(Button)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[3]}`};
`;

export interface MenuItemProps extends Omit<NavLinkProps, 'to'> {
  as?: React.ElementType;
  children: React.ReactNode;
  href?: string;
  isFocused?: boolean;
  onClick?: () => void;
  to?: string;
  isExternal?: boolean; // todo find out where this is used
}

export const MenuItem = ({ children, onClick = () => {}, to, isFocused = false, href, ...props }: MenuItemProps) => {
  const menuItemRef = useRef<HTMLAnchorElement>();

  useEffect(() => {
    if (isFocused && menuItemRef.current) {
      menuItemRef.current.focus();
    }
  }, [isFocused]);

  const menuItemProps = {
    tabIndex: isFocused ? 0 : -1,
    ref: menuItemRef,
    role: 'menuitem',
    ...props,
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardKeys.SPACE || e.key === KeyboardKeys.ENTER) {
      onClick();
    }
  };

  if (to && !href) {
    return (
      <OptionLink to={to} {...menuItemProps}>
        <Box padding={2}>
          <Typography>{children}</Typography>
        </Box>
      </OptionLink>
    );
  }

  if (href && !to) {
    return (
      <OptionExternalLink isExternal href={href} {...menuItemProps}>
        <Box padding={2}>
          <Typography>{children}</Typography>
        </Box>
      </OptionExternalLink>
    );
  }

  return (
    <OptionButton onKeyDown={handleKeyDown} onMouseDown={onClick} type="button" {...menuItemProps}>
      <Box padding={2}>
        <Typography>{children}</Typography>
      </Box>
    </OptionButton>
  );
};

export type SimpleMenuProps<As extends React.ElementType = React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<As>,
  'as' | 'children' | 'id' | 'label' | 'onClose' | 'onOpen' | 'onReachEnd' | 'popoverPlacement' | 'size'
> & {
  as?: As;
  children: React.ReactNode;
  id?: string;
  label: React.ReactElement | string | number;
  onClose?: () => void;
  onOpen?: () => void;
  /**
   * Callback function to be called when the popover reaches the end of the scrollable content
   */
  onReachEnd?: () => void;
  popoverPlacement?: Placement;
  /**
   * Size of the trigger button.
   * Note: in case a custom component is passed through the "as"
   * prop, the size prop is passed along too, but needs to be handled there
   */
  size?: 'S' | 'M';
};

export const SimpleMenu = <As extends React.ElementType = typeof Button>({
  label,
  children,
  id,
  as: asComp,
  onOpen = () => {},
  onClose = () => {},
  size = 'M',
  popoverPlacement = 'bottom-start',
  onReachEnd,
  ...props
}: SimpleMenuProps<As>) => {
  const menuButtonRef: React.ComponentProps<As>['ref'] = useRef(undefined!);
  const menuId = useId(id);
  const didMount = useRef(false);
  const [visible, setVisible] = useState(false);
  const [focusedItemIndex, setFocusItem] = useState(0);
  const childrenArray = Children.toArray(children);
  const DefaultComponent = size === 'S' ? StyledButtonSmall : Button;
  const Component = asComp || DefaultComponent;
  const shouldHandleReachEnd = !!onReachEnd && typeof onReachEnd === 'function';

  useEffect(() => {
    if (['string', 'number'].includes(typeof label)) {
      // Useful to focus the selected item in the list
      const defaultItemIndexToFocus = childrenArray.findIndex(
        (c) => (React.isValidElement(c) && c.props.children === label) || c === label,
      );

      if (defaultItemIndexToFocus !== -1) {
        setFocusItem(defaultItemIndexToFocus);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  const handleOpen = useCallbackRef(onOpen);
  const handleClose = useCallbackRef(onClose);

  useEffect(() => {
    if (didMount?.current) {
      if (visible) {
        handleOpen();
      } else {
        handleClose();
      }
    } else {
      didMount.current = true;
    }
  }, [didMount, handleClose, handleOpen, visible]);

  /* in case `label` is a custom react component, we know it is going to be
      a child of the menu button.
  */
  useEffect(() => {
    if (React.isValidElement(label) && focusedItemIndex === -1) {
      menuButtonRef.current.focus();
    }
  }, [label, focusedItemIndex]);

  const handleWrapperKeyDown = (e) => {
    if (visible) {
      if (e.key === KeyboardKeys.ESCAPE) {
        e.stopPropagation();
        setVisible(false);
        menuButtonRef.current.focus();
      }

      if (e.key === KeyboardKeys.DOWN) {
        setFocusItem((prev) => (prev === childrenArray.length - 1 ? 0 : prev + 1));
      }

      if (e.key === KeyboardKeys.UP) {
        setFocusItem((prev) => (prev === 0 ? childrenArray.length - 1 : prev - 1));
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardKeys.ENTER || e.key === KeyboardKeys.SPACE) {
      setVisible((prevVisible) => !prevVisible);
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  const handleMenuButtonMouseDown = (e) => {
    e.preventDefault();
    setVisible((prevVisible) => !prevVisible);
  };

  const handleReachEnd = () => {
    if (shouldHandleReachEnd) {
      onReachEnd();
    }
  };

  const childrenClone = childrenArray.map((child, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Flex as="li" key={index} justifyContent="center" role="menuitem">
      {React.isValidElement(child)
        ? cloneElement<any>(child, {
            onClick() {
              child.props.onClick();
              setVisible(false);
              menuButtonRef.current.focus();
            },
            isFocused: focusedItemIndex === index,
          })
        : child}
    </Flex>
  ));

  return (
    // TODO: review why we need to eslint it and how to solve this issue.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={handleWrapperKeyDown}>
      <Component
        label={React.isValidElement(label) ? null : label}
        aria-haspopup
        aria-expanded={visible}
        aria-controls={menuId}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMenuButtonMouseDown}
        ref={menuButtonRef}
        type="button"
        variant="ghost"
        endIcon={
          <IconWrapper>
            <CarretDown aria-hidden />
          </IconWrapper>
        }
        {...props}
      >
        {label}
      </Component>
      {visible && (
        <Popover
          onBlur={handleBlur}
          placement={popoverPlacement}
          source={menuButtonRef}
          onReachEnd={handleReachEnd}
          intersectionId={shouldHandleReachEnd ? `popover-${menuId}` : undefined}
          spacing={4}
        >
          <Box role="menu" as="ul" padding={1} id={menuId}>
            {childrenClone}
          </Box>
        </Popover>
      )}
    </div>
  );
};
