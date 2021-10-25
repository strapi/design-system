import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import styled from 'styled-components';

const CarouselSlideWrapper = styled(Flex)`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
`;

export const CarouselSlide = ({ label, children, selected, ...props }) => (
  <CarouselSlideWrapper
    selected={selected}
    role="group"
    aria-roledescription="slide"
    aria-label={label}
    justifyContent="center"
    height="124px"
    {...props}
  >
    {children}
  </CarouselSlideWrapper>
);

CarouselSlide.defaultProps = {
  selected: false,
};

CarouselSlide.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
