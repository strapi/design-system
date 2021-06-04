import React, { useRef, useState, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { TextButton, Text } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
import { Popover } from '../Popover';
import { getOptionStyle } from './utils';

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

export const MenuItem = ({ children, onClick, href, ...props }) => {
  if (href) {
    return (
      <Row as="li" justyfiContent="center">
        <OptionLink href={href} {...props}>
          <Box padding={2}>
            <Text>{children}</Text>
          </Box>
        </OptionLink>
      </Row>
    );
  }

  return (
    <Row as="li" justyfiContent="center">
      <OptionButton onClick={onClick} {...props}>
        <Box padding={2}>
          <Text>{children}</Text>
        </Box>
      </OptionButton>
    </Row>
  );
};
MenuItem.defaultProps = {
  onClick: () => {},
  href: undefined,
};
MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export const SimpleMenu = ({ label, children, ...props }) => {
  const menuButtonRef = useRef();
  const [visible, setVisible] = useState(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  const childrenClone = Children.toArray(children).map((child) =>
    cloneElement(child, {
      onClick: () => {
        setVisible(false);
        child.props.onClick();
      },
    }),
  );

  return (
    <div>
      <MenuButton {...props} onClick={() => setVisible((s) => !s)} ref={menuButtonRef}>
        <Box paddingRight={1}>
          <TextButton>{label}</TextButton>
        </Box>
        <FilterDropdown aria-hidden />
      </MenuButton>
      {visible && (
        <Popover tabindex="0" onBlur={handleBlur} source={menuButtonRef} spacingTop={1}>
          <Box as="ul" padding={1}>
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
