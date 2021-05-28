import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text, TextButton } from '../Text';
import { Row } from '../Row';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';

const BrandIconWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;

  svg,
  img {
    height: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
    width: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
  }
`;

export const NavBrand = ({ workplace, title, icon }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
        <BrandIconWrapper aria-hidden condensed={true}>
          {icon}
        </BrandIconWrapper>

        <VisuallyHidden>
          <span>{title}</span>
          <span>{workplace}</span>
        </VisuallyHidden>
      </Box>
    );
  }

  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
      <Row>
        <BrandIconWrapper aria-hidden>{icon}</BrandIconWrapper>

        <Box paddingLeft={2}>
          <TextButton textColor="neutral800">{title}</TextButton>
          <Text small textColor="neutral600">
            {workplace}
          </Text>
        </Box>
      </Row>
    </Box>
  );
};

NavBrand.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  workplace: PropTypes.string.isRequired,
};
