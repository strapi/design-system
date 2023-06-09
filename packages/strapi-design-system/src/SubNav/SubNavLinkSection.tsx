import React from 'react';

import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { Typography } from '../Typography';

export interface SubNavLinkSectionProps {
  children: React.ReactNode;
  id: string;
  label: string;
}

const SubNavLinkSectionWrapper = styled(Box)`
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

const DropDownIconWrapper = styled.div<{ rotated?: boolean }>`
  display: flex;
  align-items: center;
  width: ${12 / 16}rem;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavLinkSection = ({ label, children, id }: SubNavLinkSectionProps) => {
  const [isOpen, setOpenLinks] = React.useState(true);
  const listId = useId(id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <Box>
      <SubNavLinkSectionWrapper paddingLeft={7} paddingTop={2} paddingBottom={2} paddingRight={4}>
        <Flex justifyContent="space-between">
          <SubNavLinkSectionButton onClick={handleClick} aria-expanded={isOpen} aria-controls={listId}>
            <DropDownIconWrapper rotated={isOpen}>
              <CarretDown aria-hidden />
            </DropDownIconWrapper>
            <Box paddingLeft={2}>
              <Typography as="span" fontWeight="semiBold" textColor="neutral800">
                {label}
              </Typography>
            </Box>
          </SubNavLinkSectionButton>
        </Flex>
      </SubNavLinkSectionWrapper>
      {isOpen && (
        <ul id={listId}>
          {React.Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </ul>
      )}
    </Box>
  );
};
