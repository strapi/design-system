import React, { useRef, useState, Children, cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarretDown from '@strapi/icons/CarretDown';
import { Typography } from '../../Typography';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Button } from '../../Button';
import { BaseLink } from '../../BaseLink';
import { Popover, POPOVER_PLACEMENTS } from '../../Popover';
import { getOptionStyle } from './utils';
import { useId } from '../../helpers/useId';
import { KeyboardKeys } from '../../helpers/keyboardKeys';

const OptionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  ${getOptionStyle}
`;

const OptionLink = styled(BaseLink)`
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

const StyledButtonSmall = styled(Button)`
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[3]}`};
`;

export const MenuItem = ({ as, children, onClick, isFocused, isLink, ...props }) => {
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

  return isLink ? (
    <OptionLink as={as} {...menuItemProps}>
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
  );
};

MenuItem.defaultProps = {
  onClick: () => {},
  isFocused: false,
  isLink: false,
};

MenuItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
  isLink: PropTypes.bool,
  onClick: PropTypes.func,
};

export const SimpleMenu = ({
  label,
  children,
  id,
  as: asComp,
  onOpen = () => {},
  onClose = () => {},
  size,
  popoverPlacement,
  ...props
}) => {
  const menuButtonRef = useRef();
  const menuId = useId('simplemenu', id);
  const didMount = useRef(false);
  const [visible, setVisible] = useState(false);
  const [focusedItemIndex, setFocusItem] = useState(0);
  const childrenArray = Children.toArray(children);
  const DefaultComponent = size === 'S' ? StyledButtonSmall : Button;
  const Component = asComp || DefaultComponent;

  useEffect(() => {
    if (['string', 'number'].includes(typeof label)) {
      // Useful to focus the selected item in the list
      const defaultItemIndexToFocus = childrenArray.findIndex((c) => c.props.children === label);

      if (defaultItemIndexToFocus !== -1) {
        setFocusItem(defaultItemIndexToFocus);
      }
    }
  }, [label]);

  useEffect(() => {
    if (didMount?.current) {
      if (visible && typeof onOpen === 'function') {
        onOpen();
      } else if (typeof onClose === 'function') {
        onClose();
      }
    } else {
      didMount.current = true;
    }
  }, [didMount, visible]);

  /* in case `label` is a custom react component, we know it is going to be
      a child of the menu button.
  */
  useEffect(() => {
    if (React.isValidElement(label) && focusedItemIndex == -1) {
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

  const childrenClone = childrenArray.map((child, index) => (
    <Flex as="li" key={index} justifyContent="center" role="menuitem">
      {cloneElement(child, {
        onClick: () => {
          child.props.onClick();
          setVisible(false);
          menuButtonRef.current.focus();
        },
        isFocused: focusedItemIndex === index,
      })}
    </Flex>
  ));

  return (
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
        <Popover onBlur={handleBlur} placement={popoverPlacement} source={menuButtonRef} spacing={4}>
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

SimpleMenu.defaultProps = {
  popoverPlacement: 'bottom-start',
  size: 'M',
};

SimpleMenu.propTypes = {
  as: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  popoverPlacement: PropTypes.oneOf(POPOVER_PLACEMENTS),

  /**
   * Size of the trigger button.
   * Note: in case a custom component is passed through the "as"
   * prop, the size prop is passed along too, but needs to be handled there
   */

  size: PropTypes.oneOf(['S', 'M']),
};
