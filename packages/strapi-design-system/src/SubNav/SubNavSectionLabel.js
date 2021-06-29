import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { TableLabel } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
import { Button } from '../Button';

const SubNavSectionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
`;

export const SubNavSectionLabel = ({ collapsable, label, onClick, ariaExpanded, ariaControls }) => {
  if (collapsable) {
    return (
      <SubNavSectionButton onClick={onClick} aria-expanded={ariaExpanded} aria-controls={ariaControls}>
        <Box paddingRight={1}>
          <TableLabel textColor="neutral500">{label}</TableLabel>
        </Box>
        {collapsable && <FilterDropdown aria-hidden />}
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
