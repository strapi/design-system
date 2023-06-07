import React from 'react';

import styled from 'styled-components';

import { SubNavSectionLabel } from './SubNavSectionLabel';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';

export interface SubNavSectionProps {
  badgeLabel: string;
  children: React.ReactNode;
  collapsable?: boolean;
  id: string;
  label: string;
}

const SubNavSectionWrapper = styled(Box)`
  svg {
    height: ${4 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;

export const SubNavSection = ({ collapsable = false, label, badgeLabel, children, id }: SubNavSectionProps) => {
  const [isOpen, setOpenLinks] = React.useState(true);
  const listId = useId(id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={1}>
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
          {React.Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </ol>
      )}
    </Flex>
  );
};
