import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { Text } from '../Text';
import { Row } from '../Row';
import { Box } from '../Box';
import { Popover } from '../Popover';

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

export const SimpleMenu = () => {
  const menuRef = useRef();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <MenuButton onClick={() => setVisible((s) => !s)} ref={menuRef}>
        <Box paddingRight={1}>
          <Text>January</Text>
        </Box>
        <FilterDropdown />
      </MenuButton>
      {visible && (
        <Popover source={menuRef} spacingTop={1}>
          <ul>
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <Box key={index} padding={2}>
                  Element {index}
                </Box>
              ))}
          </ul>
        </Popover>
      )}
    </div>
  );
};

SimpleMenu.displayName = 'SimpleMenu';

SimpleMenu.propTypes = {};
