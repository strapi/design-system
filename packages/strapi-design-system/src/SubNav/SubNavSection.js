import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Badge } from '../Badge';
import { SubNavSectionLabel } from './SubNavSectionLabel';
import { useId } from '../helpers/useId';

const SubNavSectionWrapper = styled(Box)`
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
`;

export const SubNavSection = ({ collapsable, label, badgeLabel, children, id }) => {
  const [isOpen, setOpenLinks] = useState(true);
  const listId = useId('subnav-list', id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <Box>
      <SubNavSectionWrapper paddingLeft={6} paddingTop={2} paddingBottom={2} paddingRight={4}>
        <Flex justifyContent="space-between">
          <SubNavSectionLabel
            onClick={handleClick}
            ariaExpanded={isOpen}
            ariaControls={listId}
            collapsable={collapsable}
            label={label}
          />
          {badgeLabel && (
            <SubNavSectionBadge backgroundColor="neutral150" textColor="neutral600">
              {badgeLabel}
            </SubNavSectionBadge>
          )}
        </Flex>
      </SubNavSectionWrapper>
      {(!collapsable || isOpen) && (
        <ul id={listId}>
          {Children.map(children, (child, index) => {
            return <li key={index}>{child}</li>;
          })}
        </ul>
      )}
    </Box>
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
