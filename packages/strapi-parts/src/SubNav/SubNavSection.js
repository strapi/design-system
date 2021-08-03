import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';
import { Badge } from '../Badge';
import { SubNavSectionLabel } from './SubNavSectionLabel';
import { useId } from '../helpers/useId';

const SubNavSectionWrapper = styled(Box)`
  max-height: ${32 / 16}rem;
  svg {
    height: ${4 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const SubNavSectionBadge = styled(Badge)`
  display: flex;
  align-items: center;
  height: ${20 / 16}rem;
  width: ${16 / 16}rem;
`;

export const SubNavSection = ({ collapsable, label, badgeLabel, children, id }) => {
  const [isOpen, setOpenLinks] = useState(true);
  const listId = useId('subnav-list', id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <li>
      <SubNavSectionWrapper paddingLeft={6} paddingTop={2} paddingBottom={2} paddingRight={4}>
        <Row justifyContent="space-between">
          <SubNavSectionLabel
            onClick={handleClick}
            ariaExpanded={isOpen}
            ariaControls={listId}
            collapsable={collapsable}
            label={label}
          />
          {badgeLabel && <SubNavSectionBadge backgroundColor="neutral150">{badgeLabel}</SubNavSectionBadge>}
        </Row>
      </SubNavSectionWrapper>
      {(!collapsable || isOpen) && <ul id={listId}>{children}</ul>}
    </li>
  );
};

SubNavSection.defaultProps = {
  badgeLabel: null,
  collapsable: false,
  id: undefined,
};

SubNavSection.propTypes = {
  badgeLabel: PropTypes.string,
  children: PropTypes.node,
  collapsable: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};
