import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import styled from 'styled-components';
import { Tooltip } from '../Tooltip';
import { ellipsisStyle, handleColor } from '../Typography/utils';

// ImageBase is needed since tooltip requires box level element to work upon
// Also img component can not be directly worked with tooltip otherwise it will span the whole window
const ImageBase = styled(Box)`
  display: grid;
`;

const StyledImage = styled(Box)`
  ${({ theme, color }) => `
  width: stretch;
  ${ellipsisStyle({ ellipsis: true })}
  color: ${handleColor({ theme, textColor: color })};
  `};
`;

export const CarouselImage = (props) => (
  <Tooltip description={props.alt ?? ''}>
    <ImageBase>
      <StyledImage as="img" {...props} />
    </ImageBase>
  </Tooltip>
);

CarouselImage.defaultProps = {
  src: undefined,
  alt: undefined,
};

CarouselImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};
