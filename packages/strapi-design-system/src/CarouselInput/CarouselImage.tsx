import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { ellipsis } from '../styles/type';
import { Tooltip } from '../Tooltip';

export interface CarouselImageProps extends BoxProps<'img'> {
  alt: string;
  src: string;
}

const StyledImage = styled(Box)`
  ${ellipsis}
`;

export const CarouselImage = (props: CarouselImageProps) => {
  const [isError, setIsError] = React.useState(false);

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
