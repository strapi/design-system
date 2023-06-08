import { useState } from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Tooltip } from '../Tooltip';
import { ellipsisStyle } from '../Typography/utils';

export interface CarouselImageProps extends BoxProps<'img'> {
  alt: string;
  src: string;
}

const StyledImage = styled(Box)`
  ${ellipsisStyle({ ellipsis: true })}
`;

export const CarouselImage = (props: CarouselImageProps) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <Tooltip description={props.alt ?? ''}>
        <StyledImage as="img" height="100%" maxWidth="100%" {...props} />
      </Tooltip>
    );
  }

  return <StyledImage as="img" height="100%" maxWidth="100%" {...props} onError={handleImageError} />;
};
