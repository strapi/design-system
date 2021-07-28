import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '../Row';
import styled from 'styled-components';

const CarouselSlideWrapper = styled(Row)`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
`;

export const CarouselSlide = ({ label, children, selected }) => {
  return (
    <CarouselSlideWrapper
      selected={selected}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      justifyContent="center"
    >
      {children}
    </CarouselSlideWrapper>
  );
};

CarouselSlide.defaultProps = {
  selected: false,
};

CarouselSlide.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
