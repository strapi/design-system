import { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-components';

interface ImageProps extends ComponentPropsWithoutRef<'img'> {}

const Image = (props: ImageProps) => {
  return <Img {...props} />;
};

const Img = styled.img`
  width: 100%;
  margin-block-end: 1.6rem;
`;

export { Image };
export type { ImageProps };
