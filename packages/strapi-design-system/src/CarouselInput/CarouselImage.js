import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';
import { Tooltip } from '../Tooltip';

// ImageBase is needed since tooltip requires box level element to work upon
// Also img component can not be directly worked with tooltip otherwise it will span the whole window
const ImageBase = styled.div`
  display: grid;
`;

export const CarouselImage = (props) => (
  <Tooltip description={props.alt ?? ''}>
    <ImageBase>
      <Box as="img" {...props} />
    </ImageBase>
  </Tooltip>
);

CarouselImage.defaultProps = {
  src: undefined,
  alt: undefined,
};

CarouselImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
