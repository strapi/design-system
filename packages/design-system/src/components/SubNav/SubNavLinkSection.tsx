import * as React from 'react';

import { CaretDown } from '@strapi/icons';
import { styled } from 'styled-components';

import { useId } from '../../hooks/useId';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

const SubNavLinkSectionButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
`;
export interface SubNavLinkSectionProps {
  children: React.ReactNode;
  id?: string;
  label: string;
}

export const SubNavLinkSection = ({ label, children, id }: SubNavLinkSectionProps) => {
  const [isOpen, setOpenLinks] = React.useState(true);
  const listId = useId(id);

  const handleClick = () => {
    setOpenLinks((prev) => !prev);
  };

  return (
    <Box>
      <Box paddingLeft={7} paddingTop={2} paddingBottom={2} paddingRight={4}>
        <Flex justifyContent="space-between">
          <SubNavLinkSectionButton onClick={handleClick} aria-expanded={isOpen} aria-controls={listId}>
            <CaretDown
              width="1.2rem"
              height="1.2rem"
              aria-hidden
              fill="neutral700"
              style={{ transform: `rotateX(${isOpen ? '0deg' : '180deg'})` }}
            />
            <Box paddingLeft={2}>
              <Typography tag="span" fontWeight="semiBold" textColor="neutral800">
                {label}
              </Typography>
            </Box>
          </SubNavLinkSectionButton>
        </Flex>
      </Box>
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
