import { ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

interface ImageProps extends ComponentPropsWithoutRef<'img'> {}

const Image = (props: ImageProps) => {
  return <Img {...props} />;
};

const Img = styled.img`
  width: 100%;
`;

export { Image };
export type { ImageProps };
