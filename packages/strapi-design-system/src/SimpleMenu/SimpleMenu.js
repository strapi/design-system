import React, { useRef, useState, Children, cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { TextButton, Text } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
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
const OptionLink = styled.a`
  text-decoration: none;
  ${getOptionStyle}
`;
const MenuButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  font-size: ${12 / 16}rem;
  svg {
    height: 4px;
  }
`;

export const MenuItem = ({ children, onClick, href, isFocused, ...props }) => {
  const menuItemRef = useRef();

  useEffect(() => {
    if (isFocused && menuItemRef.current) {
      menuItemRef.current.focus();
    }
  }, [isFocused]);

  const menuItemProps = {
    tabIndex: -1,
    ref: menuItemRef,
    role: 'menuItem',
    isFocused,
    ...props,
  };

  return (
    <Row as="li" justifyContent="center">
      {href ? (
        <OptionLink href={href} {...menuItemProps}>
          <Box padding={2}>
            <Text as="span">{children}</Text>
          </Box>
        </OptionLink>
      ) : (
        <OptionButton onClick={onClick} {...menuItemProps}>
          <Box padding={2}>
            <Text as="span">{children}</Text>
          </Box>
        </OptionButton>
      )}
    </Row>
  );
};
MenuItem.defaultProps = {
  onClick: () => {},
  href: undefined,
  isFocused: false,
};
MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  isFocused: PropTypes.bool,
  onClick: PropTypes.func,
};

export const SimpleMenu = ({ label, children, ...props }) => {
  const menuButtonRef = useRef();
  const menuId = useId('simpleMenu');
  const [visible, setVisible] = useState(false);
  const [focusedItemIndex, setFocusItem] = useState(0);
  const childrenArray = Children.toArray(children);

  const handleWrapperKeyDown = (e) => {
    if (visible) {
      if (e.key === KeyboardKeys.ESCAPE) {
        setVisible(false);
        setFocusItem(0);
      }
      if (e.key === KeyboardKeys.TAB) return;

      if (e.key === KeyboardKeys.DOWN && focusedItemIndex < childrenArray.length - 1) {
        setFocusItem((prev) => prev + 1);
      }

      if (e.key === KeyboardKeys.UP && focusedItemIndex > 0) {
        setFocusItem((prev) => prev - 1);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardKeys.ENTER) {
      setVisible((prevVisible) => !prevVisible);
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  const handleMenuButtonClick = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const childrenClone = childrenArray.map((child, index) =>
    cloneElement(child, {
      onClick: () => {
        setVisible(false);
        setFocusItem(0);
        child.props.onClick();
      },
      isFocused: focusedItemIndex === index,
    }),
  );

  return (
    <div onKeyDown={handleWrapperKeyDown}>
      <MenuButton
        aria-haspopup
        aria-expanded={visible}
        aria-controls={menuId}
        {...props}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMenuButtonClick}
        ref={menuButtonRef}
      >
        <Box paddingRight={1}>
          <TextButton>{label}</TextButton>
        </Box>
        <FilterDropdown aria-hidden />
      </MenuButton>
      {visible && (
        <Popover onBlur={handleBlur} source={menuButtonRef} spacingTop={1}>
          <Box role="menu" as="ul" padding={1}>
            {childrenClone}
          </Box>
        </Popover>
      )}
    </div>
  );
};

SimpleMenu.displayName = 'SimpleMenu';

const menuItemType = PropTypes.shape({ type: PropTypes.oneOf([MenuItem]) });
SimpleMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(menuItemType), menuItemType]).isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};
