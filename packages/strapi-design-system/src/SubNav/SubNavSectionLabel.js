import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarretDown from '@strapi/icons/CarretDown';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';

const SubNavSectionLabelWrapper = styled(Flex)`
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
  if (collapsable) {
    return (
      <SubNavSectionLabelWrapper
        as="button"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        textAlign="left"
      >
        <Box paddingRight={1}>
          <Typography variant="sigma" textColor="neutral600">
            {label}
          </Typography>
        </Box>
        {collapsable && (
          <DropDownIconWrapper rotated={ariaExpanded}>
            <CarretDown aria-hidden />
          </DropDownIconWrapper>
        )}
      </SubNavSectionLabelWrapper>
    );
  }

  return (
    <SubNavSectionLabelWrapper>
      <Box paddingRight={1}>
        <Typography variant="sigma" textColor="neutral600">
          {label}
        </Typography>
      </Box>
    </SubNavSectionLabelWrapper>
  );
};

SubNavSectionLabel.defaultProps = {
  ariaControls: null,
  ariaExpanded: null,
  collapsable: false,
  onClick() {},
};
SubNavSectionLabel.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  collapsable: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
