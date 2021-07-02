import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { TableLabel } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';

const SubNavSectionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
`;
const DropDownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavSectionLabel = ({ collapsable, label, onClick, ariaExpanded, ariaControls }) => {
  if (collapsable) {
    return (
      <SubNavSectionButton onClick={onClick} aria-expanded={ariaExpanded} aria-controls={ariaControls}>
        <Box paddingRight={1}>
          <TableLabel textColor="neutral500">{label}</TableLabel>
        </Box>
        {collapsable && (
          <DropDownIconWrapper rotated={ariaExpanded}>
            <FilterDropdown aria-hidden />
          </DropDownIconWrapper>
        )}
      </SubNavSectionButton>
    );
  }

  return (
    <Row>
      <Box paddingRight={1}>
        <TableLabel textColor="neutral500">{label}</TableLabel>
      </Box>
    </Row>
  );
};

SubNavSectionLabel.defaultProps = {
  ariaControls: null,
  ariaExpanded: null,
  collapsable: false,
  onClick: () => {},
};
SubNavSectionLabel.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  collapsable: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
