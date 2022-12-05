import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Badge } from '../Badge';
import { SubNavSectionLabel } from './SubNavSectionLabel';
import { useId } from '../helpers/useId';
import { Stack } from '../Stack';

const SubNavSectionWrapper = styled(Box)`
  svg {
    height: ${4 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;

export const SubNavSection = ({ collapsable, label, badgeLabel, children, id }) => {
  const [isOpen, setOpenLinks] = useState(true);
  const listId = useId('subnav-list', id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <Stack spacing={1}>
      <SubNavSectionWrapper paddingLeft={6} paddingTop={1} paddingBottom={1} paddingRight={4}>
        <Box position="relative" paddingRight={badgeLabel ? 6 : 0}>
          <SubNavSectionLabel
            onClick={handleClick}
            ariaExpanded={isOpen}
            ariaControls={listId}
            collapsable={collapsable}
            label={label}
          />
          {badgeLabel && (
            <Badge
              backgroundColor="neutral150"
              textColor="neutral600"
              position="absolute"
              right={0}
              top="50%"
              transform="translateY(-50%)"
            >
              {badgeLabel}
            </Badge>
          )}
        </Box>
      </SubNavSectionWrapper>
      {(!collapsable || isOpen) && (
        <ol id={listId}>
          {Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </ol>
      )}
    </Stack>
  );
};

SubNavSection.defaultProps = {
  badgeLabel: null,
  children: undefined,
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
