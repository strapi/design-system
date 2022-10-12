import React, { useState } from 'react';
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

export const CarouselImage = (props) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => setIsError(true);

  if (isError)
    return (
      <Tooltip description={props.alt ?? ''}>
        <ImageBase>
          <StyledImage as="img" {...props} onError={handleImageError} />
        </ImageBase>
      </Tooltip>
    );

  return <StyledImage as="img" {...props} onError={handleImageError} />;
};

CarouselImage.defaultProps = {
  src: undefined,
  alt: undefined,
};

CarouselImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};
