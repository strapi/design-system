import * as React from 'react';

import { styled } from 'styled-components';

import { ellipsis } from '../../styles/type';
import { Box, BoxComponent, BoxProps } from '../Box';
import { Tooltip } from '../Tooltip';

export interface CarouselImageProps extends BoxProps<'img'> {
  alt: string;
  src: string;
}

const StyledImage = styled<BoxComponent<'img'>>(Box)`
  ${ellipsis}
`;

export const CarouselImage = (props: CarouselImageProps) => {
  const [isError, setIsError] = React.useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <Tooltip label={props.alt ?? ''}>
        <StyledImage tag="img" height="100%" maxWidth="100%" {...props} />
      </Tooltip>
    );
  }

  return <StyledImage tag="img" height="100%" maxWidth="100%" {...props} onError={handleImageError} />;
};
