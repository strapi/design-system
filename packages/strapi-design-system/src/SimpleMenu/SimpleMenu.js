import React, { useRef, useState, Children, cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarretDown from '@strapi/icons/CarretDown';
import { NavLink } from 'react-router-dom';
import { Typography } from '../Text';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { getOptionStyle } from './utils';
import { useId } from '../helpers/useId';
import { KeyboardKeys } from '../helpers/keyboardKeys';

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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  svg {
    height: 4px;
    width: 6px;
  }
`;

export const MenuItem = ({ children, onClick, to, isFocused, ...props }) => {
  const menuItemRef = useRef();

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

  return (
    <Flex as="li" justifyContent="center" role="menuitem">
      {to ? (
        <OptionLink to={to} {...menuItemProps}>
          <Box padding={2}>
            <Typography>{children}</Typography>
          </Box>
        </OptionLink>
      ) : (
        <OptionButton onKeyDown={handleKeyDown} onMouseDown={onClick} type="button" {...menuItemProps}>
          <Box padding={2}>
            <Typography>{children}</Typography>
          </Box>
        </OptionButton>
      )}
    </Flex>
  );
};

MenuItem.defaultProps = {
  onClick: () => {},
  to: undefined,
  isFocused: false,
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

export const SimpleMenu = ({ label, children, id, as: asComp, ...props }) => {
  const menuButtonRef = useRef();
  const menuId = useId('simplemenu', id);
  const [visible, setVisible] = useState(false);
  const [focusedItemIndex, setFocusItem] = useState(0);
  const childrenArray = Children.toArray(children);
  const Component = asComp || Button;

  useEffect(() => {
    // Useful to focus the selected item in the list
    const defaultItemIndexToFocus = childrenArray.findIndex((c) => c.props.children === label);
    if (defaultItemIndexToFocus !== -1) {
      setFocusItem(defaultItemIndexToFocus);
    }
  }, [label]);

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
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  const handleMenuButtonMouseDown = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const childrenClone = childrenArray.map((child, index) =>
    cloneElement(child, {
      onClick: () => {
        child.props.onClick();
        setVisible(false);
        menuButtonRef.current.focus();
      },
      isFocused: focusedItemIndex === index,
    }),
  );

  return (
    <div onKeyDown={handleWrapperKeyDown}>
      <Component
        label={label}
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
        <Popover onBlur={handleBlur} source={menuButtonRef} spacing={4}>
          <Box role="menu" as="ul" padding={1} id={menuId}>
            {childrenClone}
          </Box>
        </Popover>
      )}
    </div>
  );
};

SimpleMenu.defaultProps = {
  as: undefined,
};

SimpleMenu.displayName = 'SimpleMenu';

const menuItemType = PropTypes.shape({ type: PropTypes.oneOf([MenuItem]) });

SimpleMenu.propTypes = {
  as: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(menuItemType), menuItemType]).isRequired,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
