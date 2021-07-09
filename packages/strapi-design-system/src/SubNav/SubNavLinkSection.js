import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import { useId } from '../helpers/useId';

const SubNavLinkSectionWrapper = styled(Box)`
  max-height: ${32 / 16}rem;
  svg {
    height: ${4 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral700};
    }
  }
`;
const SubNavLinkSectionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
`;
const DropDownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${12 / 16}rem;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavLinkSection = ({ label, children }) => {
  const [isOpen, setOpenLinks] = useState(true);
  const listId = useId('list');

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <li>
      <SubNavLinkSectionWrapper paddingLeft={7} paddingTop={2} paddingBottom={2} paddingRight={4}>
        <Row justifyContent="space-between">
          <SubNavLinkSectionButton onClick={handleClick} aria-expanded={isOpen} aria-controls={listId}>
            <DropDownIconWrapper rotated={isOpen}>
              <FilterDropdown aria-hidden />
            </DropDownIconWrapper>
            <Box paddingLeft={2}>
              <Text as="span" highlighted textColor="neutral800">
                {label}
              </Text>
            </Box>
          </SubNavLinkSectionButton>
        </Row>
      </SubNavLinkSectionWrapper>
      {isOpen && <ul id={listId}>{children}</ul>}
    </li>
  );
};

SubNavLinkSection.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};
