import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterDropdown from '@strapi/icons/FilterDropdown';
import { TableLabel } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const SubNavSectionLabelWrapper = styled(Row)`
  border: none;
  padding: 0;
  background: transparent;
`;
const DropDownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavSectionLabel = ({ collapsable, label, onClick, ariaExpanded, ariaControls }) => {
  const handleKeyDown = (e) => {
    if ([KeyboardKeys.ENTER, KeyboardKeys.SPACE].includes(e.key)) {
      e.preventDefault();
      onClick();
    }
  };

  if (collapsable) {
    return (
      <SubNavSectionLabelWrapper
        tabIndex="0"
        role="button"
        aria-pressed={true}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        <Box paddingRight={1}>
          <TableLabel textColor="neutral600">{label}</TableLabel>
        </Box>
        {collapsable && (
          <DropDownIconWrapper rotated={ariaExpanded}>
            <FilterDropdown aria-hidden />
          </DropDownIconWrapper>
        )}
      </SubNavSectionLabelWrapper>
    );
  }

  return (
    <SubNavSectionLabelWrapper>
      <Box paddingRight={1}>
        <TableLabel textColor="neutral600">{label}</TableLabel>
      </Box>
    </SubNavSectionLabelWrapper>
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
