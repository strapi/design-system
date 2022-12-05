import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Tooltip } from '../Tooltip';
import { ellipsisStyle } from '../Typography/utils';

const StyledImage = styled(Box)`
  height: 100%;
  ${ellipsisStyle({ ellipsis: true })}
`;

export const CarouselImage = (props) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <Tooltip description={props.alt ?? ''}>
        <StyledImage as="img" {...props} />
      </Tooltip>
    );
  }

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
