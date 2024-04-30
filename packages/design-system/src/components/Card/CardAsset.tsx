import * as React from 'react';

import { styled } from 'styled-components';

type CardAssetSizes = 'S' | 'M';

interface CardAssetProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * @default 'M'
   */
  size?: CardAssetSizes;
  children?: React.ReactNode;
}

const CardAsset = ({ size = 'M', children, ...props }: CardAssetProps) => {
  return (
    <CardAssetWrapper $size={size}>{children ? children : <CardAssetImg {...props} aria-hidden />}</CardAssetWrapper>
  );
};

const CardAssetImg = styled.img`
  // inline flows is based on typography and displays an extra white space below the image
  // switch to block is required in order to make the img stick the bottom of the container
  // addition infos: https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image
  margin: 0;
  padding: 0;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const CardAssetWrapper = styled.div<{ $size: CardAssetSizes }>`
  display: flex;
  justify-content: center;
  height: ${({ $size }) => ($size === 'S' ? '8.8rem' : '16.4rem')};
  width: 100%;
  background: repeating-conic-gradient(${({ theme }) => theme.colors.neutral100} 0% 25%, transparent 0% 50%) 50% / 20px
    20px;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

export { CardAsset };
export type { CardAssetProps, CardAssetSizes };
