import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarretDown from '@strapi/icons/CarretDown';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { useId } from '../helpers/useId';

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
const DropDownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${12 / 16}rem;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavLinkSection = ({ label, children, id }) => {
  const [isOpen, setOpenLinks] = useState(true);
  const listId = useId('subnav-list', id);

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
          {Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </ul>
      )}
    </Box>
  );
};

SubNavLinkSection.defaultProps = {
  children: undefined,
  id: undefined,
};

SubNavLinkSection.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};
